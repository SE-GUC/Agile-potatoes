import React, { Component } from "react";
import "./EventPost.css";
import axios from "axios";

class EventPost extends Component {
  constructor(props) {
    super(props);
    this.userData = JSON.parse(localStorage.getItem('token')).data.userData;
    this.authData = JSON.parse(localStorage.getItem('token')).data.authData;
    this.state = {
      postID: this.props.match.params.id,
      loaded: false,
      userHasBooked: false,
      Edit: false,
      eventData: {},
      feedback: '',

      eventEditedData: {
        date: "",
        location: "",
        description: "",
        price: 0,
        eventType: "",
        topics: "",
        speakers: "",
        remainingPlaces: "",
        city: ""
      }
    };
  }

  handleChange = (e) => {
    if (e.target.name === 'feedback')
      this.setState({
        feedback: e.target.value
      })
    else
      this.setState({
        eventEditedData: {
          ...this.state.eventEditedData,
          [e.target.name]: e.target.value
        }
      });
  }

  async componentDidMount() {
    await axios.get(`http://localhost:3001/api/event/Post/${this.state.postID}`)
      .then(res => {
        this.setState({
          eventData: res.data
        })
      })
      .catch(err => {
        console.log(err.response.data);
        this.refs.alert.innerText = err.response.data;
        console.log(this.refs.alert);
        this.refs.alert.style.display = "block";
      });

    await this.checkIfAlreadyBooked();
  }

  getCommentsSorted() {  // Should sort all comments based on date
    var allComments = (this.state.eventData.commentsByAdmin).concat(this.state.eventData.commentsByPartner)
    return allComments.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.date) - new Date(b.date);
    });
  }

  async checkIfAlreadyBooked() {
    // check if user is found in attendees array
    let booked = false;
    let attendees = this.state.eventData.attendees;
    if (attendees) {
      for (let i = 0; i < attendees.length; i++) {
        if (attendees[i]._id === this.userData.userId)
          booked = true;
      }
    }
    if (booked)
      this.setState({
        userHasBooked: true,
        loaded: true
      });
    else
      this.setState({
        loaded: true
      });
  }

  async onClickComment(e) {
    await axios.post(`http://localhost:3001/api/event/${this.state.postID}/comment`, {
      "userID": this.userData.userId,
      "userType": this.userData.userType,
      "comment": this.state.feedback,
    }, {
        headers: {
          Authorization: 'Bearer ' + this.authData
        }
      });
    //hopefully getting the updated event with the new comments
    await axios.get(`http://localhost:3001/api/event/Post/${this.state.postID}`)
      .then(updatedEvent => {
        console.log(updatedEvent);
        this.setState({
          eventData: {
            ...this.state.eventData,
            commentsByAdmin: updatedEvent.data.commentsByAdmin,
            commentsByPartner: updatedEvent.data.commentsByPartner
          }
        })
      })
      .catch(err => {
        console.log(err.response.data);
        this.refs.alert.innerText = err.response.data;
        console.log(this.refs.alert);
        this.refs.alert.style.display = "block";
      });
  }

  async onClickApprove() {
    await axios.put(`http://localhost:3001/api/event/${this.state.postID}/approve`, {}, {
      headers: {
        Authorization: 'Bearer ' + this.authData
      }
    })
      .then(res =>
        this.setState({
          eventData: {
            ...this.state.eventData,
            eventStatus: 'Approved'
          }
        }))
      .catch(err => {
        console.log(err.response.data);
        this.refs.alert.innerText = err.response.data;
        console.log(this.refs.alert);
        this.refs.alert.style.display = "block";
      });
  }

  async onClickSubmit() {
    await axios.put(`http://localhost:3001/api/event/${this.state.postID}`, {
      'userType': this.userData.userType,
      'userID': this.userData.userId,
      'date': this.state.eventEditedData.date,
      'location': this.state.eventEditedData.location,
      'description': this.state.eventEditedData.description,
      'price': this.state.eventEditedData.price,
      'eventType': this.state.eventEditedData.eventType,
      'topics': this.state.eventData.topics,
      'speakers': this.state.eventData.speakers,
      'remainingPlaces': this.state.eventEditedData.remainingPlaces,
      'city': this.state.eventEditedData.city
    }, {
        headers: {
          Authorization: 'Bearer ' + this.authData
        }
      }).then(res => {
        console.log(res)
        this.setState({
          Edit: false
        });
      })
    window.location.reload();
  }


  onClickBook = (e) => {
    console.log('hi')
    axios.put(`http://localhost:3001/api/event/${this.state.postID}/attending`, {}, {
      headers: {
        Authorization: 'Bearer ' + this.authData
      }
    }).then(res =>
      this.setState({
        eventData: {
          ...this.state.eventData,
          remainingPlaces: this.state.eventData.remainingPlaces - 1
        },
        userHasBooked: true
      }))
      .catch(err => {
        if (err.response) {
          this.refs.alert.innerText = err.response.data;
          console.log(this.refs.alert);
          this.refs.alert.style.display = "block";
        }
      });
  }

  onClickCancel = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/event/${this.state.postID}/notAttending`, {}, {
      headers: {
        Authorization: 'Bearer ' + this.authData
      }
    }).then(res =>
      this.setState({
        eventData: {
          ...this.state.eventData,
          remainingPlaces: this.state.eventData.remainingPlaces + 1
        },
        userHasBooked: false,
      }));
  }

  submitFeedbackEvent = (e) => {
    axios.put(`http://localhost:3001/api/event/${this.state.postID}/feedback`, {
      "userType": this.userData.userType,
      "feedback": this.state.feedback
    })
      .then(this.setState({
        feedback: ''
      }))
      .catch(err => {
        console.log(err.response.data);
        this.refs.alert.innerText = err.response.data;
        console.log(this.refs.alert);
        this.refs.alert.style.display = "block";
      })
  }

  closeEvent() {
    axios
      .put(`http://localhost:3001/api/event/${this.state.postID}/closeMyEvent`, {}, { headers: { Authorization: 'Bearer ' + this.authData } })
      .then(res => {
        if (res.data === "closed") {
          this.setState({
            ...this.state,
            eventData: {
              ...this.state.eventData,
              eventStatus: "Finished"
            }
          });
        }
        this.refs.alert.style.display = "none";
      })
      .catch(err => {
        console.log(err.response.data);
        this.refs.alert.innerText = err.response.data;
        console.log(this.refs.alert);
        this.refs.alert.style.display = "block";
      });
  }

  reOpenEvent() {
    axios
      .put(`http://localhost:3001/api/event/${this.state.postID}/reOpenMyEvent`, {}, { headers: { Authorization: 'Bearer ' + this.authData } })
      .then(res => {
        if (res.data === "opened") {
          this.setState({
            ...this.state,
            eventData: {
              ...this.state.eventData,
              eventStatus: "Approved"
            }
          });
        }
        this.refs.alert.style.display = "none";
      })
      .catch(err => {
        this.refs.alert.innerText = err.response.data;
        this.refs.alert.style.display = "block";
      });
  }

  onClickDelete = (e) => {
    //delete has to be called this way because axios does not support body with delete requests
    axios({
      method: 'DELETE',
      url: `http://localhost:3001/api/event/${this.state.postID}/deleteEvent`,
      headers: { Authorization: 'Bearer ' + this.authData }
    }).then(() => {
      this.props.history.push('/events');
    })
      .catch(err => {
        this.refs.alert.innerText = err.response.data;
        this.refs.alert.style.display = "block";
      });
  }

  render() {
    if (!this.state.loaded) return null;
    if (this.state.Edit)
      return (
        <div className="event-post offset-sm-2 col-sm-8 row ">
          <div className="left-of-post col-sm-9">
            <span className="text-muted" > Date </span>
            <input type="text" className="form-control" name="date" onChange={this.handleChange} defaultValue={this.state.eventData.eventDate + ""} />
            <span className="text-muted" > Location </span>
            <input type="text" className="form-control" name="location" onChange={this.handleChange} defaultValue={this.state.eventData.location + ""} />
            <span className="text-muted" > City </span>
            <input type="text" className="form-control" name="city" onChange={this.handleChange} defaultValue={this.state.eventData.city + ""} />
            <span className="text-muted" > Description </span>
            <input type="text-area" className="form-control" name="description" onChange={this.handleChange} defaultValue={this.state.eventData.description + ""} />
            <span className="text-muted" > Price </span>
            <input type="text" className="form-control" name="price" onChange={this.handleChange} defaultValue={this.state.eventData.price + ""} />
            <span className="text-muted" > Type </span>
            <input type="text" className="form-control" name="eventType" onChange={this.handleChange} defaultValue={this.state.eventData.eventType + ""} />
            <span className="text-muted" > Remaining Places </span>
            <input type="text" className="form-control" name="remainingPlaces" onChange={this.handleChange} defaultValue={this.state.eventData.remainingPlaces + ""} />
            <br></br>
            <button className="btn btn-success ctrl-button col-sm-12 " onClick={() => this.onClickSubmit()}> Done! </button>
          </div>
        </div>
      );
    else
      return (
        <div>
          <div className="event-post offset-sm-2 col-sm-8 row ">
            <div className="left-of-post col-sm-9">
              <div className="event-post-header">
                <p className="text-muted">
                  <i className="fas fa-calendar-day" />{" "}
                  {this.state.eventData.eventDate}
                </p>
                <h2>{this.state.eventData.name}</h2>
                <p><span className="text-muted">organized by </span>{this.state.eventData.partner ? (this.state.eventData.partner.name) : ("LirtnenHub")}</p>
                <p className="text-muted"><i className="fas fa-map-marker-alt"></i>  {this.state.eventData.location}, {this.state.eventData.city}</p>
              </div>
              <div className="event-post-info">
                <h4>Details</h4>
                <p>{this.state.eventData.description}</p>
                <br />
                <h4>Speakers</h4>
                <div className="row">
                  {this.state.eventData.speakers &&
                    this.state.eventData.speakers.map(speaker => {
                      return (
                        <div key={speaker} className="col-sm-4">
                          <i> -{speaker}</i>
                        </div>
                      );
                    })}
                </div>
                <br />
                <h4>Topics</h4>
                <div className="row">
                  {this.state.eventData.topics &&
                    this.state.eventData.topics.map(topic => {
                      return (
                        <div key={topic} className="col-sm-4">
                          <p> {topic}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              {
                (this.state.eventData.eventStatus === "Submitted")
                &&
                (this.userData.userType === "Admin" || this.userData.userType === "Partner")
                &&
                <div className="comments-section col-sm-12">
                  <h4>Comments</h4>
                  <CommentsSection partnerName={this.state.eventData.partner.name} userID={this.userData.userId} userType={this.userData.userType} allComments={this.getCommentsSorted()} />
                  <br />
                  <div className="input-group mb-3">
                    <input type="text" name="feedback" className="form-control" onChange={this.handleChange} />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button" onClick={this.onClickComment.bind(this)}>Add comment</button>
                    </div>
                  </div>
                </div>
              }

              {
                (this.state.eventData.attendees.some(attendee => attendee._id === this.userData.userId))
                &&
                (this.state.eventData.eventStatus === 'Finished')
                &&
                <div className="input-group mb-3">
                  <span className="text-muted"> Submit your feedback on this Event</span>
                  <input type="text" className="form-control" name="feedback" onChange={this.handleChange} />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={this.submitFeedbackEvent}>Submit Feedback</button>
                  </div>
                </div>
              }
            </div>

            <div className="right-of-post col-sm-3">
              <p className="text-center h3">{this.state.eventData.price} EGP</p>
              {
                this.state.userHasBooked ? (
                  <button className="btn btn-danger offset-sm-1 col-sm-10 book-button" disabled={this.state.eventData.remainingPlaces <= 0 || this.state.eventData.eventStatus !== 'Approved'} onClick={this.onClickCancel} >CANCEL</button>
                ) : (
                    <button className="btn btn-outline-success offset-sm-1 col-sm-10 book-button" disabled={this.userData.userType !== "Member" || this.state.eventData.remainingPlaces <= 0 || this.state.eventData.eventStatus !== 'Approved'} onClick={this.onClickBook} >BOOK</button>
                  )
              }
              <p className="text-muted text-center">remaining seats: {this.state.eventData.remainingPlaces} </p>

              {
                (this.userData.userType === "Admin")
                &&
                (this.state.eventData.eventStatus === "Submitted")
                &&
                <div>
                  <br /><br /><br />
                  <button className="btn btn-success ctrl-button col-sm-12 " onClick={() => this.onClickApprove()}>Approve</button>
                </div>
              }
              {
                (this.userData.userType === "Partner")
                &&
                (this.state.eventData.eventStatus === "Submitted")
                &&
                (this.userData.userId === this.state.eventData.partner._id)
                &&
                <div>
                  <br /><br /><br />
                  <button className="btn btn-success ctrl-button col-sm-12 " onClick={() => this.setState({ Edit: true })}>Edit</button>
                </div>
              }
              {
                (this.userData.userType === "Partner")
                &&
                (this.state.eventData.eventStatus === "Submitted")
                &&
                (this.userData.userId === this.state.eventData.partner._id)
                &&
                <div>
                  <br />
                  <button className="btn btn-danger ctrl-button col-sm-12 " onClick={this.onClickDelete}>Delete Event</button>
                </div>
              }
              {
                (this.userData.userType === "Partner" || this.userData.userType === "Admin")
                &&
                (this.userData.userId === this.state.eventData.partner._id)
                &&
                (this.state.eventData.eventStatus === "Approved")
                &&
                <div>
                  <br /><br /><br />
                  <button onClick={this.closeEvent.bind(this)} className="btn btn-warning ctrl-button col-sm-12 ">Close Event</button>
                </div>
              }
              {
                (this.userData.userType === "Partner" || this.userData.userType === "Admin")
                &&
                (this.userData.userId === this.state.eventData.partner._id)
                &&
                (this.state.eventData.eventStatus === "Finished")
                &&
                <div>
                  <br /><br /><br />
                  <button onClick={this.reOpenEvent.bind(this)} className="btn btn-success ctrl-button col-sm-12 ">Re-Open Event</button>
                </div>
              }
              <div ref="alert" className="alert alert-danger alert-dev" role="alert" > This is a primary alert—check it out </div>
            </div>
          </div>
        </div>
      );
  }
}

function CommentsSection(props) {
  return (
    props.allComments.map((comment) => {
      return <div className='comment'>
        <p className="font-weight-bold">{comment.author === props.userID ? ('You') : ((props.userType === 'Admin') ? props.partnerName : 'Lirten Hub')}<span className="text-muted float-right font-weight-lighter">{comment.date}</span></p>
        <p>{comment.text}</p>
      </div>
    })
  )
}

export default EventPost;
