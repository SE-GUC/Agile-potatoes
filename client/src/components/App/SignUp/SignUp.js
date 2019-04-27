import React ,{Component} from 'react';
import PartnerForm from '../CreatePartnerForm/CreatePartnerForm'
import {NavLink} from 'react-router-dom'
import MemberForm from '../CreateMemberForm/CreateMemberForm'
class SignUp extends Component{
   constructor(props){
       super(props);
       this.state={
           toggle:0
       }
   }
   handletoggle=async()=>
   {
       await this.setState({toggle:1})
       console.log("PAR "+this.state.toggle)
   }
   handletoggle1=async()=>
   {
       await this.setState({toggle:2})
       console.log("MEM "+this.state.toggle)
   }
   
    render(){
        let func;
        if(this.state.toggle == 1)
        {
            func = 
            <PartnerForm/>
        
          

        }
        if(this.state.toggle == 2)
        {
            func = 
            <MemberForm />
           
        }
        return(
            <div className='card-group' > 
             <div className = 'container-fluid'>
             <div className = 'row'>
             <div className='side-bar col-sm-2 ' >
             <div className="list-group">
             <NavLink to="/signuppartner" className="link-button" onClick = {this.handletoggle}><p >Sign Up As A Partner</p></NavLink>
             <NavLink to="/signupmember" className="link-button" onClick = {this.handletoggle1}><p >Sign Up As A Member</p></NavLink>
                {/* <button onClick = {this.handletoggle} className="list-group-item list-group-item-action">Sign Up As A Partner</button>  */}
                {/* <button onClick = {this.handletoggle1} className="list-group-item list-group-item-action">Sign Up As A Member</button> */}
                </div>
                 </div>
                {func}
                </div>
                </div>
                 </div>
                
        )
    }
}
export default SignUp;