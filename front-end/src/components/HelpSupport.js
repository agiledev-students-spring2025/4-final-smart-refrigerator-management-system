import "./HelpSupport.css"

function HelpSupport () {

    return(
    <div className="help-container">
        <div>
            <h1>Help & Support</h1>
        </div>
        <div className ="search-fields">
            <h2>How can we help?</h2>
            <p>Search keyword</p>
            <label className="search-bar">
                <input name="search"></input>
                <button className="search-button">search</button>
            </label>
            
            <p>or email us at help@smartfridge.com</p>
        </div>
    </div>
    )
}

export default HelpSupport;
