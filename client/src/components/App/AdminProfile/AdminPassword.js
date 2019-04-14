import React, { Component } from 'react';
import './AdminPassword.css';
import axios from 'axios'

class AdminPassword extends Component {
  constructor() {
    super()

    this.state = {
        password: ''
    };
}

increment() {
    this.setState({
        password: this.state.password + ''
       
    })

   let updatedpassword = this.state.password;

    console.log(updatedpassword)

    axios.put(`http://localhost:3001/api/profile/5caa1871578df243c420057a/password`,  { 'userType': 'Admin', 'password' : updatedpassword } )
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
}



handleChange(value) {
    this.setState({
        password: value
    });
}


render() {
    return (
        <div>
            <p>New Password: </p>
            <input type="text" value={this.state.password} onChange={(event) =>this.handleChange(event.target.value)} />
            <input type="submit" value="Change Password" onClick={() => this.increment()} />
            {/*<p><input type="button" value="clear msg" onClick={() => this.eraseWord()} /></p>*/}
        </div>
    );
}
}

export default AdminPassword;
