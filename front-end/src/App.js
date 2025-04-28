import React , { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation, Link, useNavigate} from 'react-router-dom';
import { InventoryProvider } from './contexts/InventoryContext';
import InventoryManagement from './components/InventoryManagement';
import ItemDetails from './components/ItemDetails';
import ScanItems from './components/ScanItems';
import Navbar from './components/Navbar';
import SettingProfile from './components/SettingProfile';
import AccountSetting from './components/AccountSetting';
import FridgeSetup from './components/FridgeSetUp';
import DietaryPreference from './components/DietaryPreference';
import Notifications from './components/Notification';
import HelpSupport from './components/HelpSupport';
import RecipeSuggestions from './components/RecipeSuggestions';
import Login from './components/Login';
import Signup from "./components/Signup";
import Analytics from "./components/Analytics";
import WastePattern from "./components/WastePattern";
import ShoppingRecommendation from "./components/ShoppingRecommendation";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Keto from './components/Keto';
import Vegan from './components/Vegan';
import Vegetarian from './components/Vegetarian';
import AiRecipes from './components/AiRecipes'; 
import Saved from './components/Saved';
import FullRecipe from './components/FullRecipe';
import './App.css';
import {FaArrowLeft} from "react-icons/fa";


function App() {
  const [user, setUser] = useState(null);
  return (
    <InventoryProvider>
      <Router>

      <AppContent setUser={setUser} />

      </Router>
    </InventoryProvider>
  );
}

function AppContent({ setUser }) {
  const location = useLocation(); // Get current route

  // Define pages where the navbar should be hidden
  const hideNavbarRoutes = ["/", "/login", "/signup"];
  const navigate = useNavigate();
  const excludedPaths = ["/", "/login", "/signup", "/home", "/settings", "/analytics", "/inventory",
    "/recipe-suggestions", "/keto", "/vegan", "/vegetarian"];

  return (
      <div className="app-container">
        {/* Show Navbar only if the current path is NOT in hideNavbarRoutes */}
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar/>}

        {!excludedPaths.includes(location.pathname) && (
            <div className="back-button" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Back
            </div>
        )}

        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/inventory" element={<InventoryManagement/>}/>
          <Route path="/inventory/:id" element={<ItemDetails/>}/>
          <Route path="/scan" element={<ScanItems/>}/>
          <Route path="/settings" element={<SettingProfile/>}/>
          <Route path="/Account-Setting" element={<AccountSetting/>}/>
          <Route path="/Fridge-Model" element={<FridgeSetup/>}/>
          <Route path="/DietaryPrefernece" element={<DietaryPreference/>}/>
          <Route path="/Notifications" element= {<Notifications/>}/>
          <Route path="Help-Support" element={<HelpSupport/>}/>
          <Route path="/login" element={<Login setUser={setUser}/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/analytics" element={<Analytics/>}/>
          <Route path="/waste-pattern" element={<WastePattern/>}/>
          <Route path="/shopping-recommendation" element={<ShoppingRecommendation/>}/>
          <Route path="/recipe-suggestions" element={<RecipeSuggestions/>}></Route>
          <Route path="/keto" element={<Keto/>}></Route>
          <Route path="/vegan" element={<Vegan/>}></Route>
          <Route path="/vegetarian" element={<Vegetarian/>}></Route>
          <Route path="/AiRecipes" element={<AiRecipes/>}></Route>
          <Route path="/Saved" element={<Saved/>}></Route>
          <Route path="/recipe/:id" element={<FullRecipe/>}/>

        </Routes>
      </div>
  );
}


export default App;