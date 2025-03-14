import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            setTimeout(() => navigate("/home"), 300); // Add small delay for smooth transition
        } else {
            alert("Invalid credentials!");
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

                <motion.input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    whileFocus={{ scale: 1.05 }}
                />

                <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95, backgroundColor: "#6ca461" }}
                    onClick={() => navigate("/home")}
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
