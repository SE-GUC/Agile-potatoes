import React, { Component } from 'react'
import './EventPostNew.css'
export class EventPostNew extends Component {
  constructor(props){
    super(props);
    /*  
      props should have the user data
    */ 
    this.state= {
      //put user data here until we get them from props
      userData:{
        _id:123,
        userType:'Partner',
      },

      userHasBooked:false,



      eventData : {
        name: 'DEF CON 2077',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry 's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: 370,
        city:'Cairo',
        location: '23 El-Nahhas St',
        eventDate: new Date().toLocaleDateString(),
        eventStatus: 'Submitted',
        remainingPlaces: 24,
        eventType:'conference',
        speakers: ['bill','bob','john'],
        topics:['Security','Networking','Malware'],
        partner:{name: 'Seekurity'},  // should be id, and from the id we get the name
        commentsByAdmin: [{
          text:'Hello partner',
          date: new Date().toLocaleString(),
          author:{name:'Lirtenhub'}
        }],
        commentsByPartner: [{
          text: 'Hello Admin',
          date: new Date().toLocaleString(),
          author: {name: 'Seekurity'}
        }]
      }
    }
  }

  async componentDidMount(){
    // await get event post and put it in state
    let booked = await this.checkIfAlreadyBooked();
    if(booked){
      this.setState({
        userHasBooked:true
      })
    }
  }

  getCommentsSorted(){  // Should sort all comments based on date
    return (this.state.eventData.commentsByAdmin).concat(this.state.eventData.commentsByPartner)
  }

  async checkIfAlreadyBooked(){
      // check if user is found in attendees array
      let booked = false;
      return booked;
  }
  render() {
    return (
      <div>
          <div className="event-post offset-sm-2 col-sm-8 row ">
            <div className="left-of-post col-sm-9">
              <div className="event-post-header">
                <p className="text-muted"><i class="fas fa-calendar-day"></i>  {this.state.eventData.eventDate}</p>
                <h2>{this.state.eventData.name}</h2>
                <p><span className="text-muted">organized by </span>{this.state.eventData.partner.name}</p>
                <p className="text-muted"><i class="fas fa-map-marker-alt"></i>  {this.state.eventData.location}, {this.state.eventData.city}</p>
              </div>
              <div className="event-post-info">
                <h4>Details</h4>
                <p>{this.state.eventData.description}</p>
                <br/>
                <h4>Speakers</h4>
                <div className="row">{this.state.eventData.speakers.map((speaker)=>{
                  return <div className="col-sm-4"><i> -{speaker}</i></div>
                })}</div>
                <br/>
                <h4>Topics</h4>
                <div className="row">{this.state.eventData.topics.map((speaker)=>{
                  return <div className="col-sm-4"><p> {speaker}</p></div>
                })}</div>  
              </div>
              {
                (this.state.eventData.eventStatus === "Submitted") 
                && 
                (this.state.userData.userType === "Admin" || this.state.userData.userType === "Partner")
                &&
                <div className="comments-section col-sm-12">
                  <h4>Comments</h4>
                  {this.getCommentsSorted().map((comment)=>{
                    return <div className='comment'>
                      <p className="font-weight-bold">{comment.author.name}<span className="text-muted float-right font-weight-lighter">{comment.date}</span></p>
                      <p>{comment.text}</p>
                    </div>
                  })}
                  
                  <br/>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control"/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button" >Add comment</button>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className="right-of-post col-sm-3">
              <p className="text-center h3">{this.state.eventData.price} EGP</p>
              {this.state.userHasBooked?(
                <button class="btn btn-danger offset-sm-1 col-sm-10 book-button" disabled={this.state.eventData.remainingPlaces<=0} >Cancel</button>
              ):(
                <button class="btn btn-outline-success offset-sm-1 col-sm-10 book-button" disabled={this.state.userData.userType!=="Member"||this.state.eventData.remainingPlaces<=0} >BOOK NOW</button>
              )}
              <p className="text-muted text-center">remaining seats:{this.state.eventData.remainingPlaces}</p>
              {
                (this.state.userData.userType === "Admin")
                &&
                (this.state.eventData.eventStatus === "Submitted")
                &&
                <div><br/><br/><br/>
                  <button class="btn btn-success ctrl-button col-sm-12 ">Approve Event</button>
                </div>
              }
              {
                (this.state.userData.userType === "Partner")
                &&
                (this.state.eventData.eventStatus === "Submitted")
                &&
                <div><br/><br/><br/>
                  <button class="btn btn-danger ctrl-button col-sm-12 ">Delete Event</button>
                </div>
              }
              {
                (this.state.userData.userType === "Partner")
                &&
                (this.state.eventData.eventStatus === "Approved")
                &&
                <div><br/><br/><br/>
                  <button class="btn btn-warning ctrl-button col-sm-12 ">Close Event</button>
                </div>
              }
              {
                (this.state.userData.userType === "Partner")
                &&
                (this.state.eventData.eventStatus === "Finished")
                &&
                <div><br/><br/><br/>
                  <button class="btn btn-success ctrl-button col-sm-12 ">Re-Open Event</button>
                </div>
              }
            </div>  
          </div>
      </div>
    )
  }
}

export default EventPostNew
