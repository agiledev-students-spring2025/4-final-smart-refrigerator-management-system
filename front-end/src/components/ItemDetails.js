import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useInventory } from '../contexts/InventoryContext';
import './ItemDetails.css';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, updateItem, deleteItem, isGuest, error, clearError } = useInventory();
  
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showGuestDeleteModal, setShowGuestDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    expirationDate: '',
    category: '',
    storageLocation: '',
    notes: '',
    nonExpiring: false
  });
  
  useEffect(() => {
    const currentItem = getItemById(id);
    if (currentItem) {
      setItem(currentItem);
      setFormData({
        name: currentItem.name || '',
        quantity: currentItem.quantity || '',
        expirationDate: currentItem.expirationDate?.split('T')[0] || '',
        category: currentItem.category || '',
        storageLocation: currentItem.storageLocation || '',
        notes: currentItem.notes || '',
        nonExpiring: currentItem.nonExpiring || false
      });
    }    
  }, [id, getItemById]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare the data for submission
    const itemToSubmit = {
      ...formData,
      // If nonExpiring is true, set expirationDate to null
      expirationDate: formData.nonExpiring ? null : formData.expirationDate
    };
    
    updateItem(id, itemToSubmit);
    setItem(prev => ({ ...prev, ...itemToSubmit }));
    setIsEditing(false);
  };
  
  const handleDelete = async () => {
    clearError(); // Clear any previous errors
    
    if (isGuest) {
      const result = await deleteItem(id);
      if (result && result.restricted) {
        setShowGuestDeleteModal(true);
        return;
      }
    } else {
      if (window.confirm('Are you sure you want to delete this item?')) {
        await deleteItem(id);
        navigate('/inventory');
      }
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
        <Link className="back-button" onClick={() => navigate(-1)}>
          &larr; Back
        </Link>
      </div>
    );
  }
  
  return (
    <div className="item-details-container">
      <div className="item-details-header">
        <h1>{isEditing ? 'Edit Item' : 'Item Details'}</h1>
      </div>

      <div className="item-details-content">
        <div className="item-image-container">
          <img 
            src={item.imageUrl || `https://picsum.photos/seed/${item._id}/300/300`}
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
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
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
                <label htmlFor="expirationDate">Expiration Date</label>
                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                />
              </div>
            )}
            
          <div className="form-group">
            <label htmlFor="storageLocation">Storage Location</label>
            <select
              id="storageLocation"
              name="storageLocation"
              value={formData.storageLocation}
              onChange={handleChange}
            >
              <option value="">Select storage location</option>
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
              <span className="info-value">{item.nonExpiring ? 'Never expires' : formatDate(item.expirationDate)}</span>
            </div>
            
            {item.category && (
              <div className="info-row">
                <span className="info-label">Category:</span>
                <span className="info-value">{item.category}</span>
              </div>
            )}

            {item.storageLocation && (
              <div className="info-row">
                <span className="info-label">Storage Location:</span>
                <span className="info-value">{item.storageLocation}</span>
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
      
      {showGuestDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Guest Account Restriction</h3>
            <p>As a guest user, you cannot have an empty fridge.</p>
            <p>Please create an account to remove all items.</p>
            <div className="modal-buttons">
              <button className="modal-button primary" onClick={() => navigate('/signup')}>
                Create Account
              </button>
              <button className="modal-button secondary" onClick={() => setShowGuestDeleteModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;