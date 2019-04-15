import React, { Component } from 'react'
import axios from 'axios'
import { clearImmediate } from 'timers';
import { restElement } from '@babel/types';
class GetAllVacancies extends Component {
    constructor() {
      super()
  
      this.state = {
            vacancies: [],
            recommvacancies:[],
            cond: ""
      };
  }
  
  increment() {
    
      this.setState({
          vacancies: this.state.vacancies,
          cond: "button1" 
         
      })
  
     let Allvacancies = this.state.vacancies;
  
      console.log("Vacancies" + Allvacancies)
  
      axios.get(`http://localhost:3001/api/vacancy/5cb2f9f91c9d4400006aef55/GetAllVacancies`)
      .then(res => {
        const vacancies = res.data;
        this.setState({vacancies: vacancies });
        console.log(res);
        console.log(res.data);
      })
      
  }
  increment1() {
    this.setState({
        recommvacancies: this.state.recommvacancies,
        cond: "button2"
       
    })

   let Recommendedvacancies = this.state.recommvacancies;

    console.log("Vacancies" + Recommendedvacancies)

  axios.get(`http://localhost:3001/api/vacancy/RecommendedVacancies`, {'headers':{'userId': '5cb2fb3f1c9d4400006aef56'}})
    .then(res => {
      const recommvacancies = res.data;
      this.setState({recommvacancies: recommvacancies });
      console.log(res);
      console.log(res.data);
    })
}

  render() {
      let func;
      if(this.state.cond == "button1")
      {
          func =
           this.state.vacancies.map(vacancy =>
            <div className="card eventCard">
             <div className="card-body">
             <h5 className="card-title">{["Status:" + vacancy.status + "   " + "Description:" + vacancy.description]}</h5>
               {/* <li>{[vacancy.city]}</li> */}
               </div>
               </div>)
      }
      else
      {
          if(this.state.cond == "button2"){
            func = 
             this.state.recommvacancies.map(vacancy =>
            <div className="card eventCard">
             <div className="card-body">
             <h5 className="card-title">{["City:" + vacancy.city]}</h5>
               {/* <li>{[vacancy.city]}</li> */}
               </div>
               </div>)
      }
      }
      return (
        <div className='container-fluid'>
        <div className='row'>
        <div className='side-bar col-sm-2 ' >
            <div className="list-group">
       
          <button type="submit"  onClick={() => this.increment()} >Show All Vacancies </button>
          <button type="submit"  onClick={() => this.increment1()} >Show Recommended Vacancies Only</button>
 
      </div>
      
      </div>
      <div className='events-window col-sm-10'>
       {func}
      </div>
     </div>
     </div>
      );
  }
  }

export default GetAllVacancies;