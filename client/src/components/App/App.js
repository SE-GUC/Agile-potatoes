import React, { Component } from 'react';
import './App.css';
import SubmitFeedbackForm from './../SubmitFeedbackForm';
import EventsContainer from './EventsContainer/EventsContainer'
import AdminProfile from './AdminProfile/AdminName'
import AdminPassword from './AdminProfile/AdminPassword'
import EventPost from './EventPost/Event'

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Notifications from '../Notifications/Notifications';
import Header from '../Notifications/AppHeader';
import GetPendingEventsAdmin from './GetPendingEventsAdmin/GetPendingEventsAdmin'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SubmitFeedbackForm />
        <CreatePartnerform/>
        <EventsContainer />
        <AdminProfile />
        <AdminPassword />
<EventPost/>
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
      </div>
    );
  }
}

export default App;
