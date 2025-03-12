import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { InventoryProvider } from './contexts/InventoryContext';
import InventoryManagement from './components/InventoryManagement';
import ItemDetails from './components/ItemDetails';
import ScanItems from './components/ScanItems';
import Navbar from './components/Navbar';
import SettingProfile from './components/SettingProfile';
import FridgeSetup from './components/FridgeSetUp';
import RecipeSuggestions from './components/RecipeSuggestions';
import Login from './components/Login';
import Signup from "./components/Signup";
import Analytics from "./components/Analytics";
import WastePattern from "./components/WastePattern";
import ShoppingRecommendation from "./components/ShoppingRecommendation";
import Welcome from "./components/Welcome";
import Home from "./components/Home";

import './App.css';


function App() {
  return (
    <InventoryProvider>
      <Router>
        <AppContent />
      </Router>
    </InventoryProvider>
  );
}

function AppContent() {
  const location = useLocation(); // Get current route

  return (
    <div className="app-container">
      {/* Show Navbar on all pages except Welcome */}
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/inventory/:id" element={<ItemDetails />} />
        <Route path="/scan" element={<ScanItems />} />
        <Route path="/settings" element={<SettingProfile />} />
        <Route path="/Fridge-Model" element={<FridgeSetup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/waste-pattern" element={<WastePattern />} />
        <Route path="/shopping-recommendation" element={<ShoppingRecommendation />} />
        <Route path="/recipe-suggestions" element={<RecipeSuggestions />}></Route>
      </Routes>
    </div>
  );
}


export default App;