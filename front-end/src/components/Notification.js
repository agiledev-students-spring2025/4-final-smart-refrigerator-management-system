import { useState, useEffect } from "react";
import "./Notifications.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

function Notifications() {
    const [notifications, setNotifications] = useState({
        email: false,
        app: false,
        sms: false
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`${API_BASE_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            const notificationSettings = res.data.user.notifications || {};
            setNotifications({
                email: notificationSettings.email || false,
                app: notificationSettings.app || false,
                sms: notificationSettings.sms || false
            });
        })
        .catch(err => {
            console.error("Error loading notification settings:", err);
        });
    }, []);

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setNotifications(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleSave = () => {
        const token = localStorage.getItem("token");
    
        const notificationData = {
            email: notifications.email,
            app: notifications.app,
            sms: notifications.sms
        };
    
        axios.post(
            `${API_BASE_URL}/Account-Setting/notifications`,
            { value: notificationData },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        .then(res => {
            console.log("Saved notification settings:", res.data);
            navigate("/settings");
        })
        .catch(err => {
            console.error("Error saving notification settings:", err);
        });
    };
    

    return (
        <div className="form-collector">
            <div className="header">
                <h1>Notification Settings</h1>
                <p>Manage how you receive updates from us</p>
            </div>

            <div className="feature-select">
                <label className="settings-label">
                    <input 
                        type="checkbox" 
                        name="email" 
                        checked={notifications.email} 
                        onChange={handleChange}
                        className="checkbox-input"
                    />
                    Email Notifications
                </label>

                <label className="settings-label">
                    <input 
                        type="checkbox" 
                        name="app" 
                        checked={notifications.app} 
                        onChange={handleChange}
                        className="checkbox-input"
                    />
                    App Notifications
                </label>

                <label className="settings-label">
                    <input 
                        type="checkbox" 
                        name="sms" 
                        checked={notifications.sms} 
                        onChange={handleChange}
                        className="checkbox-input"
                    />
                    SMS Notifications
                </label>
            </div>

            <div className="button-group">
                <button className="submit-button settings-save" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default Notifications;
