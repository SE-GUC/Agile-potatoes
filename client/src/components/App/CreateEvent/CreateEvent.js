import React, { Component } from 'react';
import './CreateEvent.css';
import axios from 'axios';
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userType:undefined,
        description :undefined,
        name :undefined,
        price : undefined,
        location :undefined,
        city :undefined,
        eventDate :undefined,
        places :undefined,
        eventType :undefined,
        speakers :undefined,
        topics:undefined,
       
      }
   
  }
  

  handleChange = change => {
    this.setState({
         userType: String(document.getElementById("a1").value),
         description :String(document.getElementById("a2").value),
         name: String(document.getElementById("a3").value) ,
         price : Number(document.getElementById("a4").value) ,
         location :String(document.getElementById("a5").value) ,
         city :String(document.getElementById("a6").value),
         eventDate :Date(document.getElementById("a7").value) ,
         places :Number(document.getElementById("a8").value) ,
         eventType :String(document.getElementById("a9").value),
         speakers :String(document.getElementById("a10").value) ,
         topics:String(document.getElementById("a11").value) ,
        });
  }

  handleSubmit = event => {
    event.preventDefault();

  }
  
  create = async ()=>
    {
        try{
            
          let response =   await axios.post(`http://localhost:3001/api/event/5cb06d10dcd7922b68b5d5b3/CreateEvent`, {
                    'userType':this.state.userType+'', 
                    'description' :this.state.description+'',
                    'name': this.state.name+'',
                    'price' : this.state.price,
                    'location' :this.state.location+'',
                    'city' :this.state.city+'',
                    'eventDate' :this.state.eventDate+'',
                    'places' :this.state.places,
                    'eventType' :this.state.eventType+'',
                    'speakers' :this.state.speakers+'',
                    'topics':this.state.topics+'',
                    
                })
                console.log(response)
}
        catch(err)
        {
            console.log(err)
        }
     
  }

  render() {
let func;
    
    return (
      
            <div className = 'container-fluid'>
                
         
       <form onSubmit= {this.handleSubmit}>
 
         
        </form>
       
       
       <div className="card event1Card">
          <div className="card-body">
      <form onSubmit={this.handleSubmit}>
      <label>
        UserType:
        <input id = "a1" type="text" name="usertype" onChange={this.handleChange} /><br/>
        Event Description:
        <input id = "a2" type="text" name="descriprion" onChange={this.handleChange} /><br/>
        Event Name:
        <input id = "a3" type="text" name="name" onChange={this.handleChange} /><br/>
        Event Price:
        <input id = "a4" type="number" name="price" onChange={this.handleChange} /><br/>
        Event Location:
        <input id = "a5" type="text" name="location" onChange={this.handleChange} /><br/>
        Event City:
        <input id = "a6" type="text" name="city" onChange={this.handleChange} /><br/>
        Event Date:
        <input id = "a7" type="date" name="date" onChange={this.handleChange} /><br/>
        Event Capacity:
        <input id = "a8" type="number" name="capacity" onChange={this.handleChange} /><br/>
        Event Type:
        <input id = "a9" type="text" name="type" onChange={this.handleChange} /><br/>
        Event Speakers:
        <input id = "a10" type="text" name="speakers" onChange={this.handleChange} /><br/>
        Event Topics:
        <input id = "a11" type="text" name="topics" onChange={this.handleChange} />
        <button onClick = {this.create}  className="btn btn-primary">CREATE EVENT</button>
      </label>
      </form>
      </div>
        </div>
       </div>
        
    )
  }
}

export default CreateEvent;
