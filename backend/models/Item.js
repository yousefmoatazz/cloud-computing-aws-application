const { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { dynamodb } = require('../config/aws');
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'ItemsTable';

const Item = {
  // Get all items
  async getAll() {
    try {
      const result = await dynamodb.send(new ScanCommand({ TableName: TABLE_NAME }));
      return result.Items || [];
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  // Get item by ID
  async getById(itemId) {
    try {
      const result = await dynamodb.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { id: itemId },
      }));
      return result.Item;
    } catch (error) {
      console.error('Error fetching item:', error);
      throw error;
    }
  },

  // Create new item
  async create(itemData) {
    const itemId = uuidv4();
    const timestamp = new Date().toISOString();

    const item = {
      id: itemId,
      title: itemData.title,
      description: itemData.description || '',
      price: parseFloat(itemData.price) || 0,
      imageUrl: itemData.imageUrl || null,
      images: itemData.images || [],
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    try {
      await dynamodb.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      }));
      return item;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  // Update item
  async update(itemId, updateData) {
    const timestamp = new Date().toISOString();
    const updateExpression = [];
    const expressionAttributeValues = {};

    Object.keys(updateData).forEach((key) => {
      if (key !== 'id') {
        updateExpression.push(`${key} = :${key}`);
        expressionAttributeValues[`:${key}`] = updateData[key];
      }
    });

    updateExpression.push('updatedAt = :updatedAt');
    expressionAttributeValues[':updatedAt'] = timestamp;

    try {
      const result = await dynamodb.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id: itemId },
        UpdateExpression: 'SET ' + updateExpression.join(', '),
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      }));
      return result.Attributes;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  },

  // Delete item
  async delete(itemId) {
    try {
      await dynamodb.send(new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id: itemId },
      }));
      return { success: true, id: itemId };
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  },
};

module.exports = Item;