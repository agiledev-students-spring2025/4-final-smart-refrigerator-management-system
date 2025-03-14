import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // Sidebar state

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle menu visibility
    };

    return (

        <nav className="navbar">

            {/* Hamburger Menu Button */}
            <div className="left">
                <button className="hamburger" onClick={toggleMenu}>☰</button>
            </div>

            {/* Sidebar Menu */}
            <div className={`sidebar ${isOpen ? "show" : ""}`}>
                <button className="close-btn" onClick={toggleMenu}>×</button>
                <Link to ="/inventory" onClick={toggleMenu}>Inventory</Link>
                <Link to="/analytics" onClick={toggleMenu}>Analytics</Link>
                <Link to ="/recipe-suggestions" onClick={toggleMenu}>Recipe Suggestions</Link>
            </div>

            {/* Home page */}
            <div className="center">
                <Link to="/home" className="logo">
                    <img id="logo" src="/logo.svg" alt="Smart Fridge Logo" height = "50px"/>
                </Link>
            </div>


            {/* Account Icon */}
            <div className="right">
                <Link to="/settings" className="profile">
                    <img src="https://picsum.photos/200" alt="Account" className="profile" />
                </Link>
            </div>
        </nav>
    );

}

export default Navbar;