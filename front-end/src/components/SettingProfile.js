import "./SettingProfile.css"
import { useNavigate } from "react-router-dom";

function SettingProfile() {

    const navigate = useNavigate();

    return(
        <div className= "account-profile">
            <h1>Account Settings</h1>
            <h2>John White</h2>
            <h2>johnwhite.example.com</h2>
            <div className= "settings-option">
                <button className="option">Account Settings</button>
                <button onClick={() =>navigate('/Fridge-Model')} className="option">Refrigerator Model Setup</button>
                <button className="option">Notifications</button>
                <button className="option">Dietary Preferences</button>
                <button className="option">Help & Support</button>
                <button className="option">Logout</button>
            </div>
        </div>
    )
}

export default SettingProfile;