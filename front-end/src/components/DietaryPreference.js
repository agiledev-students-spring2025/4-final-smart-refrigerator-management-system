import { useState } from "react";
import "./FridgeSetUp.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API_BASE_URL from "../api";

function DietaryPreference() {

    const [selectedDiet, setDiet] = useState('');
    const [selectedAllergies, setAllergies] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
      
        axios.get(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
          .then(res => {
            const dietary = res.data.user.dietary || {};
            setDiet(dietary.dietType || '');
            setAllergies(dietary.nutritionGoals || '');
            setSelectedValues(dietary.allergies || []);
          })
          .catch(err => {
            console.error("Error loading dietary preferences:", err);
          });
      }, []);
    
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

    const handleSave = () => {
        const token = localStorage.getItem("token");
      
        const dietaryData = {
          dietType: selectedDiet,
          nutritionGoals: selectedAllergies,
          allergies: selectedValues
        };
      
        axios.post(
          `${API_BASE_URL}/Account-Setting/dietary`,
          { value: dietaryData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        )
          .then(res => {
            console.log("Saved dietary preferences:", res.data);
            navigate("/settings");
          })
          .catch(err => {
            console.error("Error saving dietary preferences:", err);
          });
      };

    const SelectMultipleField = ({label, description, id, name, value, options, onChange }) => {
        const handleChange = (event) => {
            const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
            onChange(selectedOptions);
        };

        return (
            <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <select 
                id={id} 
                name={name} 
                multiple={true} 
                value={value} 
                onChange={handleChange}
                size={4} 
                className="multi-select"
            >
                {description && <option disabled>{description}</option>}
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div className="selected-values">
                Selected: {value.length > 0 ? value.join(", ") : "None Selected"}
            </div>
        </div>
        );
    };
    
    return(
        <div className ="form-collector">
            <div className="header">
                <h1>Dietary Prefernece</h1>
                <p>Customize how we suggest receipts and track nutrition</p>
            </div>
            <div className="form-group">
                <SelectField
                    label="Diet Type"
                    id="diet"
                    name="diet"
                    value={selectedDiet}
                    description="select your diet type"
                    options={["Vegetarian","Vegan"]}
                    onChange={(event) => setDiet(event.target.value)}
                />
            </div>
            <div className="form-group">
                <SelectField
                    label="Nutrition Goals"
                    id="goals"
                    name="goals"
                    value={selectedAllergies}
                    description="select your goals"
                    options={["Be healthier","Be more fit"]}
                    onChange={(event) => setAllergies(event.target.value)}
                />
            </div>
            <div className="form-group">
                <SelectMultipleField
                    label="Allergies & Restrictions"
                    description="Choose your options"
                    id="multi-select"
                    name="multiSelect"
                    value={selectedValues}
                    options={["Peanuts", "Milk", "Shellfish", "Soy", "Treenuts"]}
                    onChange={setSelectedValues}
                />
            </div>
            <div className="button-group">
                <button className="submit-button settings-save" onClick={handleSave}>Save</button>
            </div>
        </div>
    )

}

export default DietaryPreference;