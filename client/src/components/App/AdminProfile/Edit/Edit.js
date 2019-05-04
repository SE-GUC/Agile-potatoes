import React,{Component} from 'react'
import axios from 'axios'
class Edit extends Component{
    constructor(props){
        super(props);
        this.state={
            oldPass:undefined,
            newPass:undefined,
            confPass:undefined,
            fname:"",
            lname:"",
            address:"",
            skill:"",
            skillsList:[],
            interest:"",
            interestsList:[],
            cond:""
        } 
    }
    handleChange = ()=> {
        if(document.getElementById("c2"))
        {
            this.setState({
             oldPass :String(document.getElementById("c2").value),
             newPass:String(document.getElementById("c3").value) ,
             confPass :String(document.getElementById("c4").value),
            });
        }
        else
        {
            if(document.getElementById("c5"))
            {
                this.setState({
                fname:String(document.getElementById("c5").value),
                });
            }
            else
            {
                if(document.getElementById("c6"))
                {
                    this.setState({
                    lname:String(document.getElementById("c6").value),
                  
                    });
                }
                else
                {
                    if(document.getElementById("c7"))
                    {
                            this.setState({
                            address:String(document.getElementById("c7").value),
                          
                           });
                    }
                    else
                    {
                        if(document.getElementById("c8"))
                        {
                            this.setState({
                            skill:String(document.getElementById("c8").value),
                           
                            });
                        }
                        else
                        {
                            if(document.getElementById("c9"))
                            {
                                this.setState({
                                interest:String(document.getElementById("c9").value),
                               
                                });
                            }
                        }
                    }
                }       
            }
        }
        }
    handleButtonChange1 = ()=> {
        this.setState({
            cond:"button1",
                
                    });
                }
    handleButtonChange2 = ()=> {
        this.setState({
            cond:"button2",
                                
        });
        }
    handleButtonChange3 = ()=> {
        this.setState({
            cond:"button3",
                   
        });
    }
    handleButtonChange4 = ()=> {
        this.setState({
             cond:"button4",
                   
         });
        }
     handleButtonChange5 = ()=> {
         this.setState({
            cond:"button5",
                       
        });
         }
    handleButtonChange6 = ()=> {
        this.setState({
             cond:"button6",
                       
        });
    }

    
      

      handleChangeSkill = ()=> {
        this.setState({
            skillsList:this.state.skillsList.concat(this.state.skill)
            });
            console.log(this.state.skill)
            console.log(this.state.skillsList)
      }
    
      handleChangeInterest = ()=> {
        this.setState({
             interestsList:this.state.interestsList.concat(this.state.interest)
            });
           console.log(this.state.interest)
           console.log(this.state.interestsList)
      }
      handleSubmit = eve => {
        eve.preventDefault();
    
      }

    update=async()=>
    {
        
        if(this.state.oldPass)
       { 
        console.log("ENTERED")
           let old = await axios.get('http://localhost:3001/api/profile/5cb1c35d35ac5603c46764cd/GetPassword')
          
           if(old.data == this.state.oldPass)
            {
                if(this.state.newPass == this.state.confPass)
                    {
                        if(this.state.newPass != this.state.oldPass)
                        {
                            try{
                            let newPassword = await axios.put('http://localhost:3001/api/profile/5cb1c35d35ac5603c46764cd/update',{
                                'userType':'Member',
                                'userId':'5cb1c35d35ac5603c46764cd',
                                'password':''+this.state.newPass})
                            console.log(newPassword.data);
                            }
                            catch(err)
                            {
                                console.log("ERROR" + err)
                            }
                            document.getElementById("c2").value = ""
                            document.getElementById("c3").value = ""
                            document.getElementById("c4").value = ""
                           
                        }
                        else
                        {
                            window.alert("The new password is the same as the old password.Please enter a different new password.")
                        }
                    }
                    else
                    {
                        window.alert("The confirmed password did not match the new password.Please re-confirm your password!")
                    }
                    
            }
            else
                    {
                        window.alert("The old password is incorrect.Please re-enter your old password!")
                    }
        }
       
         if(this.state.fname )
            {
                try{
                    let newprof = await axios.put('http://localhost:3001/api/profile/5cb1c35d35ac5603c46764cd/update',{
                        'userType':'Member',
                        'userId':'5cb1c35d35ac5603c46764cd',
                        'fname':''+this.state.fname})
                    console.log(newprof.data);
                    }
                    catch(err)
                    {
                        console.log("ERROR" + err)
                    }
                    document.getElementById("c5").value = ""
                   
            }
            if(this.state.lname )
            {
                try{
                    let newprof = await axios.put('http://localhost:3001/api/profile/5cb1c35d35ac5603c46764cd/update',{
                        'userType':'Member',
                        'userId':'5cb1c35d35ac5603c46764cd',
                        'lname':''+this.state.lname})
                    console.log(newprof.data);
                    }
                    catch(err)
                    {
                        console.log("ERROR" + err)
                    }
                    document.getElementById("c6").value = ""
            }

            if(this.state.address)
            {
                try{
                    let newprof = await axios.put('http://localhost:3001/api/profile/5cb1c35d35ac5603c46764cd/update',{
                        'userType':'Member',
                        'userId':'5cb1c35d35ac5603c46764cd',
                        'address':''+this.state.address})
                    console.log(newprof.data);
                    }
                    catch(err)
                    {
                        console.log("ERROR" + err)
                    }
                    document.getElementById("c7").value = ""
            }
            if(this.state.skillsList.length>0)
            {
                try{
                    let newskill = await axios.put('http://localhost:3001/api/profile/5cb1c35d35ac5603c46764cd/update',{
                        'userType':'Member',
                        'userId':'5cb1c35d35ac5603c46764cd',
                        'skills':this.state.skillsList})
                    console.log(newskill.data);
                    }
                    catch(err)
                    {
                        console.log("ERROR" + err)
                    }
                    document.getElementById("c8").value = ""
            }
            if(this.state.interestsList.length>0)
            {
                try{
                    let newint = await axios.put('http://localhost:3001/api/profile/5cb1c35d35ac5603c46764cd/update',{
                        'userType':'Member',
                        'userId':'5cb1c35d35ac5603c46764cd',
                        'interests':this.state.interestsList})
                    console.log(newint.data);
                    }
                    catch(err)
                    {
                        console.log("ERROR" + err)
                    }
                    document.getElementById("c9").value = ""
            }
        
    }

    render(){
        let func ;
        if(this.state.cond == "button1")
        {
           func= <div className="card profileCard">
            <div className="card-body">
            <form onSubmit={this.handleSubmit}>
           <label>
            Old Password:<br/>
            <input id = "c2" type="text" name="oldPass" onChange={this.handleChange} /><br/>
            New Password:<br/>
            <input id = "c3" type="text" name="newPass" onChange={this.handleChange} /><br/>
            Confirm New Password:<br/>
            <input id = "c4" type="text" name="confPass" onChange={this.handleChange} /><br/> 
            </label>
            <br/>
            <label>
            <button onClick = {this.update} type="submit" className="btn btn-primary">UPDATE</button><br/>
            </label>
            </form>
            </div>
            </div>
        }
        if(this.state.cond == "button2")
        {
            func = 
            <div className="card profileCard">
            <div className="card-body">
            <form>
            <label>
            First Name:<br/>
            <input id = "c5" type="text" name="fname" onChange={this.handleChange} />
            </label>
            <label>
            <button onClick = {this.update} type="submit" className="btn btn-primary">UPDATE</button><br/>
            </label>
            </form>
            </div>
            </div>
        }

        if(this.state.cond == "button3")
        {
           func =
           <div className="card profileCard">
            <div className="card-body">
            <form>
            <label> 
            Last Name:<br/>
            <input id = "c6" type="text" name="lname" onChange={this.handleChange} />
            </label>
            <label>
            <button onClick = {this.update} type="submit" className="btn btn-primary">UPDATE</button><br/>
            </label>
            </form>
        </div>
        </div>
        }
        if(this.state.cond == "button4")
        {
            func =
           <div className="card profileCard">
            <div className="card-body">
            <form>
            <label>
            Address:<br/>
            <input id = "c7" type="text" name="address" onChange={this.handleChange} /><br/> 
            </label>
            <label>
            <button onClick = {this.update} type="submit" className="btn btn-primary">UPDATE</button><br/>
            </label>
            </form>
        </div>
        </div>
        }
        if(this.state.cond == "button5")
        {
            func = 
            <div className="card profileCard">
            <div className="card-body">
            <form>
            <label>
            Skill:<br/>
            <input id = "c8" type="text" name="Skill" onChange= {this.handleChange}/><br/>
            </label>
            <br/>
            <label>
            <button onClick = {this.handleChangeSkill} type="submit"className="btn btn-primary">ADD SKILL</button><br/>
            </label>
           <br/>
            <label>
            <button onClick = {this.update} type="submit" className="btn btn-primary">UPDATE</button><br/>
            </label>
            </form>
            
        </div>
        </div>
        }

        if(this.state.cond == "button6")
        {
            func=
            <div className="card profileCard">
            <div className="card-body">
            <form>
            <label>
            Interest:<br/>
            <input id = "c9" type="text" name="Interest" onChange= {this.handleChange}/><br/>
            </label>
            <br/>
            <label>
            <button onClick = {this.handleChangeInterest} type="submit"className="btn btn-primary">ADD INTEREST</button><br/>
            </label>
            <br/>
            <label>
            <button onClick = {this.update} type="submit" className="btn btn-primary">UPDATE</button><br/>
            </label>
        </form>
        </div>
        </div>
        }

        return(
        <div className='card-group'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                   
                        <div className="list-group">
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <button onClick = {this.handleButtonChange1} type="submit" className="btn btn-primary">UPDATE PASSWORD</button><br/>
                            <button onClick = {this.handleButtonChange2} type="submit"className="btn btn-primary">UPDATE FIRST NAME</button><br/>
                            <button onClick = {this.handleButtonChange3} type="submit" className="btn btn-primary">UPDATE LAST NAME</button><br/>
                            <button onClick = {this.handleButtonChange4} type="submit" className="btn btn-primary">UPDATE ADDRESS</button><br/>
                            <button onClick = {this.handleButtonChange5} type="submit" className="btn btn-primary">UPDATE SKILLS</button><br/>
                            <button onClick = {this.handleButtonChange6} type="submit" className="btn btn-primary">UPDATE INTERESTS</button><br/>
            
                        </div>
                
    {/* <div className='profile-window col-sm-10'> */}
       {func}
              {/* </div>      */}
            </div>
        </div>
      </div>
        )
    }
}
export default Edit