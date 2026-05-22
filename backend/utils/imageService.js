const { s3 } = require('../config/aws');
const { v4: uuidv4 } = require('uuid');

const S3_BUCKET = process.env.S3_BUCKET_NAME;

const ImageService = {
  // Upload image to S3
  async uploadImage(file, itemId) {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileName = `items/${itemId}/${uuidv4()}-${Date.now()}-${file.originalname}`;

    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      const result = await s3.upload(params).promise();
      return {
        url: result.Location,
        key: fileName,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw error;
    }
  },

  // Delete image from S3
  async deleteImage(imageKey) {
    const params = {
      Bucket: S3_BUCKET,
      Key: imageKey,
    };

    try {
      await s3.deleteObject(params).promise();
      return { success: true, key: imageKey };
    } catch (error) {
      console.error('Error deleting from S3:', error);
      throw error;
    }
  },

  // Get image from S3
  async getImageUrl(imageKey) {
    const params = {
      Bucket: S3_BUCKET,
      Key: imageKey,
      Expires: 3600, // 1 hour
    };

    try {
      const url = s3.getSignedUrl('getObject', params);
      return url;
    } catch (error) {
      console.error('Error generating signed URL:', error);
      throw error;
    }
  },
};

module.exports = ImageService;
