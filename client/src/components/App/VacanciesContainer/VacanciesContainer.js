import React, { Component } from 'react'
import './VacanciesContainer.css'
import VacancyDisplayer from './VacancyDisplayer/VacancyDisplayer'
import axios from 'axios'
import CreateVacancy from '../CreateVacancy/CreateVacancy'
class EventsContainer extends Component {
  state = {
    vacancies: [],
    toggle: 0,
  }

  componentWillMount = async () => {
    try {
      let allVacancies = await axios.get(`http://localhost:3001/api/vacancy/getAllVacancies`);
      this.setState({
        vacancies: allVacancies.data
      });
    } catch (error) {
      console.log('GOT ERROR fetching vacancies')
    }
  }

  getRecommendedVacancies = async () => {
    try {
      let tokenData = JSON.parse(localStorage.getItem('token')).data;
      let recommendVacanciesRes = await axios.get(`http://localhost:3001/api/vacancies/RecommendedVacancies`, { headers: { Authorization: 'Bearer ' + tokenData.authData } });
      this.setState({
        vacancies: recommendVacanciesRes.data
      });
    } catch (error) {
      console.log('GOT ERROR getting recommended vacancies')
    }
  }

  getPartnerVacancies = async () => {
    try {
      let tokenData = JSON.parse(localStorage.getItem('token')).data;
      let vacancies = await axios.get(`http://localhost:3001/api/vacancy/PartnerVacancies`, { headers: { Authorization: 'Bearer ' + tokenData.authData } });
      this.setState({
        vacancies: vacancies.data
      });
    } catch (error) {
      console.log('GOT ERROR ' + error)
    }
  }

  getMyPastVacancies = async()=> {
    try{
    let tokenData = JSON.parse(localStorage.getItem('token')).data;
    let response = await axios.get('http://localhost:3001/api/vacancy/myPastVacancies', { headers: { Authorization: 'Bearer ' + tokenData.authData}
    })
    this.setState({
      vacancies: response.data
    });
    } catch (error) {
      console.log('GOT ERROR while getting my past vacancies' + error)
    }
  }

  getPendingVacanciesAdmin = async () => {
    try {
      let tokenData = JSON.parse(localStorage.getItem('token')).data;
      let response = await axios.get('http://localhost:3001/api/vacancy/AdminPendingVacancies', {
        headers: { Authorization: 'Bearer ' + tokenData.authData }
      })
      this.setState({
        vacancies: response.data
      });
    } catch (error) {
      console.log('GOT ERROR ' + error)
    }
  }

  handletoggle = () => {
    this.setState({ 
      events: [], 
      toggle: 1 
    })
  }

  render() {
    if (this.state.toggle > 0) {
      return <CreateVacancy />
    }
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='side-bar col-sm-2 ' >
            <div className="list-group">
              <button type="button" onClick={this.getAllVacancies} id="allVacancies" className="list-group-item list-group-item-action">All Vacancies</button>
              {
                JSON.parse(localStorage.getItem('token')).data.userData.userType === 'Member'
                &&
                <button type="button" onClick={this.getRecommendedVacancies} id="recommendedVacancies" className="list-group-item list-group-item-action">Recommended Vacancies</button>
              }
              {
                JSON.parse(localStorage.getItem('token')).data.userData.userType === 'Member'
                &&
                <button type="button" onClick={this.getMyPastVacancies} id="aWDFDGhvmbhjgfdstghjcv," className="list-group-item list-group-item-action">Your past Vacancies</button>
              }
              {
                JSON.parse(localStorage.getItem('token')).data.userData.userType === 'Partner'
                &&
                <button type="button" onClick={this.getPartnerVacancies} id="partnerVacancies" className="list-group-item list-group-item-action">All your Vacancies</button>
              }
              {
                JSON.parse(localStorage.getItem('token')).data.userData.userType === 'Admin'
                &&
                <button type="button" onClick={this.getPendingVacanciesAdmin} id="partnerVacancies" className="list-group-item list-group-item-action">Vacancies that need approval</button>
              }
              {
                (JSON.parse(localStorage.getItem('token')).data.userData.userType === 'Partner')
                &&
                <button type="button" onClick={this.handletoggle} id="partnerVacancies" className="list-group-item list-group-item-action">Create Vacancy</button>
              }
            </div>
          </div>
          <div className='events-window col-sm-10'>
            <VacancyDisplayer vacancies={this.state.vacancies} />
          </div>
        </div>
      </div>
    )
  }
}

export default EventsContainer
