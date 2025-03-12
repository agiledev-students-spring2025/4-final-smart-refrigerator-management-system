import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; 

function Signup({ setUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (name && email && password) {
            navigate("/home");  // Redirect after successful signup
        } else {
            alert("Please fill in all fields!");
        }
    };

    return (
        <div className="signup-container">
            <h1>Smart Fridge System</h1>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
            <label htmlFor="name">Enter your username:</label>
                <input 
                    type="text" 
                    id="name" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />

                <label htmlFor="email">Enter your email:</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                <label htmlFor="password">Enter your password:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <span className="link" onClick={() => navigate("/login")}>Login here</span></p>
        </div>
    );
}

export default Signup;
