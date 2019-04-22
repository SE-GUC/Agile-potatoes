import React, { Component } from 'react'
import axios from 'axios'
import { clearImmediate } from 'timers';
import { restElement } from '@babel/types';
import './GetAllVacancies.css'
class GetAllVacancies extends Component {
    constructor() {
      super()
  
      this.state = {
            vacancies: [],
            recommvacancies:[],
            cond: "",
            usertype:"",
            vacstatus:"",
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

handleChange(value1) {
  this.setState({
    usertype: value1
  });
}

handleChange1(value2) {
  this.setState({
    vacstatus: value2
  });
}

handlerender=()=>
    {
        
       this.setState({cond:"button3"})
       
    }

increment2=async()=> {
  this.setState({
      usertype: this.state.usertype + '',
      vacstatus: this.state.vacstatus + ''
     
  })

 let currentUserType = this.state.usertype;
 let newVacStatus = this.state.vacstatus;

  console.log(currentUserType)
  console.log(newVacStatus)


  if(currentUserType === "Admin"){
    axios.put(`http://localhost:3001/api/vacancy/5cb2f9df1c9d4400006aef54/status`,  { 'userType': currentUserType ,'status':newVacStatus} )
  .then(res => {
    console.log(res);
    console.log(res.data);
    document.getElementById("box1").value = ""
    document.getElementById("box2").value = ""
    window.alert(res.data)
   
  })
  
  }

  else if(currentUserType === "Partner"){
    axios.put(`http://localhost:3001/api/vacancy/5cb2f9df1c9d4400006aef54/status`,  { 'userType': currentUserType ,'status':newVacStatus, 'partner': '5ca121cec07e9b626444f8ae'} )
  .then(res => {
    console.log(res);
    console.log(res.data);
    document.getElementById("box1").value = ""
    document.getElementById("box2").value = ""
    window.alert(res.data)
   
  })
  
  }
  }
 

  render() {
      let func;
      if(this.state.cond == "button1")
      {
          func =
           this.state.vacancies.map(vacancy =>
            <div className="card eventCard">
             <div className="card-body">
             <h5 className="card-title">{["Status:" + vacancy.status + "   " + "Description:" + vacancy.description + "   " ]}<br/><button type="submit"  onClick={() => this.handlerender()} >Click here to change this vacancy's status</button></h5>
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
        else{
          if(this.state.cond == "button3"){
            func=  <div className="card eventCard">
            <div className="card-body">
            <label>
            <p>User Type: </p>
                <input id = "box1" type="text" value1={this.state.usertype} onChange={(event) =>this.handleChange(event.target.value)} />
             <p>New Vacancy Status: </p>
                 <input id = "box2" type="text" value2={this.state.vacstatus} onChange={(event) =>this.handleChange1(event.target.value)} />
                <label>
                <button type="submit"  onClick={() => this.increment2()} className=" btn-primary" >UPDATE STATUS </button>
                </label>
            </label>
            <br/>
            
            </div>
            </div>
          }
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