// src/components/BottomNavBar.js
import { Link } from "react-router-dom"
import './BottomNavBar.css'; 

function BottomNavBar() {
  return (
    <nav className="bottom-nav">
        <Link to="/inventory" className = "inventory"> Inventory </Link>
        <Link to ="/analytics" className="analytics">Analytics</Link>
        <Link to ="/recipe-suggestions" className="suggestions">Recipe Suggestions</Link>
    </nav>
  );
}

export default BottomNavBar;
