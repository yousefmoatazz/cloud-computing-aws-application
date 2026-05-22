import React, { useState, useEffect } from 'react';
import './styles/App.css';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import { getItems } from './services/api';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleItemAdded = () => {
    fetchItems();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AWS CRUD Application</h1>
      </header>
      <main>
        <section className="form-section">
          <h2>Add New Item</h2>
          <ItemForm onItemAdded={handleItemAdded} />
        </section>
        <section className="items-section">
          <h2>Items List</h2>
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">Loading...</div>}
          <ItemList items={items} onItemUpdated={fetchItems} />
        </section>
      </main>
    </div>
  );
}

export default App;
