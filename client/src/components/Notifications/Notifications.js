import React, { Component } from 'react';
import NotificationsArray from './NotificationsArray';
import {Link} from 'react-router-dom';


const axios = require('axios');


class Notifications extends Component {

    state = {
        notif: []
    }

    getStyleHeader = () => {
      return {
        background: '#808000',
        textalign:'right'
      }
    }

    getStyleHome = () => {
      return {
        background: '#132180',
        textalign:'right'
      }
    }

    componentDidMount() {
      axios.get('http://localhost:3001/api/notification/')
      .then(res => this.setState({ notif: res.data }))
    }

  render() {
    return (
      <div className="Notifications">
      <header>
        <Link to="/" style={this.getStyleHome()}>Home</Link>
      </header>

      <h style={this.getStyleHeader()}>You are seeing Notifications</h>
      <NotificationsArray notifications = {this.state.notif}/>

      </div>
    );
  }
}

export default Notifications;
