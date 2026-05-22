# Terraform Configuration for AWS Cloud Computing Project

## Overview
This directory contains Terraform configurations for deploying the AWS Cloud Computing application with high availability setup.

## Resources to be created:
1. **EC2 Instances** - Multiple instances across availability zones
2. **Application Load Balancer (ALB)** - For load balancing
3. **Auto Scaling Group** - For high availability
4. **DynamoDB Table** - For data storage
5. **S3 Buckets** - For image storage and resized images
6. **IAM Roles and Policies** - For EC2 and Lambda permissions
7. **CloudFront Distribution** - For content delivery
8. **Lambda Function** - For image resizing
9. **VPC and Security Groups** - For network configuration

## Prerequisites
- AWS account with appropriate permissions
- Terraform installed (v1.0+)
- AWS CLI configured with credentials

## Directory Structure
- `main.tf` - Main Terraform configuration
- `variables.tf` - Variable definitions
- `outputs.tf` - Output values
- `vpc.tf` - VPC and networking
- `ec2.tf` - EC2 and ALB configuration
- `dynamodb.tf` - DynamoDB table
- `s3.tf` - S3 bucket configuration
- `iam.tf` - IAM roles and policies
- `cloudfront.tf` - CloudFront distribution
- `lambda.tf` - Lambda function for image resizing

## Usage
1. Update `terraform.tfvars` with your values
2. Run `terraform init`
3. Run `terraform plan` to review changes
4. Run `terraform apply` to create resources
5. Run `terraform destroy` to remove resources

## Notes
- Review and adjust configurations based on your requirements
- Keep AWS Free Tier limitations in mind
- Store sensitive variables in terraform.tfvars (not in git)
