import "./AccountSetting.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import API_BASE_URL from "../api";

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /^\d{3}-\d{3}-\d{4}$/;
  return regex.test(phone);
};

function AccountInfo ({field, isEditing, info, changeText, onSave}){
    const [newValue, setNewValue] = useState(info);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    if(isEditing){
        return (
        <div className ="account-change">
            {field === "Password" ? (
          <>
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
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button onClick={() => onSave(password)}>Save {changeText}</button>
          </>
        ) : (
          <>
            <label>
              {field}:{" "}
              <input
                name={field}
                defaultValue={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </label>
            <button onClick={() => onSave(newValue)}>Save {changeText}</button>
          </>
        )}
      </div>
    );
    }
    return (
        <div className ="account-change">
            <p>
                {field}: {info}
            </p>
            <button onClick={() => onSave(null)}>Change {changeText}</button>   
        </div> 
    )
}

export default function AccountSetting () {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        name: "", 
        email: "",
        phone: "",
        password:"",
        isEditingName: false,
        isEditingEmail: false,
        isEditingPhone: false,
        isEditingPassword: false
    });

    //Post name change
    const handleNameSave = (newName) => {
        if (newName === null) {
          setAccount({ ...account, isEditingName: true });
        } else {
          if(newName.trim() === ''){
            alert("can't have blank name change");
            return;
          }
          axios.post(
            `${API_BASE_URL}/Account-Setting/name`,
            { value: newName },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          )
          .then((res) => {
            setAccount({ ...account, name: res.data.name, isEditingName: false });
          })
          .catch((err) => console.error(err));
        }
      };

    //post email change
    const handleEmailSave = (newEmail) => {
        if (newEmail === null) {
          setAccount({ ...account, isEditingEmail: true });
        } else {
          if(newEmail.trim() === ''){
            alert("can't have blank email change");
            return;
          }
          if(!validateEmail(newEmail)){
            alert("Please enter valid email address");
            return;
          }
          axios.post(
            `${API_BASE_URL}/Account-Setting/email`,
            { value: newEmail },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          )
          .then((res) => {
            setAccount({ ...account, email: res.data.email, isEditingEmail: false });
          })
          .catch((err) => console.error(err));
        }
      };
    
    // post phone changes
    const handlePhoneSave = (newPhone) => {
        if (newPhone === null) {
          setAccount({ ...account, isEditingPhone: true });
        } else {
          if(newPhone.trim() === ''){
            alert("can't have blank phone change");
            return;
          }
          if(!validatePhone(newPhone)){
            alert("Please enter in 000-000-0000 format");
            return;
          }
          axios.post(
            `${API_BASE_URL}/Account-Setting/phone`,
            { value: newPhone },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          )
          .then((res) => {
            setAccount({ ...account, phone: res.data.phone, isEditingPhone: false });
          })
          .catch((err) => console.error(err));
        }
      };

      const handlePasswordSave = (newPassword) => {
        if (newPassword === null){
            setAccount({ ...account, isEditingPassword: true });
        } else{
          if(newPassword.trim() === ''){
            alert("can't have blank password change");
            return;
          }
            axios.post(
                `${API_BASE_URL}/Account-Setting/password`,
                { value: newPassword },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
                }
              )
              .then(res => {
                console.log(res.data.message); // "password updated successfully"
              })
              .catch(err => console.error(err));  
              
            alert("Please login again using your new password");
            navigate('/');
            localStorage.removeItem("token");
            window.dispatchEvent(new Event("tokenChanged"));
        }
      }

    useEffect(() => {
        const token = localStorage.getItem("token");
      
        axios.get(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => {
            const { name, email, phone } = res.data.user;
            setAccount(prev => ({
              ...prev,
              name,
              email,
              phone
            }));
          })
          .catch(err => {
            console.error("Failed to fetch profile:", err);
          });
      }, []);      



    return(
        <div className="account-setting">
            <div className="header">
                <h1>Profile Information</h1>
            </div>
            <AccountInfo
                isEditing = {account.isEditingName} 
                field = "Full Name"
                info = {account.name}
                changeText = "account name"
                onSave={handleNameSave}
            />
            <AccountInfo
                isEditing = {account.isEditingEmail} 
                field = "Email"
                info = {account.email}
                changeText = "email"
                onSave={handleEmailSave}
            />
            <AccountInfo
                isEditing = {account.isEditingPhone} 
                field = "Phone number"
                info = {account.phone}
                changeText = "phone number"
                onSave={handlePhoneSave}
            />
            <AccountInfo
            isEditing={account.isEditingPassword}
            field="Password"
            info=""
            changeText="password"
            onSave={handlePasswordSave}
            />
            <div>
                <p>getting error? navigate to <a href="/Help-Support">help & support</a></p>
            </div>
        </div>
    )
}
