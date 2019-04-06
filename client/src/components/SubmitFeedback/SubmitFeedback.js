import React, {Component} from 'react'
import axios from 'axios'

export class SubmitFeedback extends Component {
  state = {
    userID: '5ca11a709b305d4878a54dfe',
    comment: ''
  }

  onChange = (e) => {
    this.setState({comment: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/api/profile/${'5ca62ef8508b883850d9b161'}/feedback`, {
      'userType': 'Member',
      'userID': this.state.userID,
      'comment': this.state.comment
    })
    .then(console.log("Done!"))
    .catch(console.log("Error!"))
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" name="comment" onChange={this.onChange}/>
        <input type="submit" value="Submit" />
      </form>
    )
  }

}

export default SubmitFeedback

