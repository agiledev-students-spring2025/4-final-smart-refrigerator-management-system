import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import API_BASE_URL from "../api";


function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location  = useLocation();

    // ← if we arrived from Welcome with guest creds, pre-fill once
    useEffect(() => {
        if (location.state?.prefillEmail) {
        setEmail(location.state.prefillEmail);
        setPassword(location.state.prefillPassword);
        }
    }, [location.state]);


    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
      
          const data = await response.json();
      
          if (response.ok) {
            localStorage.setItem("token", data.token);
            window.dispatchEvent(new Event("tokenChanged"));
            localStorage.setItem("userEmail", data.user?.email || email);
      
            // Fetch user profile using the token
            const token = localStorage.getItem("token");
      
            const profileRes = await fetch(`${API_BASE_URL}/profile`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            if (profileRes.ok) {
              const profileData = await profileRes.json();
              setUser(profileData.user); // ✅ Save to global state
              navigate("/home");
            } else {
              alert("Token invalid or expired.");
              localStorage.removeItem("token");
            }
          } else {
            alert(data.error || "Login failed");
          }
        } catch (err) {
          console.error("Login fetch error:", err.message);
          alert("Server error");
        }
      };      
      

    return (
        <motion.div 
            className="login-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }} 
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Title Animation */}
            {/*<div className="back-button" onClick={() => navigate("/")}>*/}
            {/*    <FaArrowLeft /> Back*/}
            {/*</div>*/}

            <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Smart Fridge System
            </motion.h1>

            {/* Subtitle Animation */}
            <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                Log In
            </motion.h2>

            {/* Form Animation */}
            <motion.form 
                onSubmit={handleLogin}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <motion.input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    whileFocus={{ scale: 1.05 }}
                />

                <div className="password-input-wrapper">
                    <motion.input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        whileFocus={{ scale: 1.05 }}
                        className="password-input"
                    />
                    <span className="password-toggle-icon" onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95, backgroundColor: "#6ca461" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                    Log In
                </motion.button>
            </motion.form>

            {/* Sign-up Link Animation */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                Don't have an account?{" "}
                <motion.span 
                    className="link" 
                    onClick={() => navigate("/signup")}
                    whileHover={{ scale: 1.1 }}
                >
                    Sign up here
                </motion.span>
            </motion.p>
        </motion.div>
    );
}

export default Login;
