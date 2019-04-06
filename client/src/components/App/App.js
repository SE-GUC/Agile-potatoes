import React, { Component } from 'react';
import './App.css';
import SubmitFeedback from '../SubmitFeedback/SubmitFeedback.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SubmitFeedback />
      </div>
    );
  }
}

export default App;
