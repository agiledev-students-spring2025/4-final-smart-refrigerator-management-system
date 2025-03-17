import "./SettingProfile.css"
import { useNavigate } from "react-router-dom";

function SettingProfile() {
    const handleLogout = () => {
        console.log("Logged out");
        navigate('/')
    };

    const navigate = useNavigate();

    return(
        <div className= "account-profile">
            <div className="header">
                <h1>Account Settings</h1>
                <div className= "sub-header">
                    <img src="https://picsum.photos/200" alt="profile" class="profile"/>
                    <div className="header-h2">
                        <p>John White</p>
                        <p>johnwhite.example.com</p>
                    </div>
                </div>
            </div>
            <div className= "settings-option">
                <button onClick={() =>navigate('/Account-Setting')}className="option">Account Settings</button>
                <button onClick={() =>navigate('/Fridge-Model')} className="option">Refrigerator Model Setup</button>
                <button className="option">Notifications</button>
                <button onClick={() =>navigate('/DietaryPrefernece')} className="option">Dietary Preferences</button>
                <button onClick={() =>navigate('/Help-Support')}className="option">Help & Support</button>
                <button onClick={handleLogout} className="option">Logout</button>
            </div>
        </div>
    )
}

export default SettingProfile;