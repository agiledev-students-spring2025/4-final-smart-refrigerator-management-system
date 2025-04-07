import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Signup.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Signup({ setUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
    
        if (name && email && password) {
            axios.post("http://localhost:5001/api/signup", {
                name,
                email,
                password
            })
            .then((res) => {
                console.log("Signup successful:", res.data);
    
                // Optional: set the user in global state
                if (setUser) {
                    setUser(res.data.user);
                }
    
                // Navigate after a short delay (if you want to animate)
                setTimeout(() => navigate("/home"), 300);
            })
            .catch((err) => {
                console.error("Signup error:", err);
                
                if (err.response) {
                  const { status, data } = err.response;
              
                  if (status === 409) {
                    alert(data.error || "Email already registered.");
                  } else if (status === 400) {
                    alert(data.error || "All fields are required.");
                  } else {
                    alert("Unexpected error: " + (data.error || "Please try again."));
                  }
              
                } else {
                  alert("Network error. Please check your connection.");
                }
            });              
        } else {
            alert("Please fill in all fields!");
        }
    };
    

    return (
        <motion.div 
            className="signup-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }} 
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Smart Fridge System
            </motion.h1>

            <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                Sign Up
            </motion.h2>

            <motion.form 
                onSubmit={handleSignup}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <label htmlFor="name">Enter your username:</label>
                <motion.input 
                    type="text" 
                    id="name" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                    whileFocus={{ scale: 1.05 }}
                />

                <label htmlFor="email">Enter your email:</label>
                <motion.input 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    whileFocus={{ scale: 1.05 }}
                />

                <label htmlFor="password">Enter your password:</label>
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
                    Sign Up
                </motion.button>
            </motion.form>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                Already have an account?{" "}
                <motion.span 
                    className="link" 
                    onClick={() => navigate("/login")}
                    whileHover={{ scale: 1.1, textDecoration: "underline"}}
                >
                    Login here
                </motion.span>
            </motion.p>
        </motion.div>
    );
}

export default Signup;
