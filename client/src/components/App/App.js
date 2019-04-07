import React, { Component } from 'react';
import './App.css';
import EventsContainer from './EventsContainer/EventsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <EventsContainer/>
      </div>
    );
  }
}

export default App;
