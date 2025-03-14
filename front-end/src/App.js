import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Keto from './components/Keto';
import Vegan from './components/Vegan';
import Vegetarian from './components/Vegetarian';
import AiRecipes from './components/AiRecipes'; 
import Saved from './components/Saved';
import FullRecipe from './components/FullRecipe';
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/waste-pattern" element={<WastePattern />} />
            <Route path="/shopping-recommendation" element={<ShoppingRecommendation />} />
            <Route path="/recipe-suggestions" element={<RecipeSuggestions />}></Route>
            <Route path="/keto" element={<Keto />}></Route>
            <Route path="/vegan" element={<Vegan />}></Route>
            <Route path="/vegetarian" element={<Vegetarian />}></Route>
            <Route path="/AiRecipes" element={<AiRecipes />}></Route>
            <Route path="/Saved" element={<Saved />}></Route>
            <Route path="/full-recipe" element={<FullRecipe />}></Route>
          </Routes>
        </div>
      </Router>
    </InventoryProvider>
    </div>
  );
}

export default App;