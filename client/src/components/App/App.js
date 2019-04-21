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
// import CreatingVacComment from './CreatingVacComment'
// import DeletePendingEvents from './DeletePendingEvents'
// import CreatingEventComment from './CreatingEventComment'
import VacancyPost from './VacancyPost/VacancyPost'
import EventPostNew from './EventPostNew/EventPostNew'
import HomePage from './HomePage/HomePage'
import Navbar from './Navbar/Navbar'
import Login from './Sign In/Login';
import Footer from './Footer/Footer'
import PartnerProfile from './Profiles/PartnerProfile/PartnerProfile'
import MemberProfile from './Profiles/MemberProfile/MemberProfile'
import AdminProfile from './AdminProfile/AdminProfile'
import GetAllVacancies from './GetAllVacancies/GetAllVacancies'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }
  changeLoggedInFlag = (flag) => {
    this.setState({
      loggedIn: flag
    })
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar loggedIn={this.state.loggedIn} changeLoggedInFlag={this.changeLoggedInFlag}/>
          <div>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/events" component={EventsContainer}/> 
            <Route exact path="/events/:id" component={EventPostNew}/>
            <Route exact path="/vacancies" component={GetAllVacancies}/>
            <Route exact path="/vacancies/:id" component={VacancyPost}/>
            <Route exact path="/adminprofile" component={AdminProfile}/>
            <Route exact path="/partnerprofile" component={PartnerProfile}/>
            <Route exact path="/memberprofile" component={MemberProfile}/>
            <Route exact path="/notifications" component={HomePage}/>
            <Route exact path="/login" component={ () => <Login changeLoggedInFlag={this.changeLoggedInFlag} /> } />
          </div>
        </Router>
        <Footer/>
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
              <CreatingVacComment />
              <DeletePendingEvents />
              <CreatingEventComment />
            <GetPendingVacanciesAdmin />
           */}
      </div>
    );
  }
}

export default App;
