import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Optionally just navigate, or remove the login logic entirely.
    if (email && password) {
      // If you want to still navigate without storing user data:
      navigate("/inventory");
    } else {
      alert("Invalid credentials!");
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
