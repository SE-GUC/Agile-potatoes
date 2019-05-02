import React, { Component } from 'react'
import axios from 'axios';
import '../PartnerProfile/PartnerProfile.css'
class CreatePartnerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confrimPass: '',
            name: '',
            email: '',
            workfield: '',
            toggle: 0,
        }
    }

    handletoggle = () => {
        this.setState({ toggle: 1 })
    }
    onChange = async () => {
        await this.setState({
            username: String(document.getElementById("d1").value),
            password: String(document.getElementById("d2").value),
            confrimPass: String(document.getElementById("d3").value),
            name: String(document.getElementById("d4").value),
            email: String(document.getElementById("d5").value),
            workfield: String(document.getElementById("d6").value)
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

    }

    signUpPar = async () => {
        try {
            let res = await axios.post('http://localhost:3001/api/profile/create', {
                'userType': 'Partner',
                'username': this.state.username + '',
                'password': this.state.password + '',
                'name': this.state.name + '',
                'email': this.state.email + '',
                'workfield': this.state.workfield + '',
            })
            window.alert("Your form has been submitted successfully!")
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    sub = () => {
        if (this.state.password != this.state.confrimPass) {
            window.alert("Your confirmed password didn't match.Please re-confirm your password!")
        }
        if (!this.state.email.match(/.+@.+/)) {
            window.alert("Please enter a valid email!")
        }
    }
    render() {
        let func;
        if (this.state.toggle == 1) {
            func =
                <div className="card parprofileCard">
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            Username:<br />
                            <input type="text" id="d1" name="username" className="mytext" onChange={this.onChange} /><br />
                            Password:<br />
                            <input type="text" id="d2" name="password" className="mytext" onChange={this.onChange} /><br />
                            Confrim Password:<br />
                            <input type="text" id="d3" name="confirmpassword" className="mytext" onChange={this.onChange} /><br />
                            Full Name:<br />
                            <input type="text" id="d4" name="name" className="mytext" onChange={this.onChange} /><br />
                            Email:<br />
                            <input type="text" id="d5" name="email" className="mytext" onChange={this.onChange} /><br />
                            Workfield:<br />
                            <input type="text" id="d6" name="workfield" className="mytext" onChange={this.onChange} /><br />
                        </form>
                        <button onClick={this.sub} type="submit" className=" btn-primary">SUBMIT</button>
                    </div>
                </div>
        }
        return (
            <div className='card-group'>
                <div className='container-fluid'>
                    <div className='row'>

                        <div className="list-group">
                            <br />
                            <br />
                            <br />
                            <br />
                            <button onClick={this.handletoggle} type="submit" className=" btn-primary">ADD PERSONAL DETAILS</button>

                        </div>
                        {func}
                    </div>
                    <button onClick={this.signUpPar} type="submit" className=" btn-primary">SIGN UP</button>
                </div>
            </div>
        )
    }
}
export default CreatePartnerForm; 