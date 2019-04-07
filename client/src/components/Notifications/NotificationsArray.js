import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationElement from './NotificationElement';

class NotificationsArray extends Component {

  render() {
    return this.props.notifications.map((notification) => (
      <NotificationElement key={notification.id} notification={notification} />
    ));
  }
}

NotificationsArray.propTypes = {
  notifications: PropTypes.array.isRequired
}

export default NotificationsArray;