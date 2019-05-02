import React, { Component } from 'react';
import './CreateVacancy.css';
import axios from 'axios';
class CreateVacancy extends Component {
  constructor(props) {
    super(props);
    this.userData = JSON.parse(localStorage.getItem('token')).data.userData;
    this.authData = JSON.parse(localStorage.getItem('token')).data.authData;
    this.state = {
      description: "",
      duration: "",
      location: "",
      salary: 0,
      dailyHours: 0,
      city: "",
      name: ""
    }
  }

  handleChange = (e) => {
    console.log('Name ' + e.target.name)
    console.log('Value ' + e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitCreate = async () => {
    try {
      let response = await axios.post(`http://localhost:3001/api/vacancy/CreateVacancy`, {
        'description': this.state.description,
        'duration': this.state.duration,
        'location': this.state.location,
        'salary': this.state.salary,
        'dailyHours': this.state.dailyHours,
        'city': this.state.city,
        'name': this.state.name
      }, {
          headers: {
            Authorization: 'Bearer ' + this.authData
          }
        });

      console.log(response.data);
    }
    catch (err) {
      console.log(err)
    }

  }

  render() {
    return (
      <div className='container-fluid'>
        <div className="card event1Card">
          <div className="card-body">
            <form onSubmit={this.onSubmitCreate}><br /><br /><br />
              Vacancy Description:
              <input type="text" name="description" onChange={this.handleChange} /><br />
              Vacancy Name:
              <input type="text" name="name" onChange={this.handleChange} /><br />
              Daily Hours required:
              <input type="number" name="dailyHours" onChange={this.handleChange} /><br />
              WorkPlace Location:
              <input type="text" name="location" onChange={this.handleChange} /><br />
              WorkPlace City:
              <input type="text" name="city" onChange={this.handleChange} /><br />
              Vacancy Duration:
              <input type="text" name="duration" onChange={this.handleChange} /><br />
              Salary amount:
              <input type="number" name="salary" onChange={this.handleChange} /><br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateVacancy;
