import { useNavigate } from 'react-router-dom';
import "./Welcome.css";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <h1>Welcome to Smart Fridge System</h1>
            <p>Track your food inventory and reduce waste effortlessly.</p>

            {/* Button to go to Inventory Page */}
            <button className="welcome-button" onClick={() => navigate('/inventory')}>
                Get Started
            </button>
        </div>
    );
}

export default Welcome;
