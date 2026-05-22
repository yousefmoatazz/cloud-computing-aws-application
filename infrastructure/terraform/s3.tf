# S3 Bucket Configuration

# Main S3 bucket for image uploads
resource "aws_s3_bucket" "main" {
  bucket = "${var.s3_bucket_prefix}-images-${data.aws_caller_identity.current.account_id}"

  tags = {
    Name = "${var.project_name}-images"
  }
}

# Resized images bucket
resource "aws_s3_bucket" "resized" {
  bucket = "${var.s3_bucket_prefix}-resized-${data.aws_caller_identity.current.account_id}"

  tags = {
    Name = "${var.project_name}-resized-images"
  }
}

# Enable versioning for both buckets
resource "aws_s3_bucket_versioning" "main" {
  bucket = aws_s3_bucket.main.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_versioning" "resized" {
  bucket = aws_s3_bucket.resized.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Block public access for security
resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.main.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_public_access_block" "resized" {
  bucket = aws_s3_bucket.resized.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CORS configuration for React frontend
resource "aws_s3_bucket_cors_configuration" "main" {
  bucket = aws_s3_bucket.main.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*"]
    expose_headers  = ["x-amz-version-id"]
    max_age_seconds = 3000
  }
}

# Get current AWS account ID
data "aws_caller_identity" "current" {}
