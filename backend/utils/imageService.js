const { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { s3 } = require('../config/aws');
const { v4: uuidv4 } = require('uuid');

const S3_BUCKET = process.env.S3_BUCKET_NAME;

const ImageService = {
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
    };

    try {
      await s3.send(new PutObjectCommand(params));
      const url = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;
      return {
        url,
        key: fileName,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw error;
    }
  },

  async deleteImage(imageKey) {
    const params = {
      Bucket: S3_BUCKET,
      Key: imageKey,
    };

    try {
      await s3.send(new DeleteObjectCommand(params));
      return { success: true, key: imageKey };
    } catch (error) {
      console.error('Error deleting from S3:', error);
      throw error;
    }
  },

  async getImageUrl(imageKey) {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: imageKey,
    });

    try {
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return url;
    } catch (error) {
      console.error('Error generating signed URL:', error);
      throw error;
    }
  },
};

module.exports = ImageService;