import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Signup.css";

function Signup({ setUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (name && email && password) {
            // Trigger exit animation before navigating
            setTimeout(() => navigate("/home"), 300);
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
                <motion.input 
                    type="password" 
                    id="password" 
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
