# Documentation files

## Project Structure
- `frontend/` - React application
- `backend/` - Node.js/Express server with DynamoDB integration
- `lambda/` - AWS Lambda functions (image resizing)
- `infrastructure/` - Terraform and architecture documentation
- `docs/` - Project documentation

## Key Features
1. **CRUD Operations** - Create, read, update, delete items
2. **Image Management** - Upload, store, and resize images
3. **High Availability** - Multiple EC2 instances across AZs
4. **Content Delivery** - CloudFront for fast delivery
5. **Serverless Processing** - Lambda for image resizing
6. **DynamoDB** - NoSQL database for items
7. **S3 Storage** - For image persistence

## AWS Services Used
- EC2 - Compute
- DynamoDB - Database
- S3 - Storage
- CloudFront - CDN
- Lambda - Serverless compute
- ALB - Load balancing
- IAM - Access management
- CloudWatch - Monitoring

## Getting Started
1. Clone the repository
2. Set up frontend and backend locally
3. Configure AWS credentials
4. Update environment variables
5. Deploy infrastructure using Terraform
6. Deploy application to EC2 instances

## Architecture
See `infrastructure/architecture-diagrams/` for detailed diagrams

## Contributing
Follow the project guidelines and ensure all tests pass before submitting PRs

## License
This project is part of the Cloud Computing course at GIU
