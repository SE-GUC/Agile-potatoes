import React, { Component } from 'react';
import NotificationsArray from './NotificationsArray';
import {Link} from 'react-router-dom';
import './Notifications.css'

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
        textalign:'right',
      }
    }

    componentDidMount() {
      axios.get('http://localhost:3001/api/notification', {
            'headers': {
                'userId': '',
                'userType': ''
            }
        })
      .then(res => this.setState({ notif: res.data }))
      .catch(err=>{
        console.log(err);
      })
    }

  render() {
    return (
      <div className="Notifications">
        <h5 className='styleHead'>You are seeing Notifications</h5>
        <NotificationsArray notifications = {this.state.notif}/>
      </div>
    );
  }
}

export default Notifications;
