import "./AccountSetting.css"

function AccountSetting () {


    return(
        <div className="account-setting">
            <div className="header">
                <h1>Profile Information</h1>
            </div>
            <div className="account-change">
                <img src="https://picsum.photos/200"></img>
                <button>Change profile photo</button>
            </div>
            <div className="account-change">
                <p>Full Name: John White</p>
                <button>Change account name</button>
            </div>
            <div className="account-change">
                <p>Email: johnwhite.example.com</p>
                <button>Change email</button>
            </div>
            <div className="account-change">
                <p>Phone number: 000-000-0000</p>
                <button>Change phone number</button>
            </div>
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

export default AccountSetting;