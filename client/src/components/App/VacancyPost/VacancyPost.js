import React, { Component } from 'react'
import './VacancyPost.css'
import axios from 'axios'

class VacancyPost extends Component {
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
      userHasApplied: false,
      vacancyData: {}
    }
  }

  async componentDidMount() {
    let vacancy = await axios.get("http://localhost:3001/api/vacancy/Post/5cb7226dc984592c541ac1a8");
    //console.log(vacancy.data);
    this.setState({
      vacancyData: vacancy.data,
      loaded: true
    })
    await this.checkIfAlreadyApplied();

  }

  getCommentsSorted() {  // Should sort all comments based on date
    return (this.state.vacancyData.commentsByAdmin).concat(this.state.vacancyData.commentsByPartner)
  }

  //EDIT THIS!!!
  async checkIfAlreadyApplied() {
    // check if user is found in attendees array
    let applied = false;
    let vacancy = await axios.get("http://localhost:3001/api/vacancy/Post/5cb7226dc984592c541ac1a8");
    let applicants = vacancy.data.applicants;
    console.log(applicants)
    for (let i = 0; i < applicants.length; i++) {
      if (applicants[i]._id === this.state.userData._id)
        applied = true;
    }
    if (applied) {
      this.setState({
        userHasApplied: true
      })
    }
  }

  onClickApply = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/api/vacancy/5cb7226dc984592c541ac1a8/apply", {
      "userID": this.state.userData._id,
      "userType": this.state.userData.userType
    }).then(this.setState({
      userHasApplied: true
    }));
  }

  onClickCancel = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/api/vacancy/5cb7226dc984592c541ac1a8/un-apply", {
      "userID": this.state.userData._id,
      "userType": this.state.userData.userType
    }).then(this.setState({
      userHasApplied: false
    }));
  }

  render() {
    if (!this.state.loaded) return null;
    return (
      <div>
        <div className="vacancy-post offset-sm-2 col-sm-8 row ">
          <div className="left-of-post col-sm-9">
            <div className="vacancy-post-header">
              <p className="text-muted"><i className="fas fa-calendar-day"></i>  {this.state.vacancyData.postDate}</p>
              <h2>{this.state.vacancyData.name}</h2>
              <p><span className="text-muted">Posted by </span>{this.state.vacancyData.partner.name}</p>
              <p className="text-muted"><i className="fas fa-map-marker-alt"></i>  {this.state.vacancyData.location}, {this.state.vacancyData.city}</p>
            </div>
            <div className="vacancy-post-info">
              <h4>Details</h4>
              <p>{this.state.vacancyData.description}</p>
              <br />
              <h4>Daily Hours</h4>
              <p>{this.state.vacancyData.dailyHours}</p>
              <br />
              <h4>Duration</h4>
              <p>{this.state.vacancyData.duration}</p>
              <br />
              <h4>URL</h4>
              <p>{this.state.vacancyData.url}</p>
              <br />
            </div>

            {
              (this.state.vacancyData.status === "Submitted")
              &&
              (this.state.userData.userType === "Admin" || this.state.userData.userType === "Partner")
              &&
              <div className="comments-section col-sm-12">
                <h4>Comments</h4>
                {this.getCommentsSorted().map((comment) => {
                  return <div className='comment'>
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

            {
              (this.state.vacancyData.hired.includes(this.state.userData._id))
              &&
              (this.state.vacancyData.status === 'Closed')
              &&
              (this.state.userData.userType === 'Member')
              &&
              <div className="input-group mb-3">
                <input type="text" className="form-control" />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button" >Submit Feedback</button>
                </div>
              </div>
            }

          </div>

          <div className="right-of-post col-sm-3">
            <p className="text-center h3">{this.state.vacancyData.salary} EGP</p>
            {this.state.userHasApplied ? (
              <button className="btn btn-danger offset-sm-1 col-sm-10 book-button" disabled={this.state.vacancyData.status === 'Closed'} onClick={this.onClickCancel} >CANCEL</button>
            ) : (
                <button className="btn btn-outline-success offset-sm-1 col-sm-10 book-button" disabled={this.state.userData.userType !== 'Member' || this.state.vacancyData.status === 'Closed'} onClick={this.onClickApply} >APPLY NOW</button>
              )}
            {
              (this.state.userData.userType === "Admin")
              &&
              (this.state.vacancyData.status === "Submitted")
              &&
              <div><br /><br /><br />
                <button class="btn btn-success ctrl-button col-sm-12 ">Approve Vacancy</button>
              </div>
            }
            {
              (this.state.userData.userType === "Partner")
              &&
              (this.state.vacancyData.status === "Submitted")
              &&
              <div><br /><br /><br />
                <button className="btn btn-danger ctrl-button col-sm-12 ">Delete Vacancy</button>
              </div>
            }
            {
              (this.state.userData.userType === "Partner")
              &&
              (this.state.vacancyData.status === "Approved")
              &&
              <div><br /><br /><br />
                <button className="btn btn-warning ctrl-button col-sm-12 ">Close Vacancy</button>
              </div>
            }
            {
              (this.state.userData.userType === "Partner")
              &&
              (this.state.vacancyData.status === "Finished")
              &&
              <div><br /><br /><br />
                <button className="btn btn-success ctrl-button col-sm-12 ">Re-Open Vacancy</button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default VacancyPost