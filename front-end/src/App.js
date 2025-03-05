import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './contexts/InventoryContext';
import InventoryManagement from './components/InventoryManagement';
import ItemDetails from './components/ItemDetails';
import ScanItems from './components/ScanItems';

import './App.css';

function App() {
  return (
    <InventoryProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/inventory/:id" element={<ItemDetails />} />
            <Route path="/scan" element={<ScanItems />} />
            <Route path="*" element={<Navigate to="/inventory" replace />} />
          </Routes>
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;