import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'
export class Navbar extends Component {
    constructor(props){
        super(props);
        this.state={
            // isLoggedIn: false,  // should be replaced with actaul user data that comes as props from App component
            userData:{}
        }
    }
    
    logout = () => {
        this.props.changeLoggedInFlag(false)
  
    }
  render() {
    return (
      <nav  className="myNav row">
        <div className="left-nav col-sm-4 row">
            <NavLink to="/" className="brand-button offset-sm-1 col-sm-6"><p className="text-center">LIRTEN HUB <i className="fas fa-cat"></i></p></NavLink>
        </div>
        <div className="middle-nav col-sm-4 row">
            <NavLink to="/" className="link-button col-sm-3"><p className="text-center">Home</p></NavLink>
            <NavLink to="/vacancies" className="link-button col-sm-3"><p className="text-center">Vacancies</p></NavLink>
            <NavLink to="/events" className="link-button col-sm-3"><p className="text-center">Events</p></NavLink>
            <NavLink to="/" className="link-button col-sm-3"><p className="text-center">Certificates</p></NavLink>
            <NavLink to="/partnerprofile" className="link-button col-sm-3"><p className="text-center">Partner Profile</p></NavLink>
            <NavLink to="/memberprofile" className="link-button col-sm-3"><p className="text-center">Member Profile</p></NavLink>
            <NavLink to="/adminprofile" className="link-button col-sm-3"><p className="text-center">Admin Profile</p></NavLink>
        </div>
        
            {
                this.props.loggedIn?
                (<div className="right-nav col-sm-4 row">
                    <NavLink to="/" className="link-button offset-sm-3 col-sm-4"><p className="text-center">My Profile  <i className="fas fa-user"></i></p></NavLink>
                    <NavLink to="/login" onClick = {this.logout} className="link-button col-sm-4"><p className="text-center">Log Out  <i className="fas fa-sign-out-alt"></i></p></NavLink>
                </div>
                ):(
                <div className="right-nav col-sm-4 row"> 
                    <NavLink to="/login" className="link-button offset-sm-6 col-sm-3"><p className="text-center">Log In  <i className="fas fa-sign-in-alt"></i></p></NavLink>
                    <NavLink to="/" className="link-button col-sm-3"><p className="text-center">Sign Up</p></NavLink>
                </div>)
            }
      </nav>
    )
  }
}

export default Navbar
