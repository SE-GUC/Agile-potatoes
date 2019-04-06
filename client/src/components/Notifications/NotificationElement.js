import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class NotificationObject extends Component {
  render() {
    return (
      <div>
        <p>notf: {this.props.notification.description}</p>
      </div>
    )
  }
}

NotificationObject.propTypes = {
    notification: PropTypes.object.isRequired
  }

export default NotificationObject
