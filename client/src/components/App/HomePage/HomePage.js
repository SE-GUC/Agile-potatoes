import React,{Component} from 'react'
import './HomePage.css' 
import {NavLink} from 'react-router-dom'
import TypeEffect from './TypeEffect/TypeEffect'
import Axios from 'axios';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesLoaded : 0
    }
  }
  componentDidUpdate(){
    if(this.state.imagesLoaded == 6){
      console.log(this.refs.spinner.style);
      this.refs.spinner.style.display= "none"
    }
  }

  handleImageLoaded(){
    let currCount = this.state.imagesLoaded;
    this.setState({imagesLoaded:++currCount})
  }
  handleImageErrored(){
    let currCount = this.state.imagesLoaded;
    this.setState({imagesLoaded:++currCount})
  }

  sendMsg(e){
    e.preventDefault();
    let name = this.refs.cname.value;
    let email = this.refs.cemail.value;
    let msg = this.refs.cmessage.value;
    if(name && email && msg){
      Axios.post(`http://localhost:3001/api/profile/contact`, {
        email: email,
        msg: msg,
        name: name
      });
    }
  }
  render(){
  return (
//     this.state.imagesLoaded != 6? 
//  : 
    <div>
    <div ref="spinner" className="spinnerContainer">
      <div className="spinner"></div>
    </div>          
    <section id="wall" className="container-fluid">
      <img className="figure-img img-fluid" alt="" src={process.env.PUBLIC_URL + '/cam-coffee.jpg'}></img>
      <div className="transparent-layer row">
        <div className="bigTextContainer">
          {/* <TypeEffect strings={['Create Your Future']}/> */}
          {/* <TypeEffect strings={['small actions ^600 =>  MAJOR IMPACTS !']}/> */}
          <TypeEffect strings={['small actions','MAJOR IMPACTS']}/>

        </div>
      </div>
    </section>

    <section id="services">
         <div><h1>OUR SERVICES</h1></div>
          <div className="container-fluid">              
              <div className='row'>
                <div className="col-sm-4 card">
                    <img onLoad={this.handleImageLoaded.bind(this)} onError={this.handleImageErrored.bind(this)} className="img-responsive" alt="freelancer doing task" src={process.env.PUBLIC_URL + '/task.jpg'}/>
                    <div className="innerCard">
                        <h2>TASKS</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
                        <div className="offset-sm-3 col-sm-6 offset-sm-3 view"><NavLink to="/"><h3>VIEW MORE</h3></NavLink></div>
                    </div>
                </div>
                <div className="col-sm-4 card">
                    <img onLoad={this.handleImageLoaded.bind(this)} onError={this.handleImageErrored.bind(this)} className="img-responsive" alt="people working" src={process.env.PUBLIC_URL + '/job.jpg'}/>
                    <div className="innerCard">
                        <h2>VACANCIES</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
                        <div className="offset-sm-3 col-sm-6 offset-sm-3 view"><NavLink to="/"><h3>VIEW MORE</h3></NavLink></div>
                    </div>
                </div>
                <div className="col-sm-4 card">
                    <img onLoad={this.handleImageLoaded.bind(this)} onError={this.handleImageErrored.bind(this)} className="img-responsive" alt="compass pointing at the word career" src={process.env.PUBLIC_URL + '/compass.jpg'}/>
                    <div className="innerCard">
                        <h2>ROAD MAP</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
                        <div className="offset-sm-3 col-sm-6 offset-sm-3 view"><NavLink to="/"><h3>VIEW MORE</h3></NavLink></div>
                    </div>
                </div>
              </div>
              <div className='row'>
                <div className="col-sm-4 card">
                    <img onLoad={this.handleImageLoaded.bind(this)} onError={this.handleImageErrored.bind(this)} className="img-responsive" alt="man reviewing other man's work" src={process.env.PUBLIC_URL + '/coach.jpg'}/>
                    <div className="innerCard">
                        <h2>LIFE COACHING</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
                        <div className="offset-sm-3 col-sm-6 offset-sm-3 view"><NavLink to="/"><h3>VIEW MORE</h3></NavLink></div>
                    </div>
                </div>
                <div className="col-sm-4 card">
                    <img onLoad={this.handleImageLoaded.bind(this)} onError={this.handleImageErrored.bind(this)} className="img-responsive" alt="tickets" src={process.env.PUBLIC_URL + '/ticket.jpg'}/>
                    <div className="innerCard">
                        <h2>LIVE EVENTS</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
                        <div className="offset-sm-3 col-sm-6 offset-sm-3 view"><NavLink to="/events"><h3>VIEW MORE</h3></NavLink></div>
                    </div>
                </div>
                <div className="col-sm-4 card">
                    <img onLoad={this.handleImageLoaded.bind(this)} onError={this.handleImageErrored.bind(this)} className="img-responsive" alt="man signs on a certificate" src={process.env.PUBLIC_URL + '/cert.jpg'}/>
                    <div className="innerCard">
                        <h2>CERTIFICATIONS</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
                        <div className="offset-sm-3 col-sm-6 offset-sm-3 view"><NavLink to="/"><h3>VIEW MORE</h3></NavLink></div>
                    </div>
                </div>
              </div>    
            </div>
    </section>

    <section id="vision">
      <img className="figure-img img-fluid" alt="" src={process.env.PUBLIC_URL + '/lamp.jpg'}></img>
      <div className="transparent-layer row">
        <div className="bigTextContainer">

          <h1>OUR VISION</h1>
            <p>Our vision is to give a chance to those who wish to contribute but are not given a chance, to empower and teach those who want to better their futures and finally to solve the mess of the freelancing world.
            Hence, the idea of our platform could be viewed as a way to change how work gets done.</p>
        </div>
      </div> 
    </section>

    <section id="contacts">
      <div><h1>CONTACT US</h1></div>
      <div className="row panels">
        <div className="col-sm-6 test panel" >
          <div className="final formy shadow-lg p-3 mb-5 bg-white rounded" >
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input className="form-control" ref="cname" type="text" id="name" name="Name" placeholder="Your Name"/><br/>
                  <label htmlFor="email">Email</label>
                  <input className="form-control" ref="cemail" type="email" id="email" name="Email" placeholder="Your Email"/><br/>
                  <label htmlFor="msg">Message</label>
                  <textarea rows="4" className="form-control" ref="cmessage" type="text" id="msg" name="Message" placeholder="Message"></textarea><br/>
                  <input className="btn btn-lg btn-dark button" type="submit" value="Send" onClick={this.sendMsg.bind(this)}/>
                </div>
              </form>
          </div>
        </div>
        <div className="col-sm-6 panel " >
          <div className="final shadow-lg p-3 mb-5 bg-white rounded">
              <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13822.37903452482!2d31.452808500183107!3d29.99107412713531!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6e7220116094726d!2z2KfZhNis2KfZhdi52Kkg2KfZhNij2YTZhdin2YbZitipINio2KfZhNmC2KfZh9ix2Kk!5e0!3m2!1sar!2seg!4v1502165300889" width="100%" height="100%" frameBorder="0" style={{border:"0"}} allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
  }
}
export default HomePage
