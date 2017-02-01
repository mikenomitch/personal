provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "${var.region}"
}

resource "aws_s3_bucket" "personal" {
    bucket = "${var.bucket_name}"
    acl = "public-read"
}

resource "aws_s3_bucket_object" "personal-site" {
  provider = "aws"

  bucket = "${aws_s3_bucket.personal.id}"
  key    = "index"
  source = "../src/index.html"
}