import React from 'react';
import { Link } from 'react-router-dom';
import { useInventory } from '../contexts/InventoryContext';
import './InventoryManagement.css';

const InventoryManagement = () => {
  const { getItemsByCompartment } = useInventory();
  const compartments = getItemsByCompartment();
  
  const compartmentNames = {
    refrigerator: 'Main Refrigerator',
    freezer: 'Freezer',
    vegetableDrawer: 'Vegetable Drawer',
    dairySection: 'Dairy Section',
    other: 'Other Items'
  };
  
  const getDaysUntilExpiration = (expiryDate) => {
    if (!expiryDate) return null;
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const getExpiryStatusClass = (days) => {
    if (days === null) return '';
    if (days < 0) return 'expired';
    if (days <= 3) return 'expiring-soon';
    return '';
  };
  
  return (
    <div className="inventory-container">
      <h1>My Refrigerator</h1>
      
      {Object.keys(compartments).length === 0 ? (
        <div className="empty-inventory">
          <p>Your refrigerator is empty.</p>
          <p>Add items to keep track of your food inventory.</p>
        </div>
      ) : (
        Object.entries(compartments).map(([compartmentId, items]) => (
          <div key={compartmentId} className="compartment-section">
            <h2>{compartmentNames[compartmentId] || compartmentId}</h2>
            <div className="items-grid">
              {items.map(item => {
                const daysUntilExpiry = getDaysUntilExpiration(item.expiryDate);
                const expiryStatusClass = getExpiryStatusClass(daysUntilExpiry);
                
                return (
                  <Link 
                    to={`/inventory/${item.id}`} 
                    key={item.id} 
                    className={`item-card ${expiryStatusClass}`}
                  >
                    <div className="item-image-container">
                      <img 
                        src={`https://picsum.photos/seed/${item.id}/200/200`} 
                        alt={item.name} 
                        className="item-image" 
                      />
                    </div>
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      {item.expiryDate && (
                        <p className="expiry-date">
                          {daysUntilExpiry < 0 
                            ? 'Expired' 
                            : daysUntilExpiry === 0 
                              ? 'Expires today' 
                              : `Expires in ${daysUntilExpiry} days`}
                        </p>
                      )}
                      {item.quantity && <p className="quantity">Qty: {item.quantity}</p>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))
      )}
      
      <Link to="/scan" className="add-item-button" aria-label="Add new item">
        <span>+</span>
      </Link>
    </div>
  );
};

export default InventoryManagement;