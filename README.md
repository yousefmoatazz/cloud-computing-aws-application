# AWS Cloud Computing CRUD Application

## Overview
A web application built with MERN stack (MongoDB replaced with DynamoDB) hosted on AWS EC2 with high availability setup. The application implements CRUD operations with image management and serverless image resizing.

## Table of Contents
1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Deployment](#deployment)
7. [API Documentation](#api-documentation)
8. [Contributing](#contributing)

## Features
- ✅ Create, Read, Update, Delete (CRUD) items
- ✅ Image upload with S3 storage
- ✅ Automatic image resizing via Lambda
- ✅ High availability with multiple EC2 instances
- ✅ Load balancing with ALB
- ✅ Content delivery with CloudFront
- ✅ DynamoDB for scalable database
- ✅ RESTful API
- ✅ Responsive React frontend

## Technology Stack

### Frontend
- React 18
- Axios for HTTP requests
- CSS3 for styling

### Backend
- Node.js
- Express.js
- AWS SDK for JavaScript
- Multer for file uploads

### Database
- AWS DynamoDB (NoSQL)

### Cloud Services
- EC2 (Compute)
- S3 (Storage)
- CloudFront (CDN)
- Lambda (Serverless compute)
- ALB (Load Balancer)
- IAM (Access Management)

## Architecture

### High-Level Architecture
```
┌─────────────────┐
│   CloudFront    │ (Content Delivery)
└────────┬────────┘
         │
┌────────▼────────┐
│      ALB        │ (Load Balancer)
└────────┬────────┘
         │
    ┌────┴────┐
    │          │
┌───▼─┐    ┌──▼──┐
│ EC2 │    │ EC2 │ (Multiple AZs)
│  1  │    │  2  │
└─┬───┘    └──┬──┘
  │           │
  └─────┬─────┘
        │
     ┌──▼───────────┬────────────┐
     │              │            │
┌────▼────┐  ┌──────▼─────┐  ┌──▼────┐
│DynamoDB │  │  S3 Images │  │Lambda  │
│          │  │            │  │Resizer │
└──────────┘  └────────────┘  └────────┘
```

## Project Structure

```
cloud-computing-aws-application/
├── frontend/                          # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemForm.js
│   │   │   └── ItemList.js
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── ItemForm.css
│   │   │   ├── ItemList.css
│   │   │   └── index.css
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── backend/                           # Express server
│   ├── config/
│   │   └── aws.js                    # AWS SDK configuration
│   ├── controllers/
│   │   └── itemController.js         # Business logic
│   ├── models/
│   │   └── Item.js                   # DynamoDB operations
│   ├── routes/
│   │   └── itemRoutes.js             # API endpoints
│   ├── middleware/
│   ├── utils/
│   │   └── imageService.js           # S3 operations
│   ├── .env.example
│   ├── .gitignore
│   ├── server.js                     # Entry point
│   └── package.json
│
├── lambda/                            # Lambda functions
│   └── image-resizer/
│       ├── .env.example
│       ├── index.js                  # Lambda handler
│       ├── package.json
│       └── README.md
│
├── infrastructure/                    # AWS infrastructure
│   ├── terraform/
│   │   ├── main.tf                   # Provider configuration
│   │   ├── variables.tf              # Variables
│   │   ├── outputs.tf                # Outputs
│   │   ├── vpc.tf                    # VPC and networking
│   │   ├── ec2.tf                    # EC2 configuration
│   │   ├── dynamodb.tf               # DynamoDB setup
│   │   ├── s3.tf                     # S3 buckets
│   │   ├── iam.tf                    # IAM roles
│   │   ├── cloudfront.tf             # CloudFront
│   │   ├── lambda.tf                 # Lambda setup
│   │   ├── .gitignore
│   │   └── README.md
│   ├── architecture-diagrams/        # Architecture diagrams
│   └── DynamoDB_Schema.md            # Database schema
│
├── docs/                              # Documentation
│   ├── PROJECT_STRUCTURE.md
│   ├── DEPLOYMENT.md
│   ├── API.md
│   └── README.md
│
└── README.md                          # This file
```

## Getting Started

### Prerequisites
- AWS Account (Free Tier compatible)
- Node.js 14+ and npm
- Terraform (for infrastructure)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd cloud-computing-aws-application
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Update .env with API endpoint
   npm start
   ```

3. **Backend Setup** (in new terminal)
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with AWS credentials
   npm run dev
   ```

## Deployment

### Prerequisites for Deployment
- AWS credentials configured in CLI
- Terraform installed
- EC2 key pair created

### Deployment Steps
1. Configure AWS credentials: `aws configure`
2. Update `infrastructure/terraform/terraform.tfvars`
3. Deploy infrastructure: `terraform apply`
4. Deploy application to EC2 instances
5. Configure DNS and CloudFront

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## API Documentation

See [API.md](docs/API.md) for complete API documentation.

### Quick API Overview
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `POST /api/items/upload-image` - Upload image

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_AWS_REGION=us-east-1
REACT_APP_S3_BUCKET_NAME=bucket-name
REACT_APP_CLOUDFRONT_DOMAIN=cloudfront-domain
```

### Backend (.env)
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
DYNAMODB_TABLE_NAME=Items
S3_BUCKET_NAME=bucket-name
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

## AWS Free Tier Considerations
- Use t3.micro instances for EC2
- DynamoDB on-demand billing
- S3 free tier: 5GB storage
- CloudFront: 50GB egress included
- Lambda: 1M requests free

## Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/feature-name`)
5. Open pull request

## License
This project is part of the Cloud Computing course at GIU (German International University).

## Support
For issues and questions, please open an issue on the repository or contact the course instructor.

## Deliverables Checklist
- [ ] GitHub repository link
- [ ] Architecture diagram (using AWS icons)
- [ ] Source code with documentation
- [ ] Deployed application DNS/URL
- [ ] CloudFront distribution domain
- [ ] EC2 private IPs
- [ ] Demo/presentation video

## Important Notes
- **DO NOT TERMINATE** AWS resources after submission - only STOP them
- Monitor AWS costs to stay within free tier
- Keep backups of important data
- Regularly review security group configurations
- Test thoroughly before final deployment