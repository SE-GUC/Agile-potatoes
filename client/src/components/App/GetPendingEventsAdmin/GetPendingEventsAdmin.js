import React, { Component } from 'react';
import './GetPendingEventsAdmin.css';
import axios from 'axios';
class GetPendingEventsAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      eventsList: [
        {
          name:"Cairokee",
          description:"warever",
          price:150,
          location:"Cairo",
          speakers:["ahmed","wael"],
          url:"/api/event/5ca92883fb9d331963cecf81"

        },
      ],
    };
    this.GetEvents = this.GetEvents.bind(this);
  }

  GetEvents() {
    axios.get('http://localhost:3001/api/event/PendingEventsAdmin',{usertype:'Admin'})
    .then(response => {
      console.log(response);
      this.setState({eventsList:[...this.state.eventsList,...response.data]})
      })
  }
  
  render() {
    return (
      <div>
        <h1>List Of Pending Events</h1>
        <button onClick = {this.GetEvents}>SHOW EVENTS</button>
        <ul>
        { this.state.eventsList.map(event => <li>{[event.name,"  L.E" +event.price]}</li>)}
       </ul>
      </div>
    )
  }
}

export default GetPendingEventsAdmin;
