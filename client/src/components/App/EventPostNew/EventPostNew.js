import React, { Component } from "react";
import "./EventPostNew.css";
import axios from "axios";

class EventPostNew extends Component {
  constructor(props) {
    super(props);
    /*  
      props should have the user data
    */
    this.state = {
      postID: '5cbbbea760006f509880af3b',
      //put user data here until we get them from props
      userData: {
        _id: '5cbbb65c9800133ed8898a09',
        userType: 'Partner'
      },
      loaded: false,
      userHasBooked: false,
      Edit: false,
      eventData: {},
      feedback: '',
      eventEditedData: {
        date: "",
        location: "",
        desc: "",
        price: 0,
        type: "",
        topics: "",
        speakers: "",
        attendees: "",
        remPlaces: ""
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
        eventEditedData: { [e.target.name]: e.target.value }
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
    for (let i = 0; i < attendees.length; i++) {
      if (attendees[i]._id === this.state.userData._id)
        booked = true;
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
    console.log(this.state.eventData.partner._id)
    console.log(this.state.userData._id)
    console.log(this.state.eventData);
  }

  async onClickComment(e) {
    await axios.post(`http://localhost:3001/api/event/${this.state.postID}/comment`, {
      "userID": this.state.userData._id,
      "userType": this.state.userData.userType,
      "comment": this.state.feedback,
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
    await axios.put(`http://localhost:3001/api/event/${this.state.postID}/approve`, {
      "userType": "Admin"
    })
      .then(res =>
        // window.location.reload();
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
      'userType': this.state.userData.userType,
      'userID': this.state.userData._id,
      'eventID': this.state.eventData._id,
      'date': this.state.eventEditedData.date,
      'location': this.state.eventEditedData.location,
      'desc': this.state.eventEditedData.desc,
      'price': this.state.eventEditedData.price,
      'type': this.state.eventEditedData.type,
      'topics': this.state.eventData.topics,
      'speakers': this.state.eventData.speakers,
      'attendees': this.state.eventData.attendees,
      'remPlaces': this.state.eventEditedData.remPlaces
    }).then(res => {
      console.log(res)
      this.setState({
        Edit: false
      });
    })
    window.location.reload();
  }


  onClickBook = (e) => {
    axios.put(`http://localhost:3001/api/event/${this.state.postID}/attending`, {
      "userID": this.state.userData._id,
      "userType": this.state.userData.userType
    }).then(res =>
      this.setState({
        eventData: {
          ...this.state.eventData,
          remainingPlaces: this.state.eventData.remainingPlaces - 1
        },
        userHasBooked: true
      }))
      .catch(err => {
        console.log(err.response.data);
        this.refs.alert.innerText = err.response.data;
        console.log(this.refs.alert);
        this.refs.alert.style.display = "block";
      });
  }

  onClickCancel = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/event/${this.state.postID}/notAttending`, {
      "userID": this.state.userData._id,
      "userType": this.state.userData.userType
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
      "userType": this.state.userData.userType,
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
      .put(
        `http://localhost:3001/api/event/${
        this.state.postID
        }/closeMyEvent`,
        {
          "userType": this.state.userData.userType,
          "userId": this.state.userData._id
        }
      )
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
      .put(
        `http://localhost:3001/api/event/${
        this.state.postID
        }/reOpenMyEvent`,
        {
          "userType": this.state.userData.userType,
          "userId": this.state.userData._id
        }
      )
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
      data: {
        "userType": this.state.userData.userType,
        "userID": this.state.userData._id
      }
    })
      .catch(err => {
        this.refs.alert.innerText = err.response.data;
        this.refs.alert.style.display = "block";
      });
    //need to rereoute to home page somehow now
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
            <span className="text-muted" > Description </span>
            <input type="text-area" className="form-control" name="desc" onChange={this.handleChange} defaultValue={this.state.eventData.description + ""} />
            <span className="text-muted" > Price </span>
            <input type="text" className="form-control" name="price" onChange={this.handleChange} defaultValue={this.state.eventData.price + ""} />
            <span className="text-muted" > Type </span>
            <input type="text" className="form-control" name="type" onChange={this.handleChange} defaultValue={this.state.eventData.eventType + ""} />
            <span className="text-muted" > Remaining Places </span>
            <input type="text" className="form-control" name="remPlaces" onChange={this.handleChange} defaultValue={this.state.eventData.remainingPlaces + ""} />
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
                  {this.state.eventData.speakers.map(speaker => {
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
                  {this.state.eventData.topics.map(topic => {
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
                (this.state.userData.userType === "Admin" || this.state.userData.userType === "Partner")
                &&
                <div className="comments-section col-sm-12">
                  <h4>Comments</h4>
                  <CommentsSection userID={this.state.userData._id} userType={this.state.userData.userType} allComments={this.getCommentsSorted()} />
                  {/* {this.getCommentsSorted().map(comment => {
                    return (
                      <div key={comment.date} className="comment">
                        <p className="font-weight-bold">
                          {comment.author.name}
                          <span className="text-muted float-right font-weight-lighter">
                            {comment.date}
                          </span>
                        </p>
                        <p>{comment.text}</p>
                      </div>
                    );
                  })} */}

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
                (this.state.eventData.attendees.some(attendee => attendee._id === this.state.userData._id))
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
                    <button className="btn btn-outline-success offset-sm-1 col-sm-10 book-button" disabled={this.state.userData.userType !== "Member" || this.state.eventData.remainingPlaces <= 0 || this.state.eventData.eventStatus !== 'Approved'} onClick={this.onClickBook} >BOOK NOW</button>
                  )
              }
              <p className="text-muted text-center">remaining seats: {this.state.eventData.remainingPlaces} </p>

              {
                (this.state.userData.userType === "Admin")
                &&
                (this.state.eventData.eventStatus === "Submitted")
                &&
                <div>
                  <br /><br /><br />
                  <button className="btn btn-success ctrl-button col-sm-12 " onClick={() => this.onClickApprove()}>Approve</button>
                </div>
              }
              {
                (this.state.userData.userType === "Partner")
                &&
                (this.state.eventData.eventStatus === "Submitted")
                &&
                (this.state.userData._id === this.state.eventData.partner._id)
                &&
                <div>
                  <br /><br /><br />
                  <button className="btn btn-success ctrl-button col-sm-12 " onClick={() => this.setState({ Edit: true })}>Edit</button>
                </div>
              }
              {
                (this.state.userData.userType === "Partner")
                &&
                (this.state.eventData.eventStatus === "Submitted")
                &&
                (this.state.userData._id === this.state.eventData.partner._id)
                &&
                <div>
                  <br /><br /><br />
                  <button className="btn btn-danger ctrl-button col-sm-12 " onClick={this.onClickDelete}>Delete Event</button>
                </div>
              }
              {
                (this.state.userData.userType === "Partner" || this.state.userData.userType === "Admin")
                &&
                (this.state.eventData.eventStatus === "Approved")
                &&
                <div>
                  <br /><br /><br />
                  <button onClick={this.closeEvent.bind(this)} className="btn btn-warning ctrl-button col-sm-12 ">Close Event</button>
                </div>
              }
              {
                (this.state.userData.userType === "Partner" || this.state.userData.userType === "Admin")
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
        <p className="font-weight-bold">{comment.author === props.userID ? ('You') : ((props.userType === 'Admin') ? 'Partner' : 'Lirten Hub')}<span className="text-muted float-right font-weight-lighter">{comment.date}</span></p>
        <p>{comment.text}</p>
      </div>
    })
  )
}

export default EventPostNew;
