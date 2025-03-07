import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInventory } from '../contexts/InventoryContext';
import './ScanItems.css';

const ScanItems = () => {
  const navigate = useNavigate();
  const { addItem } = useInventory();
  
  const [scanMode, setScanMode] = useState('manual');
  const [isScanning, setIsScanning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    expiryDate: '',
    compartment: '',
    notes: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.compartment) {
      alert('Please fill in all required fields (Name and Compartment)');
      return;
    }
    
    addItem(formData);
    
    navigate('/inventory');
  };
  
  const handleScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      setFormData({
        name: 'Organic Milk',
        quantity: '1 gallon',
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        compartment: 'refrigerator',
        notes: 'Scanned from package'
      });
      
      setIsScanning(false);
      setScanMode('manual');
    }, 2000);
  };
  
  return (
    <div className="scan-items-container">
      <div className="scan-header">
        <Link to="/inventory" className="back-button">
          &larr; Back
        </Link>
        <h1>Add New Item</h1>
      </div>
      
      <div className="scan-mode-toggle">
        <button 
          className={scanMode === 'manual' ? 'active' : ''} 
          onClick={() => setScanMode('manual')}
        >
          Manual Entry
        </button>
        <button 
          className={scanMode === 'camera' ? 'active' : ''} 
          onClick={() => setScanMode('camera')}
        >
          Scan Item
        </button>
      </div>
      
      {scanMode === 'camera' ? (
        <div className="camera-scan-section">
          <div className={`camera-viewfinder ${isScanning ? 'scanning' : ''}`}>
            <div className="scan-overlay">
              <div className="scan-guides"></div>
              {isScanning && <div className="scanning-indicator"></div>}
            </div>
            <div className="camera-instructions">
              Position the item's barcode or label within the frame
            </div>
          </div>
          
          <button 
            className="scan-button"
            onClick={handleScan}
            disabled={isScanning}
          >
            {isScanning ? 'Scanning...' : 'Scan Now'}
          </button>
        </div>
      ) : (
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
            <label htmlFor="compartment">Compartment <span className="required">*</span></label>
            <select
              id="compartment"
              name="compartment"
              value={formData.compartment}
              onChange={handleChange}
              required
            >
              <option value="">Select where to store</option>
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
              placeholder="Any additional information about this item"
            />
          </div>
          
          <button type="submit" className="submit-button">
            Add to Inventory
          </button>
        </form>
      )}
    </div>
  );
};

export default ScanItems;