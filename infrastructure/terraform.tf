terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }

  required_version = ">= 1.2"
    backend "s3" {
    bucket         = "your-terraform-state-bucket"
    key            = "env/dev/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "your-lock-table" # optional but recommended for locking
  }
}
