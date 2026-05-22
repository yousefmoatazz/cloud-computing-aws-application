#!/bin/bash
set -e

# Update system
yum update -y

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# Install PM2
npm install -g pm2

# Clone repository
cd /home/ec2-user
git clone ${backend_repo}
cd $(basename ${backend_repo} .git)

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
AWS_REGION=us-east-1
DYNAMODB_TABLE_NAME=Items
S3_BUCKET_NAME=your-bucket-name
PORT=5000
NODE_ENV=production
CORS_ORIGIN=*
EOF

# Start application with PM2
pm2 start server.js --name "backend"
pm2 startup systemd -u ec2-user --hp /home/ec2-user
pm2 save

# Enable health check endpoint
echo "Application started successfully" > /var/log/app-startup.log
