import React, { Component } from 'react'
 import './AdminName.css'
import axios from 'axios'
class AdminName extends Component {
    constructor() {
      super()
  
      this.state = {
          firstname: '',
          lastname: ''
      };
  }
  
  increment() {
      this.setState({
          firstname: this.state.firstname + '',
          lastname: this.state.lastname + ''
         
      })
  
     let updatedFN = this.state.firstname;
     let updatedLN = this.state.lastname;
  
      console.log(updatedFN)
      console.log(updatedLN)
  
      axios.put(`http://localhost:3001/api/profile/5caa1871578df243c420057a/name`,  { 'userType': 'Admin', 'fname' : updatedFN,'lname' : updatedLN } )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  
  
  
  handleChange(value) {
      this.setState({
          firstname: value
      });
  }
  
  handleChange1(value1) {
    this.setState({
        lastname: value1
    });
  }
  
  
  render() {
      return (
          <div>
              <p>New First Name: </p>
              <input type="text" value={this.state.firstname} onChange={(event) =>this.handleChange(event.target.value)} />
              <p>New Last Name: </p>
              <input type="text" value1={this.state.lastname} onChange={(event) =>this.handleChange1(event.target.value)} />
              <input type="submit" value="Change Name" onClick={() => this.increment()} />
              {/*<p><input type="button" value="clear msg" onClick={() => this.eraseWord()} /></p>*/}
          </div>
      );
  }
  }

export default AdminName;
