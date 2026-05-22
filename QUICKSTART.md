# Getting Started Quick Guide

## Local Development Setup (First Time)

### Prerequisites
- Node.js 18+ installed
- npm installed
- Git installed
- AWS Account

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd cloud-computing-aws-application
```

### Step 2: Setup Backend
```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your AWS credentials:
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
DYNAMODB_TABLE_NAME=Items
S3_BUCKET_NAME=your-bucket-name
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

Start the backend:
```bash
npm run dev
```

### Step 3: Setup Frontend (New Terminal)
```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_AWS_REGION=us-east-1
REACT_APP_S3_BUCKET_NAME=your-bucket-name
REACT_APP_CLOUDFRONT_DOMAIN=your-cloudfront-domain
```

Start the frontend:
```bash
npm start
```

The application should open at `http://localhost:3000`

## Testing the Application

### Create an Item
1. Fill in the form on the left side
2. Optionally upload an image
3. Click "Create Item"

### View Items
Items appear on the right side of the page

### Update an Item
Click "Edit" button on any item (coming soon)

### Delete an Item
Click "Delete" button to remove an item

## Troubleshooting

### Backend not running
- Check if port 5000 is available
- Verify AWS credentials in .env
- Check internet connection for AWS SDK

### Frontend won't connect to backend
- Ensure backend is running on http://localhost:5000
- Check CORS_ORIGIN in backend .env
- Check browser console for errors

### Image upload fails
- Verify S3_BUCKET_NAME exists
- Check AWS credentials have S3 permissions
- Check image file size (max 5MB)

## AWS Setup (Before Deployment)

1. Create DynamoDB table named "Items" with primary key "id"
2. Create S3 bucket for images
3. Create S3 bucket for resized images
4. Configure IAM user with appropriate permissions

## Next Steps
- Read DEPLOYMENT.md for production deployment
- Review API.md for API endpoint details
- Check infrastructure/terraform for AWS setup scripts
