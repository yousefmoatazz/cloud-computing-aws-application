# Lambda Function - Image Resizer

## Overview
This Lambda function is triggered when images are uploaded to the S3 bucket. It automatically resizes images into multiple sizes for optimization.

## Configuration
- Set the environment variable `RESIZED_BUCKET_NAME` to point to the bucket where resized images will be stored
- The function creates 3 versions:
  - Large (800x600)
  - Medium (400x300)
  - Small (200x150)

## Deployment
1. Run `npm install` to install dependencies
2. Package and deploy using AWS Lambda console or CLI

## S3 Event Trigger
Configure S3 bucket to trigger this Lambda function on object creation:
- Event: `s3:ObjectCreated:*`
- Prefix: `items/` (optional, to filter only item uploads)
