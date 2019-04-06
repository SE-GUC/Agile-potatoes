import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Notifications from '../Notifications/Notifications';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/notification" render={props => (
            <React.Fragment>
              <Notifications />
            </React.Fragment>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
