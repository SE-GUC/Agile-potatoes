import React,{Component} from 'react'
import axios from 'axios'
import './Edit.css'
class Edit extends Component{
    constructor(props){
        super(props);
        this.handlerender = this.handlerender.bind(this);
        this.state={
            oldPass:undefined,
            newPass:undefined,
            confPass:undefined,
            oldMembershipState:"",
            newMembershipState:"",
            boardMemberName:"",
            boardMemberEmail:"",
            boardMembers:[],
            bool:2,
        } 
       
    }
    handleChange = ()=> {
        if(document.getElementById("b2"))
       { this.setState({
             oldPass :String(document.getElementById("b2").value),
             newPass: String(document.getElementById("b3").value) ,
             confPass : String(document.getElementById("b4").value) ,
            
            });
           
        }
        else
        {
            if(document.getElementById("b5"))
            this.setState({
               
                boardMemberName: String(document.getElementById("b5").value),
                boardMemberEmail: String(document.getElementById("b6").value),
               });
              
           }
        }

      
    
      handleSubmit = event => {
        event.preventDefault();
    
      }
     handleChangeBM=()=>{
        this.setState({
            boardMembers:this.state.boardMembers.concat({name:this.state.boardMemberName,email:this.state.boardMemberEmail})
           });
           console.log(this.state.boardMemberName + " "+this.state.boardMemberEmail  )
           console.log(this.state.boardMembers)
     }
     
    update=async()=>
    {
       
        if(this.state.oldPass)
        { 
            
        let old  = await axios.get('http://localhost:3001/api/profile/5cb06d10dcd7922b68b5d5b3/GetPassword')    
         if(old.data == this.state.oldPass){
            if(this.state.newPass == this.state.confPass)
                {
                    if(this.state.newPass != this.state.oldPass)
                    {

                        let newPassword = await axios.put('http://localhost:3001/api/profile/5cb06d10dcd7922b68b5d5b3',{
                            'userType':'Partner',
                            'userID':'5cb06d10dcd7922b68b5d5b3',
                            'password':this.state.newPass+''})
                        console.log(newPassword.data)
                        document.getElementById("b2").value = ""
                        document.getElementById("b3").value = ""
                        document.getElementById("b4").value = ""
                    }
                    else{
                            window.alert("Old password is the same as new password.Please choose a different new password")
                    }
                }
                else
                {
                    window.alert("The confirmed password didn't match the new password")
                }
        }
            else{
                window.alert("Old Password is incorrect")
            }
            
        }
        else
        {
            if(this.state.boardMembers.length>0)
            {
                console.log( this.state.boardMembers)
                let newBoard = await axios.put('http://localhost:3001/api/profile/5cb06d10dcd7922b68b5d5b3',{
                    'userType':'Partner',
                    'userID':'5cb06d10dcd7922b68b5d5b3',
                    'boardMembers':this.state.boardMembers})
                    console.log(newBoard.data)
            }
            document.getElementById("b5").value = ""
            document.getElementById("b6").value = ""
        }
    }
    handlerender=()=>
    {
        
       this.setState({bool:1})
       
    }
    handlerender1=()=>
    {
        
       this.setState({bool:0})
       
    }
   
    render(){
       
        let button;
        console.log(this.state.bool)
        if(this.state.bool === 1)
        {
            
                 
               button=  <div className="card profileCard">
                <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                <label>
                    Old Password:<br/>
                    <input id = "b2" type="text" name="oldPass" onChange={this.handleChange} /><br/>
                    New Password:<br/>
                    <input id = "b3" type="text" name="newPass" onChange={this.handleChange} /><br/>
                    Confirm New Password:<br/>
                    <input id = "b4" type="text" name="confPass" onChange={this.handleChange} /><br/>
                    <label>
                    <button onClick = {this.update} type="submit"className="btn btn-primary">UPDATE PASSWORD</button><br/>
                    </label>
                </label>
                <br/>
                </form>
                </div>
                </div>
               
        
            

        }
        else
        {
            
            if(this.state.bool === 0){
            console.log(this.state.bool)
               button= <div className="card profileCard">
                        <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                        <label>
                            Board Member Name:<br/>
                            <input id = "b5" type="text" name="boardMemberName" onChange= {this.handleChange}/><br/>
                            Board Member Email:<br/>
                            <input id = "b6" type="text" name="boardMemberEmail" onChange= {this.handleChange}/><br/>
                            <button onClick = {this.handleChangeBM} type="submit"className="btn btn-primary">ADD BOARD MEMBER</button><br/>
                            <button onClick = {this.update} type="submit"className="btn btn-primary">UPDATE BOARD MEMBERS</button><br/>
                        </label>
                        <br/>
                        </form>
                        </div>
                        </div>
                       
            }   
        }
        return(
            <div className='card-group'>
        <div className = 'container-fluid'>
        <div className = 'row'>
       
        <div className="list-group">
          
          <button onClick = {this.handlerender} type="submit" className="btn btn-primary">CHANGE PASSWORD</button><br/>
          <button onClick = {this.handlerender1} type="submit" className="btn btn-primary">ADD BOARD MEMBER</button><br/>
         
         </div>
        </div>
        <div className='profile-window col-sm-10'>
        {button}
        </div>
        </div>
       
      </div>
    
        )
    }
}
export default Edit