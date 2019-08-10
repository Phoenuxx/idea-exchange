import React, { Component } from "react";
// import Row from "../components/Row";
// import Col from '../components/Col';
// import Container from '../components/Container';
import { GoogleLogin } from 'react-google-login';
 

class Login extends Component {
  state = {
    username: "",
    googleID: null,
    loggedIn: false
  }

    render(props) {

        console.log(props);
        const responseGoogle = (response) => {
          console.log(response);
          console.log(response.profileObj);
          console.log(response.profileObj.googleId);
          console.log(response.profileObj.name);
          
          this.setState({
            username: response.profileObj.name,
            googleID: response.profileObj.googleId,
            loggedIn: true
          });
          console.log('login page state vvv');
          console.log(this.state);
        }
          const responseGoogleF = (response) => {
            console.log(response);

            console.log(this.state);
          }
         

        return (
            <GoogleLogin
                clientId="538074270661-hpd1f2m486cbm2jomvfr3vurqhqkmelr.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogleF}
                scope="profile"
                uxMode='redirect'
                redirectUri={"https://secure-sierra-85761.herokuapp.com/home"}
                cookiePolicy={'single_host_origin'}
            />
        );
    }
}

export default Login;