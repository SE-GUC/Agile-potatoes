import React, { Component } from 'react'
import './EventsContainer.css'
import EventsDisplayer from './EventsDisplayer/EventsDisplayer'
import axios from 'axios'
import CreateEvent from '../CreateEvent/CreateEvent'
class EventsContainer extends Component {
  state = {
    events: [
      
    ],
    toggle:0,
  }
  componentDidMount = () =>{
    this.getAllEvents();
  }
  getAllEvents = async ()=>{
    try {
      let allEvents = await axios.get(`http://localhost:3001/api/event/ApprovedEvents`);
      this.setState({toggle:this.state.toggle ,events:[...allEvents.data]});
     } catch (error) {
      console.log('GOT ERROR')
    }
  }
  getRecommendedEvents = async ()=>{
    try {
      let tokenData = JSON.parse(localStorage.getItem('token')).data;
      let recommendEventsRes = await axios.get(`http://localhost:3001/api/event/RecommendedEvents`, { headers: { Authorization: 'Bearer '+ tokenData.authData }  });
      this.setState({toggle:this.state.toggle ,events:[...recommendEventsRes.data]});
     } catch (error) {
      console.log('GOT ERROR')
    }
  }
  getPartnerEvents= async()=>{
    try {
      let tokenData = JSON.parse(localStorage.getItem('token')).data;
      let events = await axios.get(`http://localhost:3001/api/event/PartnerEvents`, { headers: { Authorization: 'Bearer '+ tokenData.authData } });
      this.setState({toggle:this.state.toggle ,events:[...events.data]});
     } catch (error) {
      console.log('GOT ERROR '+error)
    }
  }

  getPendingEventsAdmin= async()=> {
    try{
    let tokenData = JSON.parse(localStorage.getItem('token')).data;
    let response = await axios.get('http://localhost:3001/api/event/PendingEventsAdmin', { headers: { Authorization: 'Bearer ' + tokenData.authData}
    })
    this.setState({toggle:this.state.toggle ,events:[...response.data]});
    } catch (error) {
      console.log('GOT ERROR ' + error)
    }
  }

  getMyAttendedEvents= async()=> {
    try{
    let tokenData = JSON.parse(localStorage.getItem('token')).data;
    let response = await axios.get('http://localhost:3001/api/event/myAttendedEvents', { headers: { Authorization: 'Bearer ' + tokenData.authData}
    })
    this.setState({
      events: response.data
    });
    } catch (error) {
      console.log('GOT ERROR while getting my attended events' + error)
    }
  }

  handletoggle=()=>
  {
    this.setState({events:[],toggle:1})
  }
  render() {
    let func;
    if(this.state.toggle === 1)
    {
      func =  <CreateEvent/>
      
    }
    return (
      <div className='container-fluid'>
        <div className='row'>
            <div className='side-bar col-sm-2 ' >
                <div className="list-group">
                  <button type="button" onClick={this.getAllEvents} id="allEvents" className="list-group-item list-group-item-action">All Events</button>
                  {JSON.parse(localStorage.getItem('token')).data.userData.userType === 'Member' 
                    &&
                  <button type="button" onClick={this.getRecommendedEvents} id="recommendedEvents" className="list-group-item list-group-item-action">Recommended Events</button>
                  }
                  {JSON.parse(localStorage.getItem('token')).data.userData.userType === 'Partner' 
                    &&
                  <button type="button" onClick={this.getPartnerEvents} id="partnerEvents" className="list-group-item list-group-item-action">Partner Events</button>
                  }
                  {
                    JSON.parse(localStorage.getItem('token')).data.userData.userType === 'Admin' 
                    &&
                  <button type="button" onClick={this.getPendingEventsAdmin} id="adminEvents" className="list-group-item list-group-item-action">Admin Pending Events</button>
                  }
                  {
                    JSON.parse(localStorage.getItem('token')).data.userData.userType === 'Member' 
                    &&
                  <button type="button" onClick={this.getMyAttendedEvents} id="memberEvents" className="list-group-item list-group-item-action">Your Events</button>
                  }
                  {
                    (JSON.parse(localStorage.getItem('token')).data.userData.userType === 'Partner' || JSON.parse(localStorage.getItem('token')).data.userData.userType === 'Admin')
                    &&
                  <button type="button" onClick={this.handletoggle} id="partnerEvents" className="list-group-item list-group-item-action">Create Event</button>
                  }
                </div>
            </div>
            <div className='events-window col-sm-10'>
              <EventsDisplayer events={this.state.events}/>
              {func}
            </div>
        </div>
      </div>
    )
  }
}

export default EventsContainer
