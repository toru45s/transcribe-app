provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "example" {
  bucket = var.example_bucket_name
}