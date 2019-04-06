import React, { Component } from 'react';
import ShowNotifications from './ShowNotifications';
import Header from './Header';

const axios = require('axios');


class Notifications extends Component {

    state = {
        notif: []
    }

    componentDidMount() {
      axios.get('http://localhost:3000/api/notification/')
      .then(res => this.setState({ notif: res.data }))
    }

  render() {
    return (
      <div className="Notifications">
      <Header />
      <p>You are seeing Notifications</p>
      <ShowNotifications notifications = {this.state.notif}/>
      </div>
    );
  }
}

export default Notifications;
