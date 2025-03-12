import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
    
    return (
        <nav className = "navbar">
            <button className= "hamburger">☰</button>
            <Link to="/inventory" className = "logo"> Logo </Link>
            <Link to="/analytics">Analytics</Link>
            <Link to ="/recipe-suggestions" className="suggestions">Recipe Suggestions</Link>
            <Link to ="/settings" className="profile">Account Profile</Link>
        </nav>
    )

}

export default Navbar;