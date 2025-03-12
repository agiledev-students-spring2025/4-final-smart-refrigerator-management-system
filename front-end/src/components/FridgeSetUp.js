import { useState } from "react";
import "./FridgeSetUp.css"
import { useNavigate } from "react-router-dom";

function FridgeSetup() {
    
    const [selectedBrand, setBrand] = useState('');
    const [selectedModel, setModel] = useState('');
    const navigate = useNavigate();

    const[checkedHumidity,setHumidity] = useState(false);
    const[checkedFreezer,setFreezer] = useState(false);
    const[checkedVegetableDrawer,setVegetable] = useState(false);


    const SelectField = ({label, description, id, name, value, options, onChange }) => {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <select id={id} name={name} value={value} onChange={onChange}>
                    <option value="">{description}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    return(
    <div className="setup-app">
        <div className = "header">
            <h1>Refrigerator Model Setup</h1>
            <p>Setup your refrigerator model to get customized storage recommendations</p>
        </div>
        <div className ="form-collector">
            <div className = "form-group">
                <SelectField
                    label="Fridge Brand"
                    id="brand"
                    name="brand"
                    value={selectedBrand}
                    onChange={(event) => setBrand(event.target.value)}
                    description="select your brand"
                    options={["Samsung", "Fridgeware","LG","Bosch", "general electronics"]}
                    
                />
            </div>
            <div className = "form-group">
                <SelectField
                    label="Model Name"
                    id="model"
                    name="model"
                    value={selectedModel}
                    onChange={(event) => setModel(event.target.value)}
                    description="select your model"
                    options={["S29","HR22","Pro Max"]}
                />
            </div>
        </div>
        <div className="feature-select">
            <p className="settings-label">Features</p>
            <div className="checkbox">
                <input
                type="checkbox"
                id="Humidity"
                checked={checkedHumidity}
                onChange={() => setHumidity(!checkedHumidity)}
                />
                <label htmlFor="humidity">Humidity</label>
            </div>
            <div className="checkbox">
                <input
                type="checkbox"
                id="FreezerCompartment"
                checked={checkedFreezer}
                onChange={() => setFreezer(!checkedFreezer)}
                />
                <label htmlFor="FreezerCompartment">Freezer Compartment</label>
            </div>
        </div>
        <div className="button-group">
            <button className="submit-button settings-save" onClick={()=> navigate("/settings")}>Save</button>
        </div>
    </div>
    )
}


export default FridgeSetup;