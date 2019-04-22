import React, { Component } from 'react'
import axios from 'axios';
import '../MemberProfile/MemberProfile.css'
class CreateMemberForm extends Component {
    constructor(props){
        super(props);
        this.state = {
        fname: '',
        lname:'',
        email: '',
        password: "",
        confirmPass:"",
        username: '',
        address:'',
        skill:'',
        skills:[],
        masterclass:'',
        masterclasses:[],
        certificate:'',
        certificates:[],
        interest:'',
        interests:[],
        cond:"",
    }
}

    handleChange = async ()=>{
        if(document.getElementById("d1") )
        {
           await this.setState({ 
                fname: String(document.getElementById("d1").value),
                });
        }
        if(document.getElementById("d2") )
        {
            await this.setState({ 
                lname:String(document.getElementById("d2").value) ,
                });
        }
        if(document.getElementById("d3") )
        {
            await this.setState({ 
                email:String(document.getElementById("d3").value),
                });
        }
        if(document.getElementById("d4")&&document.getElementById("d5"))
        {
            await this.setState({ 
                password:String(document.getElementById("d4").value) ,
                confirmPass:String(document.getElementById("d5").value) ,
                });
        }
        if(document.getElementById("d6") )
        {
            await this.setState({ 
                username:String(document.getElementById("d6").value) ,
                });
        }
        if(document.getElementById("d7") )
        {
            await this.setState({ 
                address: String(document.getElementById("d7").value) ,
                });
                
        }
        if(document.getElementById("d8") )
        {
            await this.setState({ 
                skill:String(document.getElementById("d8").value) ,
                });
               
        }
        if(document.getElementById("d9") )
        {
            await this.setState({ 
                interest: String(document.getElementById("d9").value) ,
                });
        }
        if(document.getElementById("d10") )
        {
            await  this.setState({ 
                masterclass:String(document.getElementById("d10").value) ,
                });
        }
        if(document.getElementById("d11") )
        {
            await this.setState({ 
                certificate: String(document.getElementById("d11").value) ,

                });
        }
       
        
    }

    onSubmit = (e) => {
        e.preventDefault();  
    }
    handleChangeSkill = async()=> {
       
        if(this.state.skill)
        {
           await this.setState({ 
                skills:this.state.skills.concat(this.state.skill) ,
                });
                console.log(this.state.skills)
                document.getElementById("d8").value="";
        }
       
      }
    
      handleChangeInterest = async()=> {
        if(this.state.interest)
        {
            await this.setState({ 
                interests: this.state.interests.concat(this.state.interest),
                });
                console.log(this.state.interests)
                document.getElementById("d9").value="";
        }
      }
      handleChangeMasterclass = async()=> {
       
        if(this.state.masterclass)
        {
           await this.setState({ 
                masterclasses:this.state.masterclasses.concat(this.state.masterclass) ,
                });
                console.log(this.state.masterclasses)
                document.getElementById("d10").value="";
        }
        
      }
      handleChangeCertificate = async()=> {
       
        if(this.state.certificate)
        {
           await this.setState({ 
                certificates:this.state.certificates.concat(this.state.certificate) ,
                });
                console.log(this.state.certificates)
                document.getElementById("d11").value="";
        }
      }
    handletoggle=()=>
    {
        this.setState({cond:"button1"})
    }
    handletoggle1=()=>
    {
        this.setState({cond:"button2"})
    }
    handletoggle2=()=>
    {
        this.setState({cond:"button3"})
    }
    handletoggle3=()=>
    {
        this.setState({cond:"button4"})
    }
    handletoggle4=()=>
    {
        this.setState({cond:"button5"})
    }
   
    signUpMem=async()=>
    {
        try{
        let res = await axios.post('http://localhost:3001/api/profile/create', {
            'userType': 'Member',
            'username': this.state.username+'',
            'password': this.state.password+'',
            'fname': this.state.fname+'',
            'lname': this.state.lname+'',
            'address': this.state.address+'',
            'email': this.state.email+'',
            'skills': this.state.skills,
            'masterclasses': this.state.masterclasses,
            'certificates': this.state.certificates,
            'interests': this.state.interests,
        })
        console.log(res.data)
    }
    catch(err)
    {
        console.log(err)
    }
    if(document.getElementById("d1"))
    {
        document.getElementById("d1").value="";
    }
    if(document.getElementById("d2"))
    {
        document.getElementById("d2").value="";
    }
    if(document.getElementById("d3"))
    {
        document.getElementById("d3").value="";
    }
    if(document.getElementById("d4"))
    {
        document.getElementById("d4").value="";
    }
    if(document.getElementById("d5"))
    {
        document.getElementById("d5").value="";
    }
    if(document.getElementById("d6"))
    {
        document.getElementById("d6").value="";
    }
    if(document.getElementById("d7"))
    {
        document.getElementById("d7").value="";
    }
        
       
    }
    Submit=async()=>
    {
        if(document.getElementById("d4") && document.getElementById("d5"))
       { 
           if(this.state.password != this.state.confirmPass)
            {
                 window.alert("Your confirmed password didn't match.Please re-confirm your password!")
            }
        }

        if(document.getElementById("d3") )
       { 
        if(!this.state.email.match(/.+@.+/) )
        {
            window.alert("Please enter a valid email!")
        }
        }
        
       
       
       
        
    }
    render() {

        let func;
        if(this.state.cond == "button1")
        {
            func =
            <div className="card memprofileCard">
            <div className="card-body">
            <form onSubmit={this.onSubmit}>
            First Name:<br/>
             <input type="text" id="d1" class="mytext" name="fname"  onChange={this.handleChange} /><br/>
             Last Name:<br/>
            <input type="text" id="d2" class="mytext" name="lname"  onChange={this.handleChange} /><br/>
            Email:<br/>
            <input type="text" id="d3" class="mytext" name="email" onChange={this.handleChange} /><br/>
            Password:<br/>
            <input type="text" id="d4" class="mytext" name="password"  onChange={this.handleChange} /><br/>
           Confrim Password:<br/>
            <input type="text" id="d5" class="mytext" name="confirmPass"  onChange={this.handleChange} /><br/>
           Username:<br/>
            <input type="text" id="d6"  class="mytext" name="username"  onChange={this.handleChange} /><br/>
           Address:<br/>
            <input type="text" id="d7" class="mytext" name="address" onChange={this.handleChange} />
            <button onClick = {this.Submit}type="submit" className="btn-primary">SUBMIT</button>
            </form>
            </div>
            </div>
        }
        if(this.state.cond == "button2")
        {
            func = 
            <div className="card memprofileCard">
            <div className="card-body">
            <form onSubmit={this.onSubmit}> 
            <label>
            Skill:<br/>
            <input id = "d8" type="text" class="mytext" name="Skill" onChange= {this.handleChange}/><br/>
            </label>
            <br/>
            <label>
            <button onClick = {this.handleChangeSkill} type="submit"className="btn-primary">ADD SKILL</button><br/>
            </label>
           <br/>
            </form>
            
        </div>
        </div>
        }

        if(this.state.cond == "button3")
        {
            func=
            <div className="card memprofileCard">
            <div className="card-body">
            <form onSubmit={this.onSubmit}> 
            <label>
            Interest:<br/>
            <input id = "d9" type="text" class="mytext" name="Interest" onChange= {this.handleChange}/><br/>
            </label>
            <br/>
            <label>
            <button onClick = {this.handleChangeInterest} type="submit"className=" btn-primary">ADD INTEREST</button><br/>
            </label>
            <br/>
           </form>
        </div>
        </div>
        }
        if(this.state.cond == "button4")
        {
            func = 
            <div className="card memprofileCard">
            <div className="card-body">
            <form onSubmit={this.onSubmit}> 
            <label>
            Masterclass:<br/>
            <input id = "d10" type="text" class="mytext" name="Skill" onChange= {this.handleChange}/><br/>
            </label>
            <br/>
            <label>
            <button onClick = {this.handleChangeMasterclass} type="submit"className=" btn-primary">ADD MASTERCLASS</button><br/>
            </label>
           <br/>
           </form>
            
        </div>
        </div>
        }

        if(this.state.cond == "button5")
        {
            func=
            <div className="card memprofileCard">
            <div className="card-body">
            <form onSubmit={this.onSubmit}> 
            <label>
            Certificate:<br/>
            <input id = "d11" type="text" class="mytext" name="Interest" onChange= {this.handleChange}/><br/>
            </label>
            <br/>
            <label>
            <button onClick = {this.handleChangeCertificate} type="submit"className="btn-primary">ADD CERTIFICATE</button><br/>
            </label>
            <br/>
           </form>
        </div>
        </div>
        }
        return (
            <div className='card-group'>
            <div className = 'container-fluid'>
             <div className = 'row'>
                   
                 <div className="list-group">
          
                 <br/>
                 <br/>
                 <br/>
                 <br/>
               
                 <button onClick = {this.handletoggle}type="submit" className="btn-primary">ADD PERSONAL DETAILS</button>
                 <br/>
                 <button onClick = {this.handletoggle1}type="submit" className="btn-primary">ADD SKILL</button>
                 <br/>
                 <button onClick = {this.handletoggle2}type="submit" className="btn-primary">ADD INTEREST</button>
                 <br/>
                 <button onClick = {this.handletoggle3}type="submit" className="btn-primary">ADD MASTERCLASS</button>
                 <br/>
                 <button onClick = {this.handletoggle4}type="submit" className="btn-primary">ADD CERTIFICATE</button>
           
             </div>
             {func}
             </div>
             <button onClick = {this.signUpMem}type="submit" className="btn-primary">SIGN UP</button>
            </div>
             </div>
             
        )
    }
}
export default CreateMemberForm; 