import React, { useState } from 'react';
import { deleteItem, updateItem } from '../services/api';
import '../styles/ItemList.css';

function ItemList({ items, onItemUpdated }) {
  const [loading, setLoading] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
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

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditData({ title: item.title, description: item.description, price: item.price });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (itemId) => {
    try {
      setLoading(itemId);
      await updateItem(itemId, editData);
      setEditingId(null);
      onItemUpdated();
    } catch (error) {
      console.error('Error updating item:', error);
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
              {editingId === item.id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    placeholder="Title"
                  />
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleEditChange}
                    placeholder="Price"
                  />
                  <div className="item-actions">
                    <button className="btn-save" onClick={() => handleEditSave(item.id)} disabled={loading === item.id}>
                      {loading === item.id ? 'Saving...' : 'Save'}
                    </button>
                    <button className="btn-cancel" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="item-price">${parseFloat(item.price).toFixed(2)}</div>
                  <div className="item-actions">
                    <button className="btn-edit" onClick={() => handleEditClick(item)}>Edit</button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item.id)}
                      disabled={loading === item.id}
                    >
                      {loading === item.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </>
              )}
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