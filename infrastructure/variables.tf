variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-west-2"
}

variable "example_bucket_name" {
  description = "Name of the example S3 bucket"
  type        = string
}