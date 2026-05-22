# API Documentation

## Base URL
```
http://your-alb-dns-name.elb.amazonaws.com/api
```

## Endpoints

### Items

#### Get All Items
```
GET /items
```
Response:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Sample Product",
    "description": "Description",
    "price": 99.99,
    "imageUrl": "https://s3.amazonaws.com/...",
    "images": [],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Get Item by ID
```
GET /items/:id
```
Response: Single item object

#### Create Item
```
POST /items
Content-Type: application/json

{
  "title": "New Product",
  "description": "Product description",
  "price": 99.99
}
```
Response: Created item object with ID

#### Update Item
```
PUT /items/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 129.99
}
```
Response: Updated item object

#### Delete Item
```
DELETE /items/:id
```
Response:
```json
{
  "message": "Item deleted successfully",
  "success": true,
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Upload Image
```
POST /items/upload-image
Content-Type: multipart/form-data

Form Data:
- file: [image file]
- itemId: [item-id]
```
Response:
```json
{
  "message": "Image uploaded successfully",
  "imageData": {
    "url": "https://s3.amazonaws.com/...",
    "key": "items/item-id/uuid.jpg",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "item": {
    "...": "updated item object"
  }
}
```

## Error Handling

All errors follow this format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting
Currently not implemented, but can be added using express-rate-limit middleware

## Authentication
Currently not implemented, but can be added using JWT or AWS Cognito
