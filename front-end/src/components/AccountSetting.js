import "./AccountSetting.css"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

function AccountInfo ({field, isEditing, info, changeText, onSave}){
    const [newValue, setNewValue] = useState(info);

    if(isEditing){
        return (
        <div className ="account-change">
            <label>
                {field}: <input name={field} defaultValue={newValue} onChange={(e) => setNewValue(e.target.value)}></input>
            </label>
            <button onClick={() => onSave(newValue)}>Save {changeText}</button>   
        </div> 
    )
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

    const [account, setAccount] = useState({
        name: "", 
        email: "",
        phone: "",
        isEditingName: false,
        isEditingEmail: false,
        isEditingPhone: false
    });

    //Post name change
    const handleNameSave = (newName) => {
        if(newName === null){
            setAccount({ ...account, isEditingName: true });
        }
        else{
            axios.post(`${API_BASE_URL}/Account-Setting/name`, { value: newName })
                .then((res) => {
                    setAccount({ ...account, name: res.data.name, isEditingName: false });
                })
                .catch((err) => console.error(err));
        }
    }

    //post email change
    const handleEmailSave = (newEmail) => {
        if(newEmail === null){
            setAccount({ ...account, isEditingEmail: true });
        }
        else{
            axios.post(`${API_BASE_URL}/Account-Setting/email`, { value: newEmail })
                .then((res) => {
                    setAccount({ ...account, email: res.data.email, isEditingEmail: false });
                })
                .catch((err) => console.error(err));
        }
    }
    
    // post phone changes
    const handlePhoneSave = (newPhone) => {
        if(newPhone === null){
            setAccount({ ...account, isEditingPhone: true });
        }
        else{
            axios.post(`${API_BASE_URL}/Account-Setting/phone`, { value: newPhone })
                .then((res) => {
                    setAccount({ ...account, phone: res.data.phone, isEditingPhone: false });
                })
                .catch((err) => console.error(err));
        }
    }

    useEffect( () => {
        axios.get(`${API_BASE_URL}/Account-Setting/name`)
            .then((res)=> {
                setAccount(prev => ({ ...prev, name: res.data.name }))
            })
            .catch((err) => console.error(err))

        axios.get(`${API_BASE_URL}/Account-Setting/email`)
            .then((res) => {
                setAccount(prev => ({ ...prev, email: res.data.email }));
            })
            .catch((err) => console.error(err));

        axios.get(`${API_BASE_URL}/Account-Setting/phone`)
            .then((res) => {
                setAccount(prev => ({ ...prev, phone: res.data.phone }));
            })
            .catch((err) => console.error(err));

    }, [])



    return(
        <div className="account-setting">
            <div className="header">
                <h1>Profile Information</h1>
            </div>
            <div className="account-change">
                <img src="https://picsum.photos/200"></img>
                <button>Change profile photo</button>
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
            <div className="account-change">
                <p>Security</p>
                <button>Change password</button>
            </div>
            <div>
                <p>getting error? navigate to <a href="/Help-Support">help & support</a></p>
            </div>
        </div>
    )
}
