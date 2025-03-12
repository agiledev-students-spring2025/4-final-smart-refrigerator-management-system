import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
    
    return (
        <nav className = "navbar">
            <button className= "hamburger">☰</button>
            <Link to="/inventory" className = "logo"> Logo </Link>
            <Link to ="/settings" className="profile">
                <img src="front-end/src/icons/PersonIcon.svg" alt="Profile Image"></img>
            </Link>
        </nav>
    )

}

export default Navbar;