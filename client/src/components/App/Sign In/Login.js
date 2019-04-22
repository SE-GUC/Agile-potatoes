import React , {Component} from 'react';
import './Login.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {NavLink,Redirect} from 'react-router-dom'

export class Login extends Component{


    constructor(props){
        super(props);
        this.state = {
            email:"",
            password: "",
            toHome:false
        }
    }

    handleChange = (e) => {
        this.setState({
            email: document.getElementById("emailInput").value,
            password: document.getElementById("passwordInput").value,
            toHome: this.state.toHome
        })
    }

    login = async () => {
        try {
            let token = await axios.post('http://localhost:3001/api/profile/login', {
                email: this.state.email,
                password: this.state.password
            })
            localStorage.setItem('token', JSON.stringify(token));
            this.setState({
                ...this.state,
                toHome: true
            },()=> {
                console.log(this.state.toHome)  
                this.props.changeLoggedInFlag(true);
            })
        }
        catch(e){
            if(e.response){
                this.refs.alert1.innerText = e.response.data;
                this.refs.alert1.style.display = "block";
            }
            else{
                console.log(e);
            }
        };
        
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
        if (this.state.toHome) {
            return <Redirect to = '/' />
        }

        return(
        <div className="row">
          <div className = "MyLogin col-sm-4 offset-sm-4">
            <form className="form-group" onSubmit = {this.handleSubmit}>
                <label htmlFor="emailInput">E_mail: </label><input className="form-control" id="emailInput" type="text" name = "email" onChange={this.handleChange}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                <br/><br/>
                <label htmlFor="passwordInput">Password: </label><input className="form-control" id="passwordInput" type="password" name = "password" onChange={this.handleChange}/>
                          <div ref="alert1"className="alert alert-danger alert-dev2"role="alert">This is a primary alert—check it out</div>

            </form>
          {/* <NavLink className="btn btn-success" type="submit" onClick = {this.login} to="/Home">LOG IN</NavLink> */}
            <button className="btn btn-success" type="submit" onClick = {this.login}>LOG IN</button>

          </div>
        </div>
        )
    }
}
export default Login