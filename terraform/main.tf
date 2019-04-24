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
    index_document = "idx.html"
  }
}

# testing

resource "aws_s3_bucket" "personal_www" {
  bucket = "www.${var.bucket_name}"
  acl = "public-read"
  policy = "${file("./www_bucket_policy.json")}"
  hosted_zone_id = "${var.zone_id}"

  website {
    index_document = "idx.html"
  }
}

resource "aws_s3_bucket_object" "index" {
  provider = "aws"

  acl = "public-read"
  bucket = "${aws_s3_bucket.personal_no_www.bucket}"
  key    = "idx.html"
  content_type  = "text/html"
  source = "../src/idx.html"
}

resource "aws_s3_bucket_object" "styles" {
  provider = "aws"

  acl = "public-read"
  bucket = "${aws_s3_bucket.personal_no_www.bucket}"
  key    = "application.css"
  content_type  = "text/css"
  source = "../src/application.css"
}

resource "aws_route53_zone" "site_zone_www" {
  name = "www.${var.bucket_name}"
}

resource "aws_route53_zone" "site_zone_no_www" {
  name = "${var.bucket_name}"
}

# NOTE:
# route53 throwing an error, so must manually
# set up the records in the AWS console

# resource "aws_route53_record" "site" {
#   zone_id = "${var.zone_id}"
#   name = "${var.bucket_name}"
#   type = "A"

#   alias {
#     name = "${var.bucket_name}.s3-website-us-east-1.amazonaws.com"
#     zone_id = "${aws_s3_bucket.personal_no_www.hosted_zone_id}"
#     evaluate_target_health = false
#   }
# }