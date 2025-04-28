import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  // ✅ correct
import "./Navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isGuest, setIsGuest] = useState(false); 
    const navigate = useNavigate();
  
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded?.userId;

                // ✅ Check if userId is the special "guest" id
                setIsGuest(userId === "68098b2487a36912cb72e970");
    
            } catch (err) {
                console.error("Error decoding token:", err);
                setIsGuest(true); // if error decoding, assume guest
            }
        } else {
            setIsGuest(true); // no token, treat as guest
        }
    }, []); // ✅ only check once when Navbar mounts

    const toggleMenu = () => setIsOpen(prev => !prev);

    const handleProfileClick = (e) => {
        if (isGuest) {
            e.preventDefault();
            setShowOverlay(true);
        }
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };

    return (
        <>
            <nav className="navbar">
                {/* Hamburger Menu */}
                <div className="left">
                    <button className="hamburger" onClick={toggleMenu}>☰</button>
                </div>

                {/* Sidebar */}
                <div className={`sidebar ${isOpen ? "show" : ""}`}>
                    <button className="close-btn" onClick={toggleMenu}>×</button>
                    <Link to="/inventory" onClick={toggleMenu}>Inventory</Link>
                    <Link to="/analytics" onClick={toggleMenu}>Analytics</Link>
                    <Link to="/recipe-suggestions" onClick={toggleMenu}>Recipe Suggestions</Link>
                </div>

                {/* Home */}
                <div className="center">
                    <Link to="/home" className="logo-link">
                        <img id="logo" src="/logo.svg" alt="Smart Fridge Logo" height="50px" />
                        <span className="home-text">Home</span>
                    </Link>
                </div>

                {/* Account Icon */}
                <div className="right">
                    <Link to="/settings" className="profile" onClick={handleProfileClick}>
                        <img src="https://picsum.photos/200" alt="Account" className="profile" />
                    </Link>
                </div>
            </nav>

            {/* Guest Overlay */}
            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-card">
                        <p>Please create an account to access profile settings.</p>
                        <button onClick={() => navigate('/signup')}>Create Account</button>
                        <button onClick={closeOverlay}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
