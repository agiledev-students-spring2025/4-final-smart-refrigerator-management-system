import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();
  const goToGuestLogin = () => {
    navigate("/login", {
      state: {
        prefillEmail: "guest@email.com",
        prefillPassword: "GuestPassword",
      },
    });
  };

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

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Welcome to Smart Fridge System!
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Track your food inventory and reduce waste effortlessly.
      </motion.p>

      {/* Get Started → jump to Log-In with pre-filled values */}
      <motion.button
        className="welcome-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, backgroundColor: "#6ca461" }}
        onClick={goToGuestLogin}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        Get Started
      </motion.button>

      {/* Guest Mode text */}
      <motion.p
        className="small-text guest-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Continue as Guest
      </motion.p>

      {/* Login Button */}
      <motion.button
        className="guide-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, backgroundColor: "#ffd670" }}
        onClick={() => navigate("/login")}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        Log in
      </motion.button>

      {/* Login Text */}
      <motion.p
        className="small-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Have an account?
      </motion.p>

      {/* Signup Button */}
      <motion.button
        className="guide-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, backgroundColor: "#ffd670" }}
        onClick={() => navigate("/signup")}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        Sign up
      </motion.button>

      {/* Signup Text */}
      <motion.p
        className="small-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        New here?
      </motion.p>
    </motion.div>
  );
}

export default Welcome;
