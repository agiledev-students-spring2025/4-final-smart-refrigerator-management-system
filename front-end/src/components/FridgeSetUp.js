import { useState, useEffect } from "react";
import axios from "axios";
import "./FridgeSetUp.css";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

function FridgeSetup() {
    const [selectedBrand, setBrand] = useState('');
    const [selectedModel, setModel] = useState('');
    const navigate = useNavigate();
    
    const [checkedHumidity, setHumidity] = useState(false);
    const [checkedFreezer, setFreezer] = useState(false);
    const [checkedVegetableDrawer, setVegetable] = useState(false);
    const [checkedIceMaker, setIceMaker] = useState(false);
    const [checkedTouchscreen, setTouchscreen] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`${API_BASE_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                const data = res.data.user.fridgeModel || {};
                setBrand(data.fridgeBrand || '');
                setModel(data.modelName || '');
                
                const features = data.Features || {};
                setHumidity(features.humidity || false);
                setFreezer(features.freezer || false);
                setVegetable(features.vegetableDrawer || false);
                setIceMaker(features.iceMaker || false);
                setTouchscreen(features.touchscreenPanel || false);
                
            })
            .catch(err => console.error("Error loading fridge settings:", err));
    }, []);
    
    const handleSave = () => {
        const token = localStorage.getItem("token");

        const fridgeData = {
            fridgeBrand: selectedBrand,
            modelName: selectedModel,
            Features: {
                humidity: checkedHumidity,
                freezerCompartment: checkedFreezer,
                vegetableDrawer: checkedVegetableDrawer,
                iceMaker: checkedIceMaker,
                touchscreenPanel: checkedTouchscreen,
            }
        };
        
        axios.post(`${API_BASE_URL}/Fridge-Model`,
            { value: fridgeData },
            {headers: {
                Authorization: `Bearer ${token}`,
              },
        })
            .then(res => {
                console.log("Saved successfully:", res.data);
                navigate("/settings");
            })
            .catch(err => {
                console.error("Error saving fridge settings:", err);
            });
    };

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
        <div className="header">
            <h1>Refrigerator Model Setup</h1>
            <p>Setup your refrigerator model to get customized storage recommendations</p>
        </div>
        <div className="form-collector">
            <div className="form-group">
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
            <div className="form-group">
                <SelectField
                    label="Model Name"
                    id="model"
                    name="model"
                    value={selectedModel}
                    onChange={(event) => setModel(event.target.value)}
                    description="select your model"
                    options={["20-30 cu ft 3 door","20-30 cu ft 4 door",">30 cu ft 3 door",">30 cu ft 4 door"]}
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
            <div className="checkbox">
                <input
                type="checkbox"
                id="VegetableDrawer"
                checked={checkedVegetableDrawer}
                onChange={() => setVegetable(!checkedVegetableDrawer)}
                />
                <label htmlFor="VegetableDrawer">Vegetable Drawer</label>
            </div>
            <div className="checkbox">
                <input
                type="checkbox"
                id="IceMaker"
                checked={checkedIceMaker}
                onChange={() => setIceMaker(!checkedIceMaker)}
                />
                <label htmlFor="IceMaker">Ice Maker</label>
                </div>

            <div className="checkbox">
                <input
                type="checkbox"
                id="TouchscreenPanel"
                checked={checkedTouchscreen}
                onChange={() => setTouchscreen(!checkedTouchscreen)}
                />
            <label htmlFor="TouchscreenPanel">Touchscreen Panel</label>
            </div>
        </div>
        <div className="button-group">
            <button className="submit-button settings-save" onClick={handleSave}>Save</button>
        </div>
    </div>
    )
}
 
export default FridgeSetup;