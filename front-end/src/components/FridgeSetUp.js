import { useState } from "react";

function FridgeSetup() {
    
    const [selectedBrand, setBrand] = useState('');
    const [selectedModel, setModel] = useState('');

    const handleChange = (event) => {
        setBrand(event.target.value);
        setModel(event.target.value)
    }

    

    return(
    <div>
        <div className = "form-group">
            <label htmlFor="Brand">Brand Name</label>
            <select
                id="brand"
                name="brand"
                value={selectedBrand}
                onChange={handleChange}
                >
                <option value="">Select your brand</option>
                <option value="Samsung">Samsung</option>
                <option value="fridgeware">Fridgeware</option>
            </select>
        </div>
        <div className = "form-group">
            <label htmlFor="Model">Model Name</label>
            <select
                id="model"
                name="model"
                value={selectedModel}
                onChange={handleChange}
                >
                <option value="">Select your model</option>
                <option value="Samsung">S29</option>
                <option value="fridgeware">HR22</option>
            </select>
        </div>
    </div>
    )
}


export default FridgeSetup;