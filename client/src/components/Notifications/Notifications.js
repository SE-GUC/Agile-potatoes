import React, { Component } from 'react';
import NotificationsArray from './NotificationsArray';
import Header from './Header';

const axios = require('axios');


class Notifications extends Component {

    state = {
        notif: []
    }

    componentDidMount() {
      axios.get('http://localhost:3001/api/notification/')
      .then(res => this.setState({ notif: res.data }))
    }

  render() {
    return (
      <div className="Notifications">
      <Header />
      <p>You are seeing Notifications</p>
      <NotificationsArray notifications = {this.state.notif}/>
      </div>
    );
  }
}

export default Notifications;
