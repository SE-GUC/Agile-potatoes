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
        reviews: [],
      },
      toggle: 0,
      showFeedback: false
    };
  }
  handleChangeEdit = () => {
    this.setState({ toggle: 1, userProfile: this.state.userProfile });
  };
  handleChangeProf = () => {
    this.setState({ toggle: 0, userProfile: this.state.userProfile });
  };
  componentDidMount = async () => {
    try {
      let tokenData = JSON.parse(localStorage.getItem('token')).data;
      let profId;
      if (this.props.match.params.profId) {
        profId = this.props.match.params.profId;
      }
      else
        profId = tokenData.userData.userId;
      let profile = await axios.get(
        `http://localhost:3001/api/profile/${profId}`,
        { headers: { Authorization: 'Bearer ' + tokenData.authData } }
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
        toggle: this.state.toggle
      });
    } catch (err) {
      console.log("GOT ERROR" + err);
    }
  };

  render() {
    return (
      this.state.toggle === 0 ?
        (<div>
          <div className="row push-down">
            <div className=" offset-sm-2 col-sm-6">
              <div className="profPanel">
                <h1> Basic info </h1>
                <div className="attrContainer"><p>First name: <span>{this.state.userProfile.fname}</span> </p></div>
                <div className="attrContainer"><p>Last name: <span>{this.state.userProfile.lname}</span></p></div>
                <div className="attrContainer"><p>Email: <span>{this.state.userProfile.email}</span> </p></div>
                <div className="attrContainer"><p>Address: <span>{this.state.userProfile.address}</span></p></div>
                <div className="attrContainer"><p>Interests: <span>{this.state.userProfile.interests}</span></p></div>
                <div className="attrContainer"> <p> Membership State: <span className={
                  this.state.userProfile.membershipState === 'Active' ? ('activeMem') : this.state.userProfile.membershipState
                    === 'Pending' ? ('pendingMem') : ('expiredMem')
                }> {
                    this.state.userProfile.membershipState
                  }</span></p> </div>
              </div>
              <div className="profPanel" >
                <h1> Career info </h1>
                <div className="attrContainer"><p>Availability: <span>{this.state.userProfile.availability}</span></p></div>
                <div className="attrContainer"><p>Skills: <span>{this.state.userProfile.skills}</span></p></div>
                <div className="attrContainer"><p>Master classes: <span>{this.state.userProfile.masterClasses}</span></p></div>
                <div className="attrContainer"><p>Certificates: <span>{this.state.userProfile.certificates}</span></p></div>
                <div className="attrContainer"><p>Events: <span>{this.state.userProfile.events}</span></p></div>
                <div className="attrContainer"><p>Vacancies: <span>{this.state.userProfile.vacancies}</span></p></div>
              </div>
            </div>

            <div className="col-sm-2 profOptions " >
              <div className="btn btn-primary" onClick={this.handleChangeEdit} >Edit</div>
              <br /><br />
              <div className="btn btn-danger" onClick={() => this.simpleDialog.show()} >Show Feedbacks</div>
            </div>



            <SkyLight
              hideOnOverlayClicked
              ref={ref => (this.simpleDialog = ref)}
              title="Feedbacks"
            >
              <div className='toto'>
                {this.state.userProfile.reviews &&
                  this.state.userProfile.reviews.map(review => {
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
          </div>
        </div>) : (<Edit />)
    );
  }
}
export default MemberProfile;
