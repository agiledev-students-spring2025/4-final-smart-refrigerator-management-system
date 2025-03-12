import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './contexts/InventoryContext';
import InventoryManagement from './components/InventoryManagement';
import ItemDetails from './components/ItemDetails';
import ScanItems from './components/ScanItems';
import Navbar from './components/Navbar';
import SettingProfile from './components/SettingProfile';
import FridgeSetup from './components/FridgeSetUp';
import Login from './components/Login';
import Signup from "./components/Signup";
import Analytics from "./components/Analytics";
import WastePattern from "./components/WastePattern";
import ShoppingRecommendation from "./components/ShoppingRecommendation";
import Welcome from "./components/Welcome";

import './App.css';

function App() {
  return (
    <div>
    <InventoryProvider>
      <Router>
        <div className="app-container">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/inventory/:id" element={<ItemDetails />} />
            <Route path="/scan" element={<ScanItems />} />
            <Route path="*" element={<Navigate to="/Welcome" replace />} />
            <Route path="/settings" element={<SettingProfile />}></Route>
            <Route path="/Fridge-Model" element={<FridgeSetup/>}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/waste-pattern" element={<WastePattern />} />
            <Route path="/shopping-recommendation" element={<ShoppingRecommendation />} />
          </Routes>
        </div>
      </Router>
    </InventoryProvider>
    </div>
  );
}

export default App;