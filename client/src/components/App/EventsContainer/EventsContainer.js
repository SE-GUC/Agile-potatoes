import React, { Component } from 'react'
import './EventsContainer.css'
import EventsDisplayer from './EventsDisplayer/EventsDisplayer'
import axios from 'axios'
class EventsContainer extends Component {
  state = {
    events: [
      {
        _id:134812,
        name: "lonely devs meetup",
        location: "wara el D",
        eventDate: Date.now(),
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
      },
      {
        _id:168241,
        name: "junky testers meetup",
        location: "3am Sa3d",
        eventDate: Date.now(),
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      }
    ]
  }
  getRecommendedEvents = async ()=>{
    try {
      let recommendEventsRes = await axios.get(`http://localhost:3001/api/event/RecommendedEvents`, { 'headers': { 'userId': '5c7716a51fef5d1538552b2a' } });
      this.setState({events:[...this.state.events,...recommendEventsRes.data]})
      console.log(this.state.events)
     } catch (error) {
      console.log('GOT ERROR')
    }
  }
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
            <div className='side-bar col-sm-2 ' >
                <div className="list-group">
                  <button type="button" id="allEvents" className="list-group-item list-group-item-action">All Events</button>
                  <button type="button" onClick={this.getRecommendedEvents} id="recommendedEvents" className="list-group-item list-group-item-action">Recommended Events</button>
                </div>
            </div>
            <div className='events-window col-sm-10'>
              <EventsDisplayer events={this.state.events}/>
            </div>
        </div>
      </div>
    )
  }
}

export default EventsContainer
