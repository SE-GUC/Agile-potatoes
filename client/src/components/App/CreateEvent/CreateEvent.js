import React, { Component } from 'react';
import './CreateEvent.css';
import axios from 'axios';
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        description :"",
        name :"",
        price : 0,
        location :"",
        city :"",
        eventDate :"",
        places :0,
        eventType :"",
        speaker :"",
        topic:"",
        speakers :[],
        topics:[],
       
      }
   
  }
  

  handleChange = change => {
    this.setState({
         description :String(document.getElementById("a2").value),
         name: String(document.getElementById("a3").value) ,
         price : Number(document.getElementById("a4").value) ,
         location :String(document.getElementById("a5").value) ,
         city :String(document.getElementById("a6").value),
         eventDate :Date(document.getElementById("a7").value) ,
         places :Number(document.getElementById("a8").value) ,
         eventType :String(document.getElementById("a9").value),
         speaker:String(document.getElementById("a10").value) ,
         topic:String(document.getElementById("a11").value) ,
        });
  }

  handleSubmit = event => {
    event.preventDefault();

  }
  
  create = async ()=>
    {
      await this.setState({
       
        speaker: this.state.speakers.concat(this.state.speaker),
        topic:this.state.topics.concat(this.state.topic) ,
       });
        try{
          let tokenData = JSON.parse(localStorage.getItem('token')).data;
          let profId = tokenData.userData.userId;
          let response =   await axios.post(`http://localhost:3001/api/event/${profId}/CreateEvent`, {
                   'description' :this.state.description+'',
                    'name': this.state.name+'',
                    'price' : this.state.price,
                    'location' :this.state.location+'',
                    'city' :this.state.city+'',
                    'eventDate' :this.state.eventDate+'',
                    'remainingPlaces' :this.state.places,
                    'eventType' :this.state.eventType+'',
                    'speakers' :this.state.speakers,
                    'topics':this.state.topics,
                    
                },{ headers: { Authorization: 'Bearer ' + tokenData.authData }})
                document.getElementById("a2").value = null;
                document.getElementById("a3").value = null;
                document.getElementById("a4").value = null;
                document.getElementById("a5").value = null;
                document.getElementById("a6").value = null;
                document.getElementById("a7").value = null;
                document.getElementById("a8").value = null;
                document.getElementById("a9").value = null;
                document.getElementById("a10").value = null;
                document.getElementById("a11").value = null;
                window.alert(response.data)
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
