const Item = require('../models/Item');
const ImageService = require('../utils/imageService');

const itemController = {
  // Get all items
  async getAllItems(req, res) {
    try {
      const items = await Item.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch items',
        message: error.message,
      });
    }
  },

  // Get item by ID
  async getItemById(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.getById(id);

      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.json(item);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch item',
        message: error.message,
      });
    }
  },

  // Create item
  async createItem(req, res) {
    try {
      const { title, description, price } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const newItem = await Item.create({
        title,
        description,
        price,
      });

      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to create item',
        message: error.message,
      });
    }
  },

  // Update item
  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedItem = await Item.update(id, updateData);

      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to update item',
        message: error.message,
      });
    }
  },

  // Delete item
  async deleteItem(req, res) {
    try {
      const { id } = req.params;

      // Get item to retrieve image keys
      const item = await Item.getById(id);

      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      // Delete associated images
      if (item.images && Array.isArray(item.images)) {
        for (const image of item.images) {
          if (image.key) {
            await ImageService.deleteImage(image.key);
          }
        }
      }

      // Delete item from DynamoDB
      const result = await Item.delete(id);

      res.json({
        message: 'Item deleted successfully',
        ...result,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to delete item',
        message: error.message,
      });
    }
  },

  // Upload image
  async uploadImage(req, res) {
    try {
      const { itemId } = req.body;

      if (!itemId) {
        return res.status(400).json({ error: 'Item ID is required' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      // Check if item exists
      const item = await Item.getById(itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      // Upload to S3
      const imageData = await ImageService.uploadImage(req.file, itemId);

      // Update item with image URL
      const images = item.images || [];
      images.push(imageData);

      const updatedItem = await Item.update(itemId, {
        imageUrl: imageData.url,
        images,
      });

      res.json({
        message: 'Image uploaded successfully',
        imageData,
        item: updatedItem,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to upload image',
        message: error.message,
      });
    }
  },
};

module.exports = itemController;
