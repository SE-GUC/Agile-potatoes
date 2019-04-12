import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// import SubmitFeedbackForm from './../SubmitFeedbackForm';
import EventsContainer from './EventsContainer/EventsContainer'
// import AdminProfile from './AdminProfile/AdminName'
// import AdminPassword from './AdminProfile/AdminPassword'
// import EventPost from './EventPost/Event'
// import GetApplicants from '../GetApplicants/GetApplicants.js';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Notifications from '../Notifications/Notifications';
// import Header from '../Notifications/AppHeader';
// import GetPendingEventsAdmin from './GetPendingEventsAdmin/GetPendingEventsAdmin'
// import CreatingVacForm from './CreatingVacForm'
// import GetPendingVacanciesAdmin from './GetPendingVacanciesAdmin'
import EventPostNew from './EventPostNew/EventPostNew'
import HomePage from './HomePage/HomePage'
import Navbar from './Navbar/Navbar'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar/>
          <div>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/events" component={EventsContainer}/>
            <Route exact path="/events/:id" component={EventPostNew}/>
            <Route exact path="/vacancies" component={HomePage}/>
            <Route exact path="/vacancies/:id" component={HomePage}/>
            <Route exact path="/profile" component={HomePage}/>
            <Route exact path="/notifications" component={HomePage}/>
          </div>
        </Router>
        {/*<EventPostNew/>
        <GetApplicants/>
        <SubmitFeedbackForm />
        <CreatePartnerform/>
        <EventsContainer />
        <AdminProfile />
        <AdminPassword />
        <EventPost />
            <CreatingVacForm />
        <Router>
          <div className="App1">
            <Header />
            <Route exact path="/notifications" render={props => (
              <React.Fragment>
                <Notifications />
              </React.Fragment>
            )} />
          </div>
        </Router>
            <GetPendingEventsAdmin />

            <GetPendingVacanciesAdmin />
           */}
      </div>
    );
  }
}

export default App;
