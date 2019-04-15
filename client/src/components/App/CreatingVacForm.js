
const React = require('react');
const axios = require('axios');

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

    createVac= async() => {
        this.state.description = document.getElementById("description").value;
        this.state.duration = document.getElementById("duration").value;
        this.state.location = document.getElementById("location").value;
        this.state.dailyHours = document.getElementById("dailyHours").value;
        this.state.vacancyId = document.getElementById("vacancyId").value;
        
        await axios.post(`http://localhost:3001/api/vacancy/1/CreateVacancy`, {
            description: this.state.description,
            duration: this.state.duration,
            location: this.state.location,
            dailyHours: this.state.dailyHours,
            vacancyId: this.state.vacancyId
    })
    

    }
    render() {
        return (
            <form >
                <label>
                    description:
          <input type="text" id = "description"/>
                </label>
                <label>
                    duration:
          <input type="text" id= "duration" />
                </label>
                <label>
                    location:
          <input type="text" id = "location"/>
                </label>
                <label>
                    salary:
          <input type="number" id="salary" />
                </label>
                <label>
                    dailyHours:
          <input type="number" id = "dailyHours" />
                </label>
                <label>
                    vacancyId:
          <input type="text" id = "vacancyId" />
                </label>
                <input type="submit" value="Submit" onClick={this.createVac} />
            </form>

        );
    }
}
export default CreatingVacForm

