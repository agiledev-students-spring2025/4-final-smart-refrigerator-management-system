import "./SettingProfile.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SettingProfile() {
    const navigate = useNavigate();
    const[profile, setProfile] = useState(null);

    useEffect( () => {
        const token = localStorage.getItem("token");
        const fetchProfile = async() => {
            try{
                const res = await fetch("http://localhost:5001/api/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
        
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data.user); // save it to state if you want to display it
                    console.log("Profile fetched:", data.user);
                  } else {
                    const error = await res.json();
                    console.error("Profile fetch failed:", error.error);
                  }
        } catch (err) {
            console.error("network error: ", err);
        }
    };
        fetchProfile();
    }, []);
    
    const handleLogout = () => {
        navigate('/');
        localStorage.removeItem("token");
        alert("You have been logged out");
      };
    

    

    return(
        <div className= "account-profile">
            <div className="header">
                <h1>Account Settings</h1>
                <div className= "sub-header">
                    <img src="https://picsum.photos/200" alt="profile" class="profile"/>
                    <div className="header-h2">
                        <p>{profile?.name || "loading..."}</p>
                        <p>{profile?.email || "loading..."}</p>
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