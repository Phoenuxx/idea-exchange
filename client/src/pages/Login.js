import React, { Component } from "react";
// import Row from "../components/Row";
// import Col from '../components/Col';
import Card from '../components/Card';
import Container from '../components/Container';
import Login from "../components/Login";

// import Logout from '../components/Logout';


class LoginPage extends Component {
    state = {
        username: "",
        googleID: 0,
        loggedIn: false
    }

    render(props) {

        return (
            <Container fluid=" login-container">
                <Card heading={<h1>Welcome to the Idea Exchange!</h1>}>

                    <Login responseGoogle={props.responseGoogle} />
                    <br></br> <br></br> <br></br>
                    <h2>A quick stop stock reasearch app made for simplicities sake.</h2>
                </Card>
            </Container>
        )  
    }
}

export default LoginPage;
