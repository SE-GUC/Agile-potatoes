const React = require('react');
const axios = require('axios');


class DeletePendingEvents extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                eventsList: [{ name: 'Technology', status: 'Open', description: 'testingParty', duration: '7 years', city: 'testCity' },
                    { name: 'Astronomy', status: 'Open', description: 'testingParty', duration: '7 years', city: 'testCity' }
                    ,
                ],
                flag:false
            }
    }
   
   
    async gettingEvents () {
        await axios.get('http://localhost:3001/api/event/1/PartnerPendingEvents', { userType: 'Partner' }).then(response => {
            console.log(response);
      
            this.setState({
             eventsList: response.data,
          })
        }
        )
    }
        async handleDelete(event){
          //  console.log(vac)
           /* this.setState(prevState => ({
                vacanciesList: prevState.vacanciesList.filter(el => el.name !== vac )
            }));*/
            await axios.delete( `http://localhost:3000/api/event/{event._id}/deleteEvent`, {
                      
              }
            )
        }
      
        deleteAll = () => {
            this.setState({eventsList: []})
            this.render(); 
        }

    nothing(){
           
    }    
    render(){
        return (
            <div>
                <h2 {...this.gettingEvents()}> Events</h2>
                <button id ="1" onClick={this.deleteAll} > Delete All </button>
                          
                <ul>
                    {this.state.flag === false ?(this.state.eventsList.map(event =>   <li id="5"> {event.name} <button id="2" onClick={() => this.handleDelete(event)}>  Delete </button> </li>) ): this.nothing()}
                </ul>   
            </div>

        )
    }

}    

export default DeletePendingEvents;