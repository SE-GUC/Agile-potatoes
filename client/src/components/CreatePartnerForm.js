import React, { Component } from 'react'
import { render } from 'react-dom';
import axios from 'axios';

class CreatePartnerForm extends Component {
    state = {
        username: '',
        password: '',
        name: '',
        email: '',
        workfield: ''
    }
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/profile/Create', {
            "userType": "Partner",
            "username": this.state.username,
            "password": this.state.password,
            "name": this.state.name,
            "email": this.state.email,
            "workfield": this.state.workfield
        }).then(console.log(this.state))
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Partner signup </h1><br></br>
                <input type="text" name="username" placeholder='username' onChange={this.onChange} /><br></br>
                <input type="text" name="password" placeholder='password' onChange={this.onChange} /><br></br>
                <input type="text" name="name" placeholder='name' onChange={this.onChange} /><br></br>
                <input type="text" name="email" placeholder='email' onChange={this.onChange} /><br></br>
                <input type="text" name="workfield" placeholder='workfield' onChange={this.onChange} /><br></br>
                <input type="submit" value="Submit" />


            </form>
        )
    }
}
export default CreatePartnerForm; 