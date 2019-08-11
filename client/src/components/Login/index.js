import React, { Component } from "react";
// import Row from "../components/Row";
// import Col from '../components/Col';
// import Container from '../components/Container';
import { GoogleLogin } from 'react-google-login';
 

class Login extends Component {
  state = {
    username: "User",
    googleID: null,
    loggedIn: false
  }

    render(props) {
        console.log("props vvv");
        console.log(this.props);
        
          const responseGoogleF = (response) => {
            console.log(response);

            console.log(this.state);
          }
         

        return (
            <GoogleLogin
                clientId="538074270661-hpd1f2m486cbm2jomvfr3vurqhqkmelr.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={this.props.responseGoogle}
                onFailure={responseGoogleF}
                scope="profile"
                uxMode='redirect'
                redirectUri={"localhost:3000"}
                cookiePolicy={'single_host_origin'}
            />
        );
    }
}

export default Login;