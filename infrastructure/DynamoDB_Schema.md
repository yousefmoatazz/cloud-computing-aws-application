# DynamoDB Table Schema
## Table Name: Items

### Attributes:
- **id** (String, Primary Key): Unique identifier for the item (UUID v4)
- **title** (String): Item title (required)
- **description** (String): Item description
- **price** (Number): Item price
- **imageUrl** (String): URL to the main image in S3
- **images** (List): Array of image objects with metadata
  - url: Image URL
  - key: S3 object key
  - timestamp: Upload timestamp
- **createdAt** (String): ISO timestamp of creation
- **updatedAt** (String): ISO timestamp of last update

### Example Item:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Sample Product",
  "description": "A sample product description",
  "price": 99.99,
  "imageUrl": "https://bucket.s3.amazonaws.com/items/id/image.jpg",
  "images": [
    {
      "url": "https://bucket.s3.amazonaws.com/items/id/uuid1.jpg",
      "key": "items/id/uuid1.jpg",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```
