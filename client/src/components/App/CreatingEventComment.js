
const React = require('react');
const axios = require('axios');
class CreatingEventComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        };
    }

    async createEventComment() {
        this.state.comment = document.getElementById("comment").value;
        await axios.post(`http://localhost:3000/api/event/1/comment`, {
            comment: this.state.comment
        });
    }
    render() {
        return (
            <form>
                <label>
                    comment:
          <input type="text" id="comment" />
                </label>
                <input type="submit" value="post" onClick={this.createEventComment} />
            </form>
            
        );
    }
}
export default CreatingEventComment
