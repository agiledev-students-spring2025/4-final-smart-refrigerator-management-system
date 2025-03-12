import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            navigate("/inventory");
        } else {
            alert("Invalid credentials!");
        }
    };

  return (
    <div className="login-container">
        <h1>Smart Fridge System</h1>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <span className="link" onClick={() => navigate("/signup")}>Sign up here</span></p>
    </div>
    );
}

export default Login;
