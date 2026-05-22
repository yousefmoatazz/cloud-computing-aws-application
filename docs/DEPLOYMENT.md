# Deployment Guide

## Prerequisites
- AWS Account with appropriate permissions
- Node.js and npm installed
- Terraform installed
- AWS CLI configured
- Git for version control

## Step 1: Local Development Setup

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your AWS credentials
npm start
```

## Step 2: AWS Infrastructure Setup

### 1. Create DynamoDB Table
```bash
# Can be done via AWS Console or Terraform
# Table name: Items
# Primary key: id (String)
```

### 2. Create S3 Buckets
```bash
# Main bucket for images
aws s3 mb s3://YOUR-BUCKET-NAME-images

# Bucket for resized images
aws s3 mb s3://YOUR-BUCKET-NAME-resized
```

### 3. Configure IAM Roles
Create IAM role for EC2 instances with permissions for:
- DynamoDB (PutItem, GetItem, UpdateItem, DeleteItem, Scan)
- S3 (GetObject, PutObject, DeleteObject)
- CloudWatch (PutMetricData)

### 4. Deploy with Terraform
```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```

## Step 3: Deploy Application to EC2

### 1. SSH into EC2 Instance
```bash
ssh -i your-key.pem ec2-user@YOUR-EC2-IP
```

### 2. Install Dependencies
```bash
# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2
```

### 3. Deploy Backend
```bash
git clone YOUR-REPO-URL
cd backend
npm install
# Configure .env with AWS credentials
pm2 start server.js --name "backend"
pm2 startup
pm2 save
```

### 4. Deploy Frontend (Static files via CloudFront)
```bash
cd frontend
npm install
npm run build
# Upload build folder to S3
aws s3 sync build/ s3://YOUR-BUCKET-NAME/
```

## Step 4: Configure Load Balancer

- Point ALB to backend EC2 instances on port 5000
- Configure health checks
- Set up target groups

## Step 5: Configure CloudFront

- Create distribution pointing to S3 bucket
- Set up cache behaviors
- Configure SSL/TLS

## Testing

- Verify API endpoints respond correctly
- Test CRUD operations
- Upload and verify image handling
- Test image resizing via Lambda

## Monitoring

- Set up CloudWatch alarms
- Monitor EC2 CPU and memory
- Track DynamoDB metrics
- Monitor Lambda executions
