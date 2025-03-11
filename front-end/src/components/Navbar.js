import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
    
    return (
        <nav className = "navbar">
            <button className= "hamburger">☰</button>
            <Link to="/inventory" className = "logo"> Logo </Link>
            <Link to="/scan">Scan Items</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to ="/settings" className="profile">account profile</Link>
        </nav>
    )

}

export default Navbar;