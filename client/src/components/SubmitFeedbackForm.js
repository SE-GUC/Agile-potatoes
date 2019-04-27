import React, { Component } from 'react';
import axios from 'axios';

class SubmitFeedbackForm extends Component {
    state = {
        comment: '',
        userID: '5ca11a709b305d4878a54dfe'
    };

    onChange = (e) => {
        this.setState({comment: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        var partnerID = "5ca62ef8508b883850d9b161"
        axios.post(`http://localhost:3001/api/profile/${partnerID}/feedback`, {
            "userType": "Member",
            "userID": this.state.userID,
            "comment": this.state.comment 
        }).then(console.log("Done!"))
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="comment" onChange={this.onChange} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default SubmitFeedbackForm;