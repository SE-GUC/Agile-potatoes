import React from 'react'
import './VacancyCard.css'
// import axios from 'axios'
import { NavLink } from 'react-router-dom'


const VacancyDisplayer = ({ vacancies }) => {
  // const goToPost = async (url) => {
  //   console.log(url)
  //   var post = (url) ? await axios.get("http://localhost:3001" + url) : 'none';
  //   console.log(post)
  //   //should display vacancy post page
  // }
  const vacanciesList = vacancies.length ? (
    vacancies.map(vacancy => {
      return (
        <div key={vacancy._id}>
          <div className="card eventCard">
            {/* <img src='.../public/assets/a.jpg' className="card-img-top" alt="event photo"/> */}
            <div className="card-body">
              <h5 className="card-title">{vacancy.name}</h5>
              <p className="card-text sample-text">{vacancy.description && vacancy.description.length > 100 ? vacancy.description.substring(0, 100) + ". . ." : vacancy.description}</p>
              <span className="card-text"><small className="text-muted">{vacancy.postDate ? new Date(vacancy.postDate).toLocaleDateString() : 'No date specified'}</small></span>
              <NavLink to={`/vacancies/${vacancy._id}`} className="btn btn-primary">See More</NavLink>
            </div>
          </div>
        </div>
      )
    })
  ) : (
      <p className="center">No vacancies to show</p>
    );

  return (
    <div className='card-group'>
      {vacanciesList}
    </div>
  )
}

export default VacancyDisplayer
