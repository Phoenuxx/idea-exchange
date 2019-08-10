import React, { Component } from "react";
import { GoogleLogout } from 'react-google-login';

class Logout extends Component {
    render() {
        const logout = null;

        const responseGoogle = (response) => {
            console.log(response);
            console.log(response.profileObj);
            console.log(response.profileObj.googleId);
            console.log(response.profileObj.name);
        }

        return(

            <GoogleLogout
                clientId="538074270661-hpd1f2m486cbm2jomvfr3vurqhqkmelr.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
                onFailure={responseGoogle}
                uxMode='redirect'
                redirectUri="http://localhost:3000/"
            >

            </GoogleLogout>
    )}
}
export default Logout;