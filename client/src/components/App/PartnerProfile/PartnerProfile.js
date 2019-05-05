import React, { Component } from 'react'
import axios from 'axios'
import Edit from './Edit/Edit'
import SkyLight from "react-skylight";
import './PartnerProfile.css'



class PartnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {
        vacancies: [],
        membershipState: "",
        pastProjects: [],
        events: [],
        username: "",
        password: "",
        name: "",
        email: "",
        workfield: "",
        boardMembers: [],
        notifications: [],
        feedbacks: [],
      
      },  toggle: 0,
    }
  }
  handleChangeCreateVac = () => {
    this.setState({ toggle: 3 })
  }
  handleChangeEdit = () => {
    this.setState({ toggle: 1 })
  }

  handleChangeCreateEve = () => {
    this.setState({ toggle: 2 })
  }

  handleChangeProf = () => {
    this.setState({ toggle: 0,userProfile: this.state.userProfile })
  }
  componentDidMount = async () => {
    let tokenData = JSON.parse(localStorage.getItem('token')).data;
    let profId = tokenData.userData.userId;
    try {
      
      let profile = await axios.get(
        `http://localhost:3001/api/profile/${profId}`,
        { headers: { Authorization: 'Bearer ' + tokenData.authData } }
      );      
      console.log(profile);
      this.setState({
        userProfile: {
          vacancies: profile.data.vacancies,
          membershipState: profile.data.membershipState,
          pastProjects: profile.data.pastProjects,
          events: profile.data.events,
          username: profile.data.username,
          password: profile.data.password,
          name: profile.data.name,
          email: profile.data.email,
          workfield: profile.data.workfield,
          boardMembers: profile.data.boardMembers,
          notifications: profile.data.notifications,
          feedbacks: profile.data.feedbacks
        }, showFeedback: true,
        toggle: this.state.toggle
      })

    }
    catch (err) {
      console.log("GOT ERROR" + err)
    }
  }
  
    render() {
      return (
        this.state.toggle === 0 ?
          (<div>
            <div className="row push-down">
              <div className=" offset-sm-2 col-sm-6">
                <div className="profPanel">
                  <h1> Basic info </h1>
                  <div className="attrContainer"><p>Name: <span>{this.state.userProfile.name}</span> </p></div>
                  <div className="attrContainer"><p>Email: <span>{this.state.userProfile.email}</span> </p></div>
                 <div className="attrContainer"> <p> Membership State: <span className={
                    this.state.userProfile.membershipState === 'Active' ? ('activeMem') : this.state.userProfile.membershipState
                      === 'Pending' ? ('pendingMem') : ('expiredMem')
                  }> {
                      this.state.userProfile.membershipState
                    }</span></p> </div>
                </div>
                <div className="profPanel" >
                  <h1> Career info </h1>
                  <div className="attrContainer"><p>Board Members: <span>{this.state.userProfile.boardMembers.map(member=>
                    ["Name: "+member.name+"     ","Email: "+member.email])}</span></p></div>
                  <div className="attrContainer"><p>Past Projects: <span>{this.state.userProfile.pastProjects}</span></p></div>
                  <div className="attrContainer"><p>workfield: <span>{this.state.userProfile.workfield}</span></p></div>
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








  

export default PartnerProfile;