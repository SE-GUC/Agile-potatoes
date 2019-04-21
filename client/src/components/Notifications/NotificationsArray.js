import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class NotificationsArray extends Component {


  getStyleDescription = () => {
    return {  
      padding: '5px',
      marginLeft: '5px'
    }
  }

  getStyleBackground = () => {
    return {
      background: '#A9A9A9'
    }
  }


  getStyleLink = () => {
    return {
      marginLeft: '5px',
      marginBottom: '1px'
    }
  }

  render() {
    return this.props.notifications.map((notification) => (
      
      <p style={this.getStyleBackground()}> <p style={this.getStyleDescription()}> {notification.description} </p>
      <p style={this.getStyleLink()}> <Link to ={notification.srcURL} > "go to link" </Link> </p>
      </p>
    ));
  }
}

NotificationsArray.propTypes = {
  notifications: PropTypes.array.isRequired
}

export default NotificationsArray;