import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";
import "./Navbar.css";

function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [showOverlay, setShow]  = useState(false);
  const [isGuest,  setIsGuest]  = useState(false);   // ← true only for the guest account
  const navigate = useNavigate();

  /* ──────────────────────────────────
     Detect whether the current user is the guest account
  ────────────────────────────────── */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsGuest(true);                 // no token → treat as guest
      return;
    }

    // try to read email from localStorage (set during login)
    const cachedEmail = localStorage.getItem("userEmail");
    if (cachedEmail) {
      setIsGuest(cachedEmail === "guest@email.com");
      return;
    }

    // fallback: fetch /profile once to get the email
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        const { user } = await res.json();
        localStorage.setItem("userEmail", user.email);
        setIsGuest(user.email === "guest@email.com");
      } catch (e) {
        console.warn("Could not confirm user email; assuming guest.");
        setIsGuest(true);
      }
    })();
  }, []);

  const toggleMenu = () => setIsOpen((p) => !p);

  const handleProfileClick = (e) => {
    if (isGuest) {
      e.preventDefault();      // block navigation
      setShow(true);           // show overlay
    }
  };

  /* ────────────────────────────────── */

  return (
    <>
      <nav className="navbar">
        {/* Hamburger */}
        <div className="left">
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>

        {/* Sidebar */}
        <div className={`sidebar ${isOpen ? "show" : ""}`}>
          <button className="close-btn" onClick={toggleMenu}>
            ×
          </button>
          <Link to="/inventory" onClick={toggleMenu}>
            Inventory
          </Link>
          <Link to="/analytics" onClick={toggleMenu}>
            Analytics
          </Link>
          <Link to="/recipe-suggestions" onClick={toggleMenu}>
            Recipe Suggestions
          </Link>
        </div>

        {/* Home (logo) */}
        <div className="center">
          <Link to="/home" className="logo-link">
            <img id="logo" src="/logo.svg" alt="Smart Fridge Logo" height="50" />
            <span className="home-text">Home</span>
          </Link>
        </div>

        {/* Profile icon */}
        <div className="right">
          <Link to="/settings" onClick={handleProfileClick}>
            <img
              src="https://picsum.photos/200"
              alt="Account"
              className="profile"
            />
          </Link>
        </div>
      </nav>

      {/* Guest overlay */}
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-card">
            <p>Please create a full account to access profile settings.</p>
            <button onClick={() => navigate("/signup")}>Create Account</button>
            <button onClick={() => setShow(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
