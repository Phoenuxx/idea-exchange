import React, { Component } from "react";
import Col from "../Col";
import Card from "../Card";
import ListItem from '../ListItem';
import Logout from '../Logout';
import axios from 'axios';

class User extends Component {
    state = {
    username: "",
    pass: "",
    watchList: []
  }


  constructor(props) {
    super(props);
  }
  getDataFromDb = () => {
    axios.get('http://localhost:8080/api/getData/' + this.state.username)
    .then((response) => {
      console.log("test");
      // console.log(response.data)
      this.setState({
        watchList: response.data.watchList
      });
      console.log("__________");
      // console.log(this.state.watchList);
    });
  };

  // updateDB = (idToUpdate, updateToApply) => {
  //   let objIdToUpdate = null;
  //   parseInt(idToUpdate);
  //   this.state.data.forEach((dat) => {
  //     if (dat.id == idToUpdate) {
  //       objIdToUpdate = dat._id;
  //     }
  //   });

  //   axios.post('http://localhost:3001/api/updateData', {
  //     id: objIdToUpdate,
  //     update: { message: updateToApply },
  //   });
  // };
  
  componentDidMount() {
    this.getDataFromDb();
  }


  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    
  }

  

  render(props) {
    return (
      <Col size="md-4">
      <Card heading={this.state.username} logout={<Logout />}>
      {this.state.watchList.map( symbol => {
        return (
          <div>
            <ListItem
              key={symbol}
              name={symbol} 

            />
            <br></br>
          </div>
        );
      })}
        </Card>
      </Col>
    );
  }
}

export default User;