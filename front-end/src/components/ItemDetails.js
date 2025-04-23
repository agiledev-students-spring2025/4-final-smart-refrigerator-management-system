import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useInventory } from '../contexts/InventoryContext';
import './ItemDetails.css';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, updateItem, deleteItem } = useInventory();
  
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    expiryDate: '',
    compartment: '',
    notes: ''
  });
  
  useEffect(() => {
    const currentItem = getItemById(id);
    if (currentItem) {
      setItem(currentItem);
      setFormData({
        name: currentItem.name || '',
        quantity: currentItem.quantity || '',
        expiryDate: currentItem.expiryDate || '',
        compartment: currentItem.compartment || '',
        notes: currentItem.notes || ''
      });
    }
  }, [id, getItemById]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateItem(id, formData);
    setItem(prev => ({ ...prev, ...formData }));
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(id);
      navigate('/inventory');
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (!item) {
    return (
      <div className="item-not-found">
        <h2>Item not found</h2>
        <p>The item you're looking for may have been deleted.</p>
        <Link to="/inventory" className="back-link">Back to Inventory</Link>
      </div>
    );
  }
  
  return (
    <div className="item-details-container">
      <div className="item-details-header">
        <Link to="/inventory" className="back-button">
          &larr; Back
        </Link>
        <h1>{isEditing ? 'Edit Item' : 'Item Details'}</h1>
      </div>
      
      <div className="item-details-content">
        <div className="item-image-container">
          <img 
            src={`https://picsum.photos/seed/${item.id}/300/300`}
            alt={item.name}
            className="item-detail-image"
          />
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            
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
              <label htmlFor="compartment">Compartment</label>
              <select
                id="compartment"
                name="compartment"
                value={formData.compartment}
                onChange={handleChange}
              >
                <option value="">Select a compartment</option>
                <option value="refrigerator">Main Refrigerator</option>
                <option value="freezer">Freezer</option>
                <option value="vegetableDrawer">Vegetable Drawer</option>
                <option value="dairySection">Dairy Section</option>
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
              />
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="save-button">Save Changes</button>
              <button 
                type="button" 
                className="cancel-button" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="item-info-panel">
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{item.name}</span>
            </div>
            
            {item.quantity && (
              <div className="info-row">
                <span className="info-label">Quantity:</span>
                <span className="info-value">{item.quantity}</span>
              </div>
            )}
            
            <div className="info-row">
              <span className="info-label">Expiry Date:</span>
              <span className="info-value">{formatDate(item.expirationDate)}</span>
            </div>
            
            {item.compartment && (
              <div className="info-row">
                <span className="info-label">Stored in:</span>
                <span className="info-value">
                  {item.compartment === 'refrigerator' && 'Main Refrigerator'}
                  {item.compartment === 'freezer' && 'Freezer'}
                  {item.compartment === 'vegetableDrawer' && 'Vegetable Drawer'}
                  {item.compartment === 'dairySection' && 'Dairy Section'}
                  {!['refrigerator', 'freezer', 'vegetableDrawer', 'dairySection'].includes(item.compartment) && item.compartment}
                </span>
              </div>
            )}
            
            {item.notes && (
              <div className="info-row notes-row">
                <span className="info-label">Notes:</span>
                <span className="info-value">{item.notes}</span>
              </div>
            )}
            
            <div className="added-date">
              Added: {formatDate(item.createdAt)}
            </div>
            
            <div className="action-buttons">
              <button 
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button 
                className="delete-button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;