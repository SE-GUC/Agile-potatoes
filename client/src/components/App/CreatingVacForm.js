const React = require('React');
const axios = require('React');

class CreatingVacForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            duration: '',
            location: '',
            salary: 0,
            dailyHours: 0,
            vacancyId: ''
        };
    }

    createVac() {
        await axios.post(`http://localhost:3001/api/event/5ca6301ec19e703fe028768b/CreateVacancy`, {
            description: this.state.description,
            duration: this.state.duration,
            location: this.state.location,
            dailyHours: this.state.dailyHours,
            vacancyId: this.state.vacancyId
        })

    }

    render() {
        return (
            <form onSubmit = {this.createVac}>
                <label>
                    description:
          <input type="text" value={this.state.description} />
                </label>
                <label>
                    duration:
          <input type="text" value={this.state.duration} />
                </label>
                <label>
                    location:
          <input type="text" value={this.state.location} />
                </label>
                <label>
                    salary:
          <input type="number" value={this.state.salary} />
                </label>
                <label>
                    dailyHours:
          <input type="number" value={this.state.dailyHours} />
                </label>
                <label>
                    vacancyId:
          <input type="text" value={this.state.vacancyId} />
                </label>
                <input type="submit" value="Submit" />
            </form>

        );
    }
}
