provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "${var.region}"
}

resource "aws_s3_bucket" "personal_no_www" {
  bucket = "${var.bucket_name}"
  acl = "public-read"
  hosted_zone_id = "${var.zone_id}"
  policy = "${file("./no_www_bucket_policy.json")}"

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket" "personal_www" {
  bucket = "www.${var.bucket_name}"
  acl = "public-read"
  hosted_zone_id = "${var.zone_id}"
  policy = "${file("./www_bucket_policy.json")}"

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_object" "index" {
  provider = "aws"

  acl = "public-read"
  bucket = "${aws_s3_bucket.personal_no_www.bucket}"
  key    = "index.html"
  source = "../src/index.html"
}

resource "aws_s3_bucket_object" "styles" {
  provider = "aws"

  acl = "public-read"
  bucket = "${aws_s3_bucket.personal_no_www.bucket}"
  key    = "application.css"
  source = "../src/application.css"
}

resource "aws_route53_zone" "site_zone_www" {
  name = "www.${var.bucket_name}.com"
}

resource "aws_route53_zone" "site_zone_no_www" {
  name = "${var.bucket_name}.com"
}

resource "aws_route53_record" "site" {
  zone_id = "${var.zone_id}"
  name = "${var.bucket_name}.com"
  type = "A"

  alias {
    name = "${var.bucket_name}.s3-website-us-east-1.amazonaws.com"
    zone_id = "${aws_s3_bucket.personal_no_www.hosted_zone_id}"
    evaluate_target_health = false
  }
}