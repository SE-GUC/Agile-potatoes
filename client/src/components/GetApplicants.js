import GetApplicants from '../GetApplicants/GetApplicants.js';
import React, { Component } from 'react';

import axios from 'axios';
class GetApplicants extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      applicantsList: [
        {"_id":"5ca6312cc19e703fe028768c"
        ,"availability":true
        ,"skills":["member_1_skill_1","member_1_skill_2"]
        ,"masterClasses":[]
        ,"certificates":[],"membershipState":"Pending"
        ,"interests":["member_1_interest_1"
        ,"member_1_interest_2"]
        ,"events":[]
        ,"projects":[]
        ,"tasks":[]
        ,"vacancies":[]
        ,"username":"member_1"
        ,"password":"member_1_password"
        ,"email":"member_1_email"
        ,"fname":"member_1_fname"
        ,"lname":"member_1_lname"
        ,"address":"member_1_address"
        ,"notifications":[]
        ,"reviews":[]
        ,"ProfileURL":"/api/profile/5ca6312cc19e703fe028768c"
        ,"__v":{"$numberInt":"0"}},
      ],
    };
  
  }

  GetApplicants() {
    axios.get('http://localhost:3001/api/vacancy/5ca6301ec19e703fe028768b/applicants', {userType: 'Partner'})
    .then(response => {
      console.log(response.data);
      this.setState({applicantsList:[...this.state.applicantsList,...response.data]})
      })
  }
  
  render() {
    return (
      <div>
        <h1>Applicants</h1>
        <button onClick = {this.GetApplicants}>SHOW APPLICANTS</button>
        <ul>
        { this.state.applicantsList.map(applicant => <li>{applicant.fname}</li>)}
       </ul>
      </div>
    )
  }
}

export default GetApplicants;