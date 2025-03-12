import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './contexts/InventoryContext';
import InventoryManagement from './components/InventoryManagement';
import ItemDetails from './components/ItemDetails';
import ScanItems from './components/ScanItems';
import Navbar from './components/Navbar';
import SettingProfile from './components/SettingProfile';
import FridgeSetup from './components/FridgeSetUp';
import DietaryPreference from './components/DietaryPreference';

import './App.css';

function App() {
  return (
    <div>
    <InventoryProvider>
      <Router>
        <div className="app-container">
          <Navbar></Navbar>
          <Routes>
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/inventory/:id" element={<ItemDetails />} />
            <Route path="/scan" element={<ScanItems />} />
            <Route path="*" element={<Navigate to="/inventory" replace />} />
            <Route path="/settings" element={<SettingProfile />}></Route>
            <Route path="/Fridge-Model" element={<FridgeSetup/>}></Route>
            <Route path="/DietaryPrefernece" element={<DietaryPreference/>}></Route>
          </Routes>
        </div>
      </Router>
    </InventoryProvider>
    </div>
  );
}

export default App;