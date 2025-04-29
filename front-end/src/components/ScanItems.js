import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../contexts/InventoryContext';
import './ScanItems.css';

const ScanItems = () => {
  const navigate = useNavigate();
  const { addItem } = useInventory();

  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    expiryDate: '',
    category: '',
    storageLocation: '',
    notes: '',
    nonExpiring: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.storageLocation) {
      alert('Please fill in required fields: Name, Category, Storage Location.');
      return;
    }

    const itemToSubmit = {
      ...formData,
      expirationDate: formData.nonExpiring ? null : formData.expiryDate,
    };

    await addItem(itemToSubmit);
    navigate('/inventory');
  };

  return (
    <div className="scan-items-container">
      <div className="scan-header">
        <h1>Add New Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-group">
          <label htmlFor="name">Name <span className="required">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. Milk, Eggs, Apples"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category <span className="required">*</span></label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="dairy">Dairy</option>
            <option value="meat">Meat</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="beverages">Beverages</option>
            <option value="leftovers">Leftovers</option>
            <option value="condiments">Condiments</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 1 gallon, 12 count, 2 lbs"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="nonExpiring"
              checked={formData.nonExpiring}
              onChange={handleChange}
            />
            This item never expires
          </label>
        </div>

        {!formData.nonExpiring && (
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="storageLocation">Storage Location <span className="required">*</span></label>
          <select
            id="storageLocation"
            name="storageLocation"
            value={formData.storageLocation}
            onChange={handleChange}
            required
          >
            <option value="">Select where to store</option>
            <option value="main">Main</option>
            <option value="door">Door</option>
            <option value="freezer">Freezer</option>
            <option value="crisper">Crisper</option>
            <option value="deli drawer">Deli Drawer</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Any additional information about this item"
          />
        </div>

        <button type="submit" className="submit-button">
          Add to Inventory
        </button>
      </form>
    </div>
  );
};

export default ScanItems;
