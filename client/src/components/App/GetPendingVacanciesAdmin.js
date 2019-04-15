/* const React = require('react');
const axios = require('axios');


class GetPendingVacanciesAdmin extends React.Component {
    constructor(props) {
            super(props);
        this.state = {
            vacanciesList: [{ name: 'Incorit', status: 'Open', description: 'testingParty', duration: '7 years', city: 'testCity' },
                { name: 'TeraByte', status: 'Open', description: 'testingParty', duration: '7 years', city: 'testCity' }
                ,
            ],
            res: '',
            flag: false,
         
        };
        this.gettingVacancies = this.gettingVacancies.bind(this);
    }
    async gettingVacancies () {
        await axios.get('http://localhost:3001/api/vacancy/PendingVacanciesAdmin', { userType: 'Admin' }).then(response => {
            console.log(response);
            this.setState({ flag: true })
            this.setState({
             vacanciesList: response.data,
             res: this.state.vacanciesList.isComplete + "",
             flag: true 
     }
     )
        }
        )
        //return (this.state.vacanciesList.map(vacancy => <ul> <li> {vacancy.name}  </li> </ul>))
    }
      removeItem = () => {
      let  vac = document.getElementById("5").value;
   //this.state.vacanciesList.map(vacancy => if(vacancy.name===vac) )
       this.state.vacanciesList.splice(vac, 1) 
        this.setState({ vacanciesList: this.state.vacanciesList })
     //  this.state.vacanciesList.filter(vacancy => vacancy.name !== vac.name)
       /* this.state.vacanciesList.forEach(function (vacancy) {
            if (vacancy.name !== vac) {
                this.state.vacanciesList.push(vacancy);
            } 
        });*/
      //  console.log(this.state.vacancy.List)
//    };


  // async handleDelete(vacancy){
   //   let  vac = document.getElementById("5").value;
      console.log(vac)
     /* this.setState(prevState => ({
          vacanciesList: prevState.vacanciesList.filter(el => el.name !== vac )
      }));*/
    //  await axios.delete( `http://localhost:3000/api/vacancy/{vacancy._id}/deleteVacancy`, {
                
    //    }
    //  )
 // }

 /* deleteAll = () => {
      this.setState({vacanciesList: []})
      this.render(); 
  }
    async deleteVac() {
       // this.state.deleted = document.getElementById("vacancy").value;
     /*   await axios.delete( `http://localhost:3000/api/vacancy/1/deleteVacancy`, {
                
        }
        )*/
     //      console.log("hii")
       //  var vacancy1 = document.getElementById("5").value;
         
    //    this.gettingVacancies(); 
        //document.getElementById("2").addEventListener("click", this.deleteVac(vacancy)) 
   // }

   // nothing() {  

  //  }

   // render() {  
   //   return (
           // <div>
           //     <h2 {...this.gettingVacancies()}> Vacancies</h2>
           //     <button id ="1" onClick={this.deleteAll} > Delete All </button>
                          
          //      <ul>
       //             {this.state.flag === false ?(this.state.vacanciesList.map(vacancy =>   <li id="5"> {vacancy.name} <button id="2" onClick={() => this.handleDelete(vacancy)}>  Delete </button> </li>) ): this.nothing()}
        //        </ul>   
     //       </div>

   //     )
 //   } 
//export default GetPendingVacanciesAdmin 

const React = require('react');
const axios = require('axios');


class GetPendingVacanciesAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vacanciesList: [{ name: 'Incorit', status: 'Open', description: 'testingParty', duration: '7 years', city: 'testCity' },
            { name: 'TeraByte', status: 'Open', description: 'testingParty', duration: '7 years', city: 'testCity' }
                ,
            ],
            res: '',
            flag: false,

        };
        this.gettingVacancies = this.gettingVacancies.bind(this);
    }
    async gettingVacancies() {
        await axios.get('http://localhost:3001/api/vacancy/PendingVacanciesAdmin', { userType: 'Admin' }).then(response => {
            console.log(response);
            this.setState({ flag: true })
            this.setState({
                vacanciesList: response.data,
                res: this.state.vacanciesList.isComplete + "",
                flag: true
            }
            )
        }
        )
        //return (this.state.vacanciesList.map(vacancy => <ul> <li> {vacancy.name}  </li> </ul>))
    }
    removeItem = () => {
        let vac = document.getElementById("5").value;
        //this.state.vacanciesList.map(vacancy => if(vacancy.name===vac) )
        this.state.vacanciesList.splice(vac, 1)
        this.setState({ vacanciesList: this.state.vacanciesList })
        //  this.state.vacanciesList.filter(vacancy => vacancy.name !== vac.name)
        /* this.state.vacanciesList.forEach(function (vacancy) {
             if (vacancy.name !== vac) {
                 this.state.vacanciesList.push(vacancy);
             } 
         });*/
        //  console.log(this.state.vacancy.List)
    };


    async handleDelete(vacancy) {
        let vac = document.getElementById("5").value;
        console.log(vac)
        /* this.setState(prevState => ({
             vacanciesList: prevState.vacanciesList.filter(el => el.name !== vac )
         }));*/
        await axios.delete(`http://localhost:3000/api/vacancy/{vacancy._id}/deleteVacancy`, {

        }
        )
    }

    deleteAll = () => {
        this.setState({ vacanciesList: [] })
        this.render();
    }
    async deleteVac() {
        // this.state.deleted = document.getElementById("vacancy").value;
        /*   await axios.delete( `http://localhost:3000/api/vacancy/1/deleteVacancy`, {
                   
           }
           )*/
        console.log("hii")
        //  var vacancy1 = document.getElementById("5").value;

        this.gettingVacancies();
        //document.getElementById("2").addEventListener("click", this.deleteVac(vacancy)) 
    }

    nothing() {

    }

    render() {
        return (
            <div>
                <h2 {...this.gettingVacancies()}> Vacancies</h2>
                <button id="1" onClick={this.deleteAll} > Delete All </button>

                <ul>
                    {this.state.flag === false ? (this.state.vacanciesList.map(vacancy => <li id="5"> {vacancy.name} <button id="2" onClick={() => this.handleDelete(vacancy)}>  Delete </button> </li>)) : this.nothing()}
                </ul>
            </div>

        )
    }
}
export default GetPendingVacanciesAdmin

