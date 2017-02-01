provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "${var.region}"
}

resource "aws_s3_bucket" "personal" {
  bucket = "${var.bucket_name}"
  acl = "public-read"
}

resource "aws_s3_bucket_object" "index" {
  provider = "aws"

  bucket = "${aws_s3_bucket.personal.bucket}"
  key    = "index.html"
  source = "../src/index.html"
}

resource "aws_s3_bucket_object" "styles" {
  provider = "aws"

  bucket = "${aws_s3_bucket.personal.bucket}"
  key    = "application.css"
  source = "../src/application.css"
}
