import React , {Component} from 'react';
import './Login.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {NavLink} from 'react-router-dom'

export class Login extends Component{


    constructor(props){
        super(props);
        this.state = {
            email:"",
            password: "",
           
        }
        console.log(this.props)
    }

    handleChange = (e) => {
        this.setState({
            email: document.getElementById("emailInput").value,
            password: document.getElementById("passwordInput").value
        })
    }

    login = async () => {
        let token = await axios.post('http://localhost:3001/api/profile/login', {
            email: this.state.email,
            password: this.state.password
        })
        
        this.props.changeLoggedInFlag(true);
        localStorage.setItem('token',JSON.stringify(token));
        // localStorage.setItem('LoggedIn', true);

      
        // let jsonToken = JSON.parse(localStorage.getItem('token'))
    
        // window.location.href = "http://localhost:3000/Home";
        // jwt.verify(jsonToken.data.authData, jsonToken.data.userData.secret, function(err, decoded){
        //    console.log(decoded.exp - (Math.floor(Date.now)/ 1000) === 0)

           
        // })
        // console.log()
        
    }
    handleSubmit = e => {
        e.preventDefault();
    }

    render(){

        return(
            <div>
          <div className = "MyLogin">
          <form onSubmit = {this.handleSubmit}>
                <label>E_mail: </label><input id="emailInput" className="i1" type="text" name = "email" onChange={this.handleChange}/><br/>
                <label>Password: </label><input id="passwordInput" className="i2" type="text" name = "password" onChange={this.handleChange}/><br/>
                <button>Submit</button>
                </form>
          <NavLink  className="btn btn-success" type="submit" onClick = {this.login} to="/Home">Login</NavLink>
          </div>
</div>
        )
    }
}
export default Login