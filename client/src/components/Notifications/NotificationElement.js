import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


export class NotificationElement extends Component {
  render() {
    return (
      <div>
        <p>notf: {this.props.notification.description}  <Link to ={this.props.notification.srcURL} > ;"go to link" </Link></p> 
      </div>
    )
  }
}

NotificationElement.propTypes = {
    notification: PropTypes.object.isRequired
  }

export default NotificationElement
