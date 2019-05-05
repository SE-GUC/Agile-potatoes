import React, { Component } from 'react'
import axios from 'axios'
const bcrypt = require('bcryptjs');
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPass: "",
            newPass: "",
            confPass: "",
            fname: "",
            lname: "",
            address: "",
            skill: "",
            skillsList: [],
            interest: "",
            interestsList: [],
            cond: ""
        }
    }
    handleChange = async () => {
        if (document.getElementById("c2")) {
            await this.setState({
                oldPass: String(document.getElementById("c2").value),
                newPass: String(document.getElementById("c3").value),
                confPass: String(document.getElementById("c4").value),

            });
        }
        else {
            if (document.getElementById("c5")) {
                await this.setState({
                    fname: String(document.getElementById("c5").value),

                });
            }
            else {
                if (document.getElementById("c6")) {
                    await this.setState({
                        lname: String(document.getElementById("c6").value),

                    });
                }
                else {
                    if (document.getElementById("c7")) {
                        await this.setState({
                            address: String(document.getElementById("c7").value),

                        });
                    }
                    else {
                        if (document.getElementById("c8")) {
                            await this.setState({
                                skill: String(document.getElementById("c8").value),

                            });
                        }
                        else {
                            if (document.getElementById("c9")) {
                                await this.setState({
                                    interest: String(document.getElementById("c9").value),

                                });
                            }
                        }
                    }
                }
            }
        }
    }
    handleButtonChange1 = () => {
        this.setState({
            cond: "button1",

        });
    }
    handleButtonChange2 = () => {
        this.setState({
            cond: "button2",

        });
    }
    handleButtonChange3 = () => {
        this.setState({
            cond: "button3",

        });
    }
    handleButtonChange4 = () => {
        this.setState({
            cond: "button4",

        });
    }
    handleButtonChange5 = () => {
        this.setState({
            cond: "button5",

        });
    }
    handleButtonChange6 = () => {
        this.setState({
            cond: "button6",

        });
    }




    handleChangeSkill = async () => {
        let tokenData = JSON.parse(localStorage.getItem('token')).data;
        let userid = tokenData.userData.userId;
        await this.setState({
            skillsList: this.state.skillsList.concat(this.state.skill)
        });
        console.log(this.state.skill)
        console.log(this.state.skillsList)
        try {
            let oldSkills = await axios.get(`http://localhost:3001/api/profile/${userid}`, { headers: { Authorization: 'Bearer ' + tokenData.authData } });
            await this.setState({
                skillsList: oldSkills.data.skills.concat(this.state.skillsList)
            })
            window.alert("Added a skill. When you are done adding your skill please click the UPDATE button!")


        } catch (err) {

        }

    }

    handleChangeInterest = async () => {
        let tokenData = JSON.parse(localStorage.getItem('token')).data;
        let userid = tokenData.userData.userId;
        await this.setState({
            interestsList: this.state.interestsList.concat(this.state.interest)
        });

        console.log(this.state.interest)
        console.log(this.state.interestsList)
        try {
            let oldInterests = await axios.get(`http://localhost:3001/api/profile/${userid}`, { headers: { Authorization: 'Bearer ' + tokenData.authData } });
            await this.setState({
                interestsList: oldInterests.data.interests.concat(this.state.interestsList)
            })
            window.alert("Added an interest. When you are done adding your interestes please click the UPDATE button!")


        } catch (err) {

        }
    }
    handleSubmit = eve => {
        eve.preventDefault();

    }

    update = async () => {
        let tokenData = JSON.parse(localStorage.getItem('token')).data;
        let newPasss = this.state.newPass;
        let oldpass = this.state.oldPass;
        let confirmpass = this.state.confPass;
        if (document.getElementById("c2")) {
            console.log("ENTERED")
            let userid = tokenData.userData.userId;
            let old = await axios.get(`http://localhost:3001/api/profile/${userid}/GetPassword`, { headers: { Authorization: 'Bearer ' + tokenData.authData } });
            let flag = bcrypt.compare(this.state.oldPass, old.data, function (err, flag) {
                if (flag) {
                    if (newPasss == confirmpass) {
                        if (newPasss != oldpass) {

                            let hashedPassword = new Promise((resolve, reject) => {
                                bcrypt.hash(newPasss, 10, async function (err, hash) {
                                    if (err) reject(err)
                                    else {
                                        try {

                                            let newPassword = await axios.put(`http://localhost:3001/api/profile/${userid}/update`, {
                                                'userType': 'Member',
                                                'userId': +userid + '',
                                                'password': '' + hash
                                            }, { headers: { Authorization: 'Bearer ' + tokenData.authData } })
                                            window.alert(newPassword.data)
                                        }
                                        catch (err) {
                                            console.log("ERROR" + err.message)
                                        }
                                    }
                                });
                            })


                            document.getElementById("c2").value = null
                            document.getElementById("c3").value = null
                            document.getElementById("c4").value = null

                        }
                        else {
                            window.alert("The new password is the same as the old password.Please enter a different new password.")
                        }
                    }
                    else {
                        window.alert("The confirmed password did not match the new password.Please re-confirm your password!")
                    }

                }
                else {
                    window.alert("The old password is incorrect.Please re-enter your old password!")
                }
            });

        }

        if (document.getElementById("c5")) {
            let userid = tokenData.userData.userId;
            try {
                let newprof = await axios.put(`http://localhost:3001/api/profile/${userid}/update`, {
                    'userType': 'Member',
                    'userId': userid + '',
                    'fname': '' + this.state.fname
                }, { headers: { Authorization: 'Bearer ' + tokenData.authData } })
                window.alert(newprof.data);
            }
            catch (err) {
                console.log("ERROR" + err)
            }
            document.getElementById("c5").value = null

        }
        if (document.getElementById("c6")) {
            let userid = tokenData.userData.userId;
            try {
                let newprof = await axios.put(`http://localhost:3001/api/profile/${userid}/update`, {
                    'userType': 'Member',
                    'userId': userid + '',
                    'lname': '' + this.state.lname
                }, { headers: { Authorization: 'Bearer ' + tokenData.authData } })
                window.alert(newprof.data);
            }
            catch (err) {
                console.log("ERROR" + err.message)
            }
            document.getElementById("c6").value = null
        }

        if (document.getElementById("c7")) {
            let userid = tokenData.userData.userId;
            try {
                let newprof = await axios.put(`http://localhost:3001/api/profile/${userid}/update`, {
                    'userType': 'Member',
                    'userId': userid + '',
                    'address': '' + this.state.address
                }, { headers: { Authorization: 'Bearer ' + tokenData.authData } })
                window.alert(newprof.data);
            }
            catch (err) {
                console.log("ERROR" + err)
            }
            document.getElementById("c7").value = null
        }
        if (this.state.skillsList.length > 0) {
            let userid = tokenData.userData.userId;


            try {
                let newskill = await axios.put(`http://localhost:3001/api/profile/${userid}/update`, {
                    'userType': 'Member',
                    'userId': userid + '',
                    'skills': this.state.skillsList
                }, { headers: { Authorization: 'Bearer ' + tokenData.authData } })
                window.alert(newskill.data);
            }
            catch (err) {
                console.log("ERROR" + err)
            }
            document.getElementById("c8").value = null
        }
        if (this.state.interestsList.length > 0) {
            let userid = tokenData.userData.userId;
            try {
                let newint = await axios.put(`http://localhost:3001/api/profile/${userid}/update`, {
                    'userType': 'Member',
                    'userId': userid + '',
                    'interests': this.state.interestsList
                }, { headers: { Authorization: 'Bearer ' + tokenData.authData } })
                window.alert(newint.data);
            }
            catch (err) {
                console.log("ERROR" + err)
            }
            document.getElementById("c9").value = null
        }

    }

    render() {
        let func;
        if (this.state.cond == "button1") {
            func = <div className="card profileCard">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Old Password:<br />
                            <input id="c2" type="password" name="oldPass" onChange={this.handleChange} /><br />
                            New Password:<br />
                            <input id="c3" type="password" name="newPass" onChange={this.handleChange} /><br />
                            Confirm New Password:<br />
                            <input id="c4" type="password" name="confPass" onChange={this.handleChange} /><br />
                        </label>
                        <br />
                        <label>
                            <button onClick={this.update} type="submit" className="btn btn-primary">UPDATE</button><br />
                        </label>
                    </form>
                </div>
            </div>
        }
        if (this.state.cond == "button2") {
            func =
                <div className="card profileCard">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                First Name:<br />
                                <input id="c5" type="text" name="fname" onChange={this.handleChange} />
                            </label>
                            <label>
                                <button onClick={this.update} type="submit" className="btn btn-primary">UPDATE</button><br />
                            </label>
                        </form>
                    </div>
                </div>
        }

        if (this.state.cond == "button3") {
            func =
                <div className="card profileCard">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Last Name:<br />
                                <input id="c6" type="text" name="lname" onChange={this.handleChange} />
                            </label>
                            <label>
                                <button onClick={this.update} type="submit" className="btn btn-primary">UPDATE</button><br />
                            </label>
                        </form>
                    </div>
                </div>
        }
        if (this.state.cond == "button4") {
            func =
                <div className="card profileCard">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Address:<br />
                                <input id="c7" type="text" name="address" onChange={this.handleChange} /><br />
                            </label>
                            <label>
                                <button onClick={this.update} type="submit" className="btn btn-primary">UPDATE</button><br />
                            </label>
                        </form>
                    </div>
                </div>
        }
        if (this.state.cond == "button5") {
            func =
                <div className="card profileCard">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Skill:<br />
                                <input id="c8" type="text" name="Skill" onChange={this.handleChange} /><br />
                            </label>
                            <br />
                            <label>
                                <button onClick={this.handleChangeSkill} type="submit" className="btn btn-primary">ADD SKILL</button><br />
                            </label>
                            <br />
                            <label>
                                <button onClick={this.update} type="submit" className="btn btn-primary">UPDATE</button><br />
                            </label>
                        </form>

                    </div>
                </div>
        }

        if (this.state.cond == "button6") {
            func =
                <div className="card profileCard">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Interest:<br />
                                <input id="c9" type="text" name="Interest" onChange={this.handleChange} /><br />
                            </label>
                            <br />
                            <label>
                                <button onClick={this.handleChangeInterest} type="submit" className="btn btn-primary">ADD INTEREST</button><br />
                            </label>
                            <br />
                            <label>
                                <button onClick={this.update} type="submit" className="btn btn-primary">UPDATE</button><br />
                            </label>
                        </form>
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
                            <button onClick={this.handleButtonChange1} type="submit" className="btn btn-primary">UPDATE PASSWORD</button><br />
                            <button onClick={this.handleButtonChange2} type="submit" className="btn btn-primary">UPDATE FIRST NAME</button><br />
                            <button onClick={this.handleButtonChange3} type="submit" className="btn btn-primary">UPDATE LAST NAME</button><br />
                            <button onClick={this.handleButtonChange4} type="submit" className="btn btn-primary">UPDATE ADDRESS</button><br />
                            <button onClick={this.handleButtonChange5} type="submit" className="btn btn-primary">UPDATE SKILLS</button><br />
                            <button onClick={this.handleButtonChange6} type="submit" className="btn btn-primary">UPDATE INTERESTS</button><br />

                        </div>

                        {/* <div className='profile-window col-sm-10'> */}
                        {func}
                        {/* </div>      */}
                    </div>
                </div>
            </div>
        )
    }
}
export default Edit