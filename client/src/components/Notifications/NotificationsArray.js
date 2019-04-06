import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationObject from './NotificationObject';

class ShowNotifications extends Component {

  render() {
    return this.props.notifications.map((notification) => (
      <NotificationObject key={notification.id} notification={notification} />
    ));
  }
}

ShowNotifications.propTypes = {
  notifications: PropTypes.array.isRequired
}

export default ShowNotifications;