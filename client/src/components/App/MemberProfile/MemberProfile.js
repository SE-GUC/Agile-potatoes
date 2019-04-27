import React, { Component } from "react";
import axios from "axios";
import Edit from "./Edit/Edit";
import SkyLight from "react-skylight";
import "./MemberProfile.css";
class MemberProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {
        availability: true,
        skills: [],
        masterClasses: [],
        certificates: [],
        membershipState: "",
        interests: [],
        events: [],
        projects: [],
        tasks: [],
        vacancies: [],
        username: "",
        password: "",
        email: "",
        fname: "",
        lname: "",
        address: "",
        notifications: [],
        reviews: [{
          text: 'asasasas',
          date: new Date()-1
        }, {
          text: 'asasasas',
          date: new Date()
        }, {
          text: 'asasasas',
          date: new Date()+1
        }, {
          text: 'asasasas',
          date: new Date()+2
        }, {
          text: 'asasasas',
          date: new Date()+3
        }, {
          text: 'asasasas',
          date: new Date()+4
        }],
      },
      toggle: 0,
      showFeedback: false
    };
  }
  handleChangeEdit = () => {
    this.setState({ toggle: 1 ,userProfile:this.state.userProfile});
  };
  handleChangeProf = () => {
    this.setState({ toggle: 0 ,userProfile:this.state.userProfile});
  };
  componentDidMount = async () => {
    
    try {
      let tokenData = JSON.parse(localStorage.getItem('token')).data;
      let profile = await axios.get(
        `http://localhost:3001/api/profile/${tokenData.userData.userId}`,
        { headers: { Authorization: 'Bearer '+ tokenData.authData } }
      );
      console.log(profile);
      this.setState({
        userProfile: {
          availability: profile.data.availability,
          skills: profile.data.skills,
          masterClasses: profile.data.masterClasses,
          certificates: profile.data.certificates,
          membershipState: profile.data.membershipState,
          interests: profile.data.interests,
          events: profile.data.events,
          projects: profile.data.projects,
          tasks: profile.data.tasks,
          vacancies: profile.data.vacancies,
          username: profile.data.username,
          password: profile.data.password,
          email: profile.data.email,
          fname: profile.data.fname,
          lname: profile.data.lname,
          address: profile.data.address,
          notifications: profile.data.notifications,
          reviews: profile.data.reviews
        },
        toggle:this.state.toggle
      });
    } catch (err) {
      console.log("GOT ERROR" + err);
    }
  };

  render() {
    return (
      this.state.toggle == 0 ? 
      (<div className="row push-down">
        <div className=" offset-sm-2 col-sm-6 profPanel">
          <div className="attrContainer"><p>First name: {this.state.userProfile.fname} </p></div>
          <div className="attrContainer"><p>Last name: {this.state.userProfile.lname}</p></div>
          <div className="attrContainer"><p>Email: {this.state.userProfile.email} </p></div>
          <div className="attrContainer"><p>Address: {this.state.userProfile.address}</p></div>
          <div className="attrContainer"><p>Membership State: {this.state.userProfile.membershipState}</p></div>
          <div className="attrContainer"><p>Availability: {this.state.userProfile.availability}</p></div>
          <div className="attrContainer"><p>Skills: {this.state.userProfile.skills}</p></div>
          <div className="attrContainer"><p>Master classes: {this.state.userProfile.masterClasses}</p></div>
          <div className="attrContainer"><p>Certificates: {this.state.userProfile.certificates}</p></div>
          <div className="attrContainer"><p>Interests: {this.state.userProfile.interests}</p></div>
          <div className="attrContainer"><p>Events: {this.state.userProfile.events}</p></div>
          <div className="attrContainer"><p>Vacancies: {this.state.userProfile.vacancies}</p></div>
        </div>

        <div className="col-sm-2 profOptions " >
          <div className="btn btn-primary" onClick={this.handleChangeEdit} >Edit</div>
          <br/><br/>
          <div className="btn btn-danger" onClick={() => this.simpleDialog.show()} >Show Feedback</div>
        </div>
      
        
        
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.simpleDialog = ref)}
          title="Feedbacks"
        >
        <div className='toto'>
          {this.state.userProfile.reviews.map(review => {
            return (
              <div key={review.date} className="eventCardy">
                <div className="card-body">
                  <h5 className="card-title">{review.text}</h5>
                  <span className="card-text"><small className="text-muted">{new Date(review.date).toLocaleDateString()}</small></span>
                </div>
              </div>
            );
          })}
        </div>
        </SkyLight>
      </div>):(<Edit/>)
    );
  }
}
export default MemberProfile;
  {
/*
                    <h1>MEMBER PROFILE</h1>
                    {this.state.showFeedback == false ? (
                      <button
                        onClick={this.handleChangeProf}
                        className="list-group-item list-group-item-action"
                      >
                        SHOW POFILE
                      </button>
                    ) : (
                      <div>
                        <button
                          className="list-group-item list-group-item-action"
                          onClick={() => this.simpleDialog.show()}
                        >
                          Show Feedback
                        </button>
                        
                      </div>
                    )}
                    <button
                      onClick={this.handleChangeEdit}
                      className="list-group-item list-group-item-action"
                    >
                      EDIT PROFILE
                    </button>
                  </div>
                </div>

                {func}
              </div>
            </div>
          </div> */
  }