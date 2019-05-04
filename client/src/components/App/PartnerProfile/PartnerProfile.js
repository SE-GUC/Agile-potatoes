import React, { Component } from "react";
import axios from "axios";
import Edit from "./Edit/Edit";
import SkyLight from "react-skylight";
import "./PartnerProfile.css";
class PartnerProfile extends Component {
  constructor(props) {
    super(props);
    this.userData = JSON.parse(localStorage.getItem('token')).data.userData;
    this.authData = JSON.parse(localStorage.getItem('token')).data.authData;
    this.state = {
      userProfile: {},
      toggle: 0,
      showFeedback: false,
      loaded: false
    };
  }
  handleChangeEdit = () => {
    this.setState({ toggle: 1, userProfile: this.state.userProfile });
  };
  handleChangeProf = () => {
    this.setState({ toggle: 0, userProfile: this.state.userProfile });
  };
  componentWillMount = async () => {
    try {
      //let tokenData = JSON.parse(localStorage.getItem('token')).data;
      let profId;
      console.log('params profID:  ' + this.props.match.params.profId)
      if (this.props.match.params.profId) {
        profId = this.props.match.params.profId;
      }
      else
        profId = this.userData.userId;
      let profile = await axios.get(`http://localhost:3001/api/profile/${profId}`, {
        headers: { Authorization: 'Bearer ' + this.authData }
      });
      this.setState({
        userProfile: profile.data,
        loaded: true
      });
    } catch (err) {
      console.log("GOT ERROR" + err);
    }
  };

  render() {
    if (!this.state.loaded) return null;
    return (
      this.state.toggle === 0 ?
        (<div>
          <div className="row push-down">
            <div className=" offset-sm-2 col-sm-6">
              <div className="profPanel">
                <h1> Basic info </h1>
                <div className="attrContainer"><p>Name: <span>{this.state.userProfile.name}</span> </p></div>
                <div className="attrContainer"><p>Username: <span>{this.state.userProfile.username}</span> </p></div>
                <div className="attrContainer"><p>Email: <span>{this.state.userProfile.email}</span> </p></div>
                <div className="attrContainer"><p>Workfield: <span>{this.state.userProfile.workfield}</span></p></div>
                <div className="attrContainer"> <p> Membership State: <span className={
                  this.state.userProfile.membershipState === 'Active' ? ('activeMem') : this.state.userProfile.membershipState
                    === 'Pending' ? ('pendingMem') : ('expiredMem')
                }> {
                    this.state.userProfile.membershipState
                  }</span></p> </div>
                <div className="attrContainer"><p>Membership expiry date: <span>{new Date(this.state.userProfile.membershipExpiryDate).toLocaleDateString()}</span> </p></div>
              </div>
              <div className="profPanel" >
                <h1> Career info </h1>
                <div className="attrContainer"><p>Availability: <span>{this.state.userProfile.availability}</span></p></div>
                {
                  (this.state.userProfile.events)
                  &&
                  <div className="attrContainer"><p>Events: {this.state.userProfile.events.map((event) => {
                    return <span>{event.name + ', '}</span>
                  })}</p></div>
                }
                {
                  (this.state.userProfile.vacancies)
                  &&
                  <div className="attrContainer"><p>Vacancies: {this.state.userProfile.vacancies.map((vacancy) => {
                    return <span>{vacancy.name + ', '}</span>
                  })}</p></div>
                }

                {/* <div className="attrContainer"><p>Vacancies: <span>{this.state.userProfile.vacancies}</span></p></div> */}
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
                {this.state.userProfile.feedbacks &&
                  this.state.userProfile.feedbacks.map(review => {
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
        </div>) :
        (<Edit />)
    );
  }
}
export default PartnerProfile;
