import React, { Component } from 'react'
import './EventPostNew.css'
import axios from 'axios'

class EventPostNew extends Component {
  constructor(props) {
    super(props);
    /*  
      props should have the user data
    */
    this.state = {
      //put user data here until we get them from props
      userData: {
        _id: '5ca11a709b305d4878a54dfe',
        userType: 'Member',
      },
      loaded: false,
      userHasBooked: false,
      eventData: {}
    }
  }

  async componentDidMount() {
    let event = await axios.get("http://localhost:3001/api/event/Post/5cab5d3222a833137c7acd38");
    console.log(event.data);
    this.setState({
      eventData: event.data,
      loaded: true
    })
    await this.checkIfAlreadyBooked();

  }

  getCommentsSorted() {  // Should sort all comments based on date
    return (this.state.eventData.commentsByAdmin).concat(this.state.eventData.commentsByPartner)
  }

  async checkIfAlreadyBooked() {
    // check if user is found in attendees array
    let booked = false;
    let event = await axios.get("http://localhost:3001/api/event/Post/5cab5d3222a833137c7acd38");
    let attendees = event.data.attendees;
    console.log(attendees)
    for (let i = 0; i < attendees.length; i++) {
      if (attendees[i]._id === this.state.userData._id)
        booked = true;
    }
    if (booked) {
      this.setState({
        userHasBooked: true
      })
    }
  }

  onClickBook = (e) => {
    e.preventDefault();
    //var placesNow = this.state.eventData.remainingPlaces;
    axios.put("http://localhost:3001/api/event/5cab5d3222a833137c7acd38/attending", {
      "userID": this.state.userData._id,
      "userType": this.state.userData.userType
    }).then(this.setState({
      userHasBooked: true,
      //eventData: {remainingPlaces: placesNow - 1}
    }));
  }

  onClickCancel = (e) => {
    e.preventDefault();
    //var placesNow = this.state.eventData.remainingPlaces;
    axios.put("http://localhost:3001/api/event/5cab5d3222a833137c7acd38/notAttending", {
      "userID": this.state.userData._id,
      "userType": this.state.userData.userType
    }).then(this.setState({
      userHasBooked: false,
      //eventData: {remainingPlaces: placesNow - 1}
    }));
  }

  closeEvent() {
    axios.put(`http://localhost:3001/api/event/${this.state.eventData._id}/closeMyEvent`, {
      "userType": this.state.userData.userType,
      "userId": this.state.userData._id
    }).then(res => {
      if (res.data === 'closed') {
        this.setState({
          ...this.state,
          eventData: {
            ...this.state.eventData,
            eventStatus: 'Finished'
          }
        })
      }
    }).catch((err) => {
      console.log(err.response.data);
      this.refs.alert.innerText = err.response.data
      console.log(this.refs.alert);
      this.refs.alert.style.display = 'block'
    })
  }

  reOpenEvent() {
    axios.put(`http://localhost:3001/api/event/${this.state.eventData._id}/reOpenMyEvent`, {
      "userType": this.state.userData.userType,
      "userId": this.state.userData._id
    }).then(res => {
      if (res.data === 'opened') {
        this.setState({
          ...this.state,
          eventData: {
            ...this.state.eventData,
            eventStatus: 'Approved'
          }
        })
      }
    }).catch((err) => {
      this.refs.alert.innerText = err.response.data
      this.refs.alert.style.display = 'block'
    })
  }
  
  render() {
    if (!this.state.loaded) return null;
    return (
      <div>
        <div className="event-post offset-sm-2 col-sm-8 row ">
          <div className="left-of-post col-sm-9">
            <div className="event-post-header">
              <p className="text-muted"><i className="fas fa-calendar-day"></i>  {this.state.eventData.eventDate}</p>
              <h2>{this.state.eventData.name}</h2>
              <p><span className="text-muted">organized by </span>{this.state.eventData.partner?(this.state.eventData.partner.name):("LirtnenHub")}</p>
              <p className="text-muted"><i className="fas fa-map-marker-alt"></i>  {this.state.eventData.location}, {this.state.eventData.city}</p>
            </div>
            <div className="event-post-info">
              <h4>Details</h4>
              <p>{this.state.eventData.description}</p>
              <br />
              <h4>Speakers</h4>
              <div className="row">{this.state.eventData.speakers.map((speaker) => {
                return <div key={speaker} className="col-sm-4"><i> -{speaker}</i></div>
              })}</div>
              <br />
              <h4>Topics</h4>
              <div className="row">{this.state.eventData.topics.map((topic) => {
                return <div key={topic} className="col-sm-4"><p> {topic}</p></div>
              })}</div>
            </div>
            {
              (this.state.eventData.eventStatus === "Submitted")
              &&
              (this.state.userData.userType === "Admin" || this.state.userData.userType === "Partner")
              &&
              <div className="comments-section col-sm-12">
                <h4>Comments</h4>
                {this.getCommentsSorted().map((comment) => {
                  return <div key={comment.date} className='comment'>
                    <p className="font-weight-bold">{comment.author.name}<span className="text-muted float-right font-weight-lighter">{comment.date}</span></p>
                    <p>{comment.text}</p>
                  </div>
                })}

                <br />
                <div className="input-group mb-3">
                  <input type="text" className="form-control" />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button" >Add comment</button>
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="right-of-post col-sm-3">
            <p className="text-center h3">{this.state.eventData.price} EGP</p>
            {this.state.userHasBooked ? (
              <button className="btn btn-danger offset-sm-1 col-sm-10 book-button" disabled={this.state.eventData.remainingPlaces <= 0} onClick={this.onClickCancel}>CANCEL</button>
            ) : (
                <button className="btn btn-outline-success offset-sm-1 col-sm-10 book-button" disabled={this.state.userData.userType !== "Member" || this.state.eventData.remainingPlaces <= 0} onClick={this.onClickBook}>BOOK NOW</button>
              )}
            <p className="text-muted text-center">remaining seats:{this.state.eventData.remainingPlaces}</p>
            {
              (this.state.userData.userType === "Admin")
              &&
              (this.state.eventData.eventStatus === "Submitted")
              &&
              <div><br /><br /><br />
                <button className="btn btn-success ctrl-button col-sm-12 ">Approve Event</button>
              </div>
            }
            {
              (this.state.userData.userType === "Partner")
              &&
              (this.state.eventData.eventStatus === "Submitted")
              &&
              <div><br /><br /><br />
                <button className="btn btn-danger ctrl-button col-sm-12 ">Delete Event</button>
              </div>
            }
            {
              (this.state.userData.userType === "Partner" || this.state.userData.userType === "Admin")
              &&
              (this.state.eventData.eventStatus === "Approved")
              &&
              <div><br /><br /><br />
                <button onClick={this.closeEvent.bind(this)} className="btn btn-warning ctrl-button col-sm-12 ">Close Event</button>
              </div>
            }
            {
              (this.state.userData.userType === "Partner" || this.state.userData.userType === "Admin")
              &&
              (this.state.eventData.eventStatus === "Finished")
              &&
              <div><br /><br /><br />
                <button onClick={this.reOpenEvent.bind(this)} className="btn btn-success ctrl-button col-sm-12 ">Re-Open Event</button>
              </div>
            }
            <div ref="alert" className="alert alert-danger alert-dev" role="alert">This is a primary alert—check it out</div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventPostNew
