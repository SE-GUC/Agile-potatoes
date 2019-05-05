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
            name: "",
            boardMemberName: "",
            boardMemberEmail: "",
            boardMembers: [],
            cond: ""
        }
    }
    handleChange = async () => {

        if (document.getElementById("d2")) {
            await this.setState({
                oldPass: String(document.getElementById("d2").value),
                newPass: String(document.getElementById("d3").value),
                confPass: String(document.getElementById("d4").value),
            });
        }
        else {
            if (document.getElementById("d5")) {

                await this.setState({
                    name: String(document.getElementById("d5").value),
                });
                console.log("NAME " + this.state.name)
            }
            else {

                if (document.getElementById("d6") && document.getElementById("d7")) {
                    await this.setState({
                        boardMemberName: String(document.getElementById("d6").value),
                        boardMemberEmail: String(document.getElementById("d7").value),

                    });
                    console.log("ENTERED " + this.state.boardMemberName)
                    console.log("ENTERED " + this.state.boardMemberEmail)
                }



            }
        }
    }

    handleButtonChange1 = () => {
        this.setState({
            cond: "button1",

        });
    }


    handleButtonChange3 = () => {
        this.setState({
            cond: "button3",

        });
    }






    handleChangeBM = async () => {
        let tokenData = JSON.parse(localStorage.getItem('token')).data;
        let userid = tokenData.userData.userId;
        await this.setState({
            boardMembers: this.state.boardMembers.concat({ name: this.state.boardMemberName, email: this.state.boardMemberEmail })
        });


        console.log(this.state.boardMembers)
        try {
            let oldBM = await axios.get(`http://localhost:3001/api/profile/${userid}`, { headers: { Authorization: 'Bearer ' + tokenData.authData } });
            await this.setState({
                boardMembers: oldBM.data.boardMembers.concat(this.state.boardMembers)
            });
            console.log(this.state.boardMembers)
            window.alert("Added a board member. When your done adding all board members please click on the UPDATE button.")

        }
        catch (err) {

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
        if (this.state.oldPass.length > 0) {
            console.log("ENTERED")
            let userid = tokenData.userData.userId;
            let old = await axios.get(`http://localhost:3001/api/profile/${userid}/GetPassword`, { headers: { Authorization: 'Bearer ' + tokenData.authData } });
            let flag = await bcrypt.compare(this.state.oldPass, old.data, function (err, flag) {
                if (flag) {
                    if (newPasss == confirmpass) {
                        if (newPasss != oldpass) {

                            let hashedPassword = new Promise((resolve, reject) => {
                                bcrypt.hash(newPasss, 10, async function (err, hash) {
                                    if (err) reject(err)
                                    else {
                                        try {

                                            let newPassword = await axios.put(`http://localhost:3001/api/profile/${userid}`, {
                                                'userType': 'Partner',
                                                'userId': +userid + '',
                                                'password': '' + hash,
                                                'oldPassword': old.data + ''
                                            }, { headers: { Authorization: 'Bearer ' + tokenData.authData } })
                                            window.alert(newPassword.data)
                                        }
                                        catch (err) {
                                            console.log("ERROR" + err.message)
                                        }
                                    }
                                });
                            })


                            document.getElementById("d2").value = null
                            document.getElementById("d3").value = null
                            document.getElementById("d4").value = null

                        }
                        else {
                            document.getElementById("d2").value = null
                            document.getElementById("d3").value = null
                            document.getElementById("d4").value = null
                            window.alert("The new password is the same as the old password.Please enter a different new password.")
                        }
                    }
                    else {
                        document.getElementById("d2").value = null
                        document.getElementById("d3").value = null
                        document.getElementById("d4").value = null
                        window.alert("The confirmed password did not match the new password.Please re-confirm your password!")
                    }

                }
                else {
                    document.getElementById("d2").value = null
                    document.getElementById("d3").value = null
                    document.getElementById("d4").value = null
                    window.alert("The old password is incorrect.Please re-enter your old password!")
                }


            });
        }
        else {
            console.log("BOARD ZEFT " + this.state.boardMembers.length)
            if (this.state.boardMembers.length > 0) {
                let userid = tokenData.userData.userId;

                try {
                    let newprof = await axios.put(`http://localhost:3001/api/profile/${userid}`, {
                        'userType': 'Partner',
                        'userId': userid + '',
                        'boardMembers': this.state.boardMembers
                    }, { headers: { Authorization: 'Bearer ' + tokenData.authData } })
                    window.alert(newprof.data);
                }
                catch (err) {
                    console.log("ERROR" + err.message)
                }
                document.getElementById("d6").value = null
                document.getElementById("d7").value = null
            }

        }



    }
    render() {
        let func;
        if (this.state.cond == "button1") {
            func = <div className="card parprofileCard">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Old Password:<br />
                            <input id="d2" type="password" name="oldPass" onChange={this.handleChange} /><br />
                            New Password:<br />
                            <input id="d3" type="password" name="newPass" onChange={this.handleChange} /><br />
                            Confirm New Password:<br />
                            <input id="d4" type="password" name="confPass" onChange={this.handleChange} /><br />
                        </label>
                        <br />
                        <label>
                            <button onClick={this.update} type="submit" className="btn btn-primary">UPDATE</button><br />
                        </label>
                    </form>
                </div>
            </div>
        }


        if (this.state.cond == "button3") {
            func =
                <div className="card parprofileCard">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Board Member Name:<br />
                                <input id="d6" type="text" name="BMname" onChange={this.handleChange} /><br />
                                Board Member Email:<br />
                                <input id="d7" type="text" name="BMemail" onChange={this.handleChange} />
                            </label>
                            <button onClick={this.handleChangeBM} type="submit" className="btn btn-primary">ADD BOARD MEMBER</button><br />
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
                            <button onClick={this.handleButtonChange3} type="submit" className="btn btn-primary">UPDATE BOARD MEMBERS </button><br />


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