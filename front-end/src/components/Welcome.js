import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
    const navigate = useNavigate();

    return (
        <motion.div 
            className="welcome-container"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.6 }}
        >
            {/* Logo Animation */}
            <motion.img 
                id="logo" 
                src="/logo.svg" 
                alt="Smart Fridge Logo" 
                width="120" 
                height="120"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            />

            {/* Heading Animation */}
            <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Welcome to Smart Fridge System!
            </motion.h1>

            {/* Paragraph Animation */}
            <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                Track your food inventory and reduce waste effortlessly.
            </motion.p>

            {/* Get Started Button */}
            <motion.button 
                className="welcome-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, backgroundColor: "#6ca461" }}
                onClick={() => navigate("/home")}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
                Get Started
            </motion.button>

            {/* Login Button */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                Already have an account? Log in!
            </motion.p>

            <motion.button 
                className="guide-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, backgroundColor: "#ffd670" }}
                onClick={() => navigate("/login")}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
                Log in
            </motion.button>

            {/* Signup Button */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                New to this? Sign up!
            </motion.p>

            <motion.button 
                className="guide-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, backgroundColor: "#ffd670" }}
                onClick={() => navigate("/signup")}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}

            >
                Sign up
            </motion.button>
        </motion.div>
    );
}

export default Welcome;
