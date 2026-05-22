output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = "alb-dns-name.region.elb.amazonaws.com"
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = "d1234567890ab.cloudfront.net"
}

output "s3_bucket_names" {
  description = "S3 bucket names"
  value = {
    main_bucket     = "bucket-name"
    resized_bucket  = "resized-bucket-name"
  }
}

output "dynamodb_table_name" {
  description = "DynamoDB table name"
  value       = "Items"
}

output "ec2_instance_ips" {
  description = "Private IPs of EC2 instances"
  value       = ["10.0.1.100", "10.0.2.100"]
}
