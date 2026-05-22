const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

// Define resizing configurations
const RESIZE_CONFIGS = [
  { width: 800, height: 600, suffix: 'lg' },
  { width: 400, height: 300, suffix: 'md' },
  { width: 200, height: 150, suffix: 'sm' },
];

const RESIZED_BUCKET = process.env.RESIZED_BUCKET_NAME || 'resized-images-bucket';

exports.handler = async (event, context) => {
  try {
    // Parse S3 event
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    console.log(`Processing image: ${key} from bucket: ${bucket}`);

    // Get the image from S3
    const params = {
      Bucket: bucket,
      Key: key,
    };

    const data = await s3.getObject(params).promise();
    const imageBuffer = data.Body;

    // Resize image for each configuration
    const resizingPromises = RESIZE_CONFIGS.map(async (config) => {
      try {
        const resizedBuffer = await sharp(imageBuffer)
          .resize(config.width, config.height, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .toBuffer();

        // Generate new key for resized image
        const fileNameParts = key.split('.');
        const extension = fileNameParts[fileNameParts.length - 1];
        const baseFileName = fileNameParts.slice(0, -1).join('.');
        const resizedKey = `${baseFileName}-${config.suffix}.${extension}`;

        // Upload resized image to S3
        const uploadParams = {
          Bucket: RESIZED_BUCKET,
          Key: resizedKey,
          Body: resizedBuffer,
          ContentType: data.ContentType,
          ACL: 'public-read',
        };

        await s3.putObject(uploadParams).promise();
        console.log(`Successfully resized and uploaded: ${resizedKey}`);

        return {
          size: config.suffix,
          key: resizedKey,
          url: `https://${RESIZED_BUCKET}.s3.amazonaws.com/${resizedKey}`,
        };
      } catch (error) {
        console.error(`Error resizing to ${config.suffix}:`, error);
        throw error;
      }
    });

    const results = await Promise.all(resizingPromises);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Image resized successfully',
        originalKey: key,
        resizedImages: results,
      }),
    };
  } catch (error) {
    console.error('Error processing image:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process image',
        message: error.message,
      }),
    };
  }
};
