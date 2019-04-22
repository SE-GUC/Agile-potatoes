import React,{Component} from 'react'
import axios from 'axios'
import Edit from './Edit/Edit'
import SkyLight from "react-skylight";
import './PartnerProfile.css'
class PartnerProfile extends Component{
    constructor(props){
        super(props);
        this.state ={
            userProfile:{
                vacancies:[],
                membershipState:"",
                pastProjects:[],
                events:[],
                username:"",
                password:"",
                name:"",
                email:"",
                workfield:"",
                boardMembers:[],
                notifications:[],
                feedbacks:[],
                toggle:2,
            },
            showFeedback : false 
        }
    }
    handleChangeEdit=()=>
    {
        this.setState({toggle:1})
    }
    handleChangeProf=()=>
    {
        this.setState({toggle:0})

    }
    getProfile = async()=>
        {
            try{
            let profile = await axios.get('http://localhost:3001/api/profile/5ca0e380b487d0228811cf44',{'header':{'userType':'Partner','userId':'5ca0e380b487d0228811cf44'}})
            console.log(profile);
            this.setState({userProfile:{
                vacancies:profile.data.vacancies,
                membershipState:profile.data.membershipState,
                pastProjects:profile.data.pastProjects,
                events:profile.data.events,
                username:profile.data.username,
                password:profile.data.password,
                name:profile.data.name,
                email:profile.data.email,
                workfield:profile.data.workfield,
                boardMembers:profile.data.boardMembers,
                notifications:profile.data.notifications,
                feedbacks:profile.data.feedbacks
            },showFeedback:true
        })
            }
            catch(err)
            {
                console.log("GOT ERROR" + err)
            }
        }
    render() {
        let func;

        if(this.state.toggle == 0)
        {
            func = 
            <div>
                <div className="card profileCard">
                 <div className="card-body">
               
            <ul>
              {"Name: " +this.state.userProfile.name}<br/>
              <br/>
              { "Email: "+this.state.userProfile.email}<br/>
              <br/>
              { "Workfield: " +this.state.userProfile.workfield}<br/>
              <br/>
              { "Membership State: "+this.state.userProfile.membershipState}
             </ul>
             <button onClick = {this.getProfile}className="btn btn-primary">SHOW POFILE</button>
           </div> 
           </div>
           
           </div>
        }
        else{
            if(this.state.toggle == 1)
            {
                func = <Edit/>
            }
        }
        return (
           
             <div className='card-group'>
             <div className = 'container-fluid'>
             <div className = 'row'>
             <div className='side-bar col-sm-2 ' >
             <div className="list-group">
             <h1>PARTNER PROFILE</h1>
                    { this.state.showFeedback == false ? (<button onClick = {this.handleChangeProf} className="list-group-item list-group-item-action">SHOW POFILE</button>
                    ):(
                        <div>
                          <button
                            className="list-group-item list-group-item-action"
                            onClick={() => this.simpleDialog.show()}
                          >
                            Show Feedback
                          </button>
                          <SkyLight
                            hideOnOverlayClicked
                            ref={ref => (this.simpleDialog = ref)}
                            title="Feedbacks"
                          >
                            {this.state.userProfile.feedbacks.map(feedback => {
                              return (
                                <div className="card eventCard">
                                  <div className="card-body">
                                    <h5 className="card-title">{feedback.text}</h5>
                                    <span className="card-text"><small className="text-muted">{new Date(feedback.date).toLocaleDateString()}</small></span>
      
                                  </div>
                                </div>
                              );
                            })}
                          </SkyLight>
                        </div>
                      )}
                     
                     <button onClick = {this.handleChangeEdit} className="list-group-item list-group-item-action">EDIT PROFILE</button>
                 </div>
                 </div>
                
                 {func}
               
                 </div>
                 </div>
                 </div>
          )
    }
}
export default PartnerProfile