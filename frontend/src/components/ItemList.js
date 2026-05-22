import React, { useState } from 'react';
import { deleteItem, updateItem } from '../services/api';
import '../styles/ItemList.css';

function ItemList({ items, onItemUpdated }) {
  const [loading, setLoading] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setLoading(itemId);
      await deleteItem(itemId);
      onItemUpdated();
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="items-grid">
      {items && items.length > 0 ? (
        items.map(item => (
          <div key={item.id} className="item-card">
            {item.imageUrl && (
              <div className="item-image">
                <img src={item.imageUrl} alt={item.title} />
              </div>
            )}
            <div className="item-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="item-price">${parseFloat(item.price).toFixed(2)}</div>
              <div className="item-actions">
                <button className="btn-edit">Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(item.id)}
                  disabled={loading === item.id}
                >
                  {loading === item.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-state">No items found. Create one to get started!</div>
      )}
    </div>
  );
}

export default ItemList;
