import React, { Component } from "react";
import axios from 'axios';
import Card from '../components/Card';
import Container from '../components/Container';
import Login from "../components/Login";
import Row from '../components/Row';
import GraphContainer from '../components/GraphContainer';
import UserBlock from '../components/UserBlock';

class LoginPage extends Component {
  state = {
    username: "",
    googleID: 0,
    loggedIn: false
  }
  
  constructor(props) {
  super(props);
 
  this.responseGoogle = this.responseGoogle.bind(this);
}

 responseGoogle = (response) => {
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

};

putDataToDB = (message) => {
  let newUsername = this.state.username
  let newGoogleID = this.state.googleID

  axios.post('http://localhost:3001/api/putData', {
    username: newUsername,
    googleID: newGoogleID
  });
};

  render() {

    return (
      !this.state.loggedIn ? (
        <Container fluid=" login-container">
          <Card heading={<h1>Welcome to the Idea Exchange!</h1>}>

            <Login responseGoogle={this.responseGoogle} />
            <br></br> <br></br> <br></br>
            <h2>A quick stop stock research app made for simplicities sake.</h2>
          </Card>
        </Container>) :
        (<Container>
          <Row>
            <GraphContainer />
            <UserBlock />
          </Row>
        </Container>
        ));
  }
}

export default LoginPage;
