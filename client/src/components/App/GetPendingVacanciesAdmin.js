import react ,{component} from 'react ' ;
import axios from 'axios' ;
class GetPendingVacanciesAdmin extends Component{
constructor(props){
super(props);
this.state ={
vacanciesList :[],
res : '',
};
}
gettingVacancies(){
axios.get('http://localhost:3001/api/vacancy/PendingVacanciesAdmin').then(response =>{
console.log(response) ;
this.setState ({vacanciesList:response.data,
      res :this.state.vacanciesList.isComplete +""})
}
)
}
render(){
return(
<div>
<h1> list of Vacancies</h1>
<button onClick = {() => this.gettingVacancies} > GET VACANCIES </button>
<ul>
{this.state.vacanciesList.map(vacancy => <li> {vacancy} </li>}
</ul>
<h4> {this.state.res} </h4> 
</div>
)
}

}