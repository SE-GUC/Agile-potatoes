import React, { Component } from "react";
import axios from "axios";
import "../MemberProfile/MemberProfile.css";
class CreateMemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPass: "",
      username: "",
      address: "",
      skill: "",
      skills: [""],
      masterclass: "",
      masterclasses: [],
      certificate: "",
      certificates: [],
      interest: "",
      interests: [],
      cond: ""
    };
  }

  inputChangex = async e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChange = async () => {
    console.log("fffffff");
    if (document.getElementById("d1")) {
      await this.setState({
        fname: String(document.getElementById("d1").value)
      });
    }
    if (document.getElementById("d2")) {
      await this.setState({
        lname: String(document.getElementById("d2").value)
      });
    }
    if (document.getElementById("d3")) {
      await this.setState({
        email: String(document.getElementById("d3").value)
      });
    }
    if (document.getElementById("d4") && document.getElementById("d5")) {
      await this.setState({
        password: String(document.getElementById("d4").value),
        confirmPass: String(document.getElementById("d5").value)
      });
    }
    if (document.getElementById("d6")) {
      await this.setState({
        username: String(document.getElementById("d6").value)
      });
    }
    if (document.getElementById("d7")) {
      await this.setState({
        address: String(document.getElementById("d7").value)
      });
    }
    if (document.getElementById("d8")) {
      await this.setState({
        skill: String(document.getElementById("d8").value)
      });
    }
    if (document.getElementById("d9")) {
      await this.setState({
        interest: String(document.getElementById("d9").value)
      });
    }
    if (document.getElementById("d10")) {
      await this.setState({
        masterclass: String(document.getElementById("d10").value)
      });
    }
    if (document.getElementById("d11")) {
      await this.setState({
        certificate: String(document.getElementById("d11").value)
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
  };
  handleChangeSkill = async () => {
    this.refs.skillInput.value = "";
    if (this.state.skills[0] == "")
      this.setState({
        ...this.state,
        skills: [this.state.skill],
        skill: ""
      });
    else
      this.setState({
        ...this.state,
        skills: [...this.state.skills, this.state.skill],
        skill: ""
      });
  };

  handleChangeInterest = async () => {
    this.refs.interestInput.value = "";
    if (this.state.interests[0] == "")
      this.setState({
        ...this.state,
        interests: [this.state.interest],
        interest: ""
      });
    else
      this.setState({
        ...this.state,
        interests: [...this.state.interests, this.state.interest],
        interest: ""
      });
  };
  handleChangeMasterclass = async () => {
      console.log(this.state)
    this.refs.masterclassInput.value = "";
    if (this.state.masterclasses[0] == "")
      this.setState({
        ...this.state,
        masterclasses: [this.state.masterclass],
        masterclass: ""
      });
    else
      this.setState({
        ...this.state,
        masterclasses: [...this.state.masterclasses, this.state.masterclass],
        masterclass: ""
      });
  };
  handleChangeCertificate = async e => {
    this.refs.certificateInput.value = "";

    if (this.state.certificates[0] == "")
      this.setState({
        ...this.state,
        certificates: [this.state.certificate],
        certificate: ""
      });
    else
      this.setState({
        ...this.state,
        certificates: [...this.state.certificates, this.state.certificate],
        certificate: ""
      });
  };
  handletoggle = () => {
    this.setState({ cond: "button1" });
  };
  handletoggle1 = () => {
    this.setState({ cond: "button2" });
  };
  handletoggle2 = () => {
    this.setState({ cond: "button3" });
  };
  handletoggle3 = () => {
    this.setState({ cond: "button4" });
  };
  handletoggle4 = () => {
    this.setState({ cond: "button5" });
  };

  signUpMem = async () => {
    try {
      let res = await axios.post("http://localhost:3001/api/profile/create", {
        userType: "Member",
        username: this.state.username + "",
        password: this.state.password + "",
        fname: this.state.fname + "",
        lname: this.state.lname + "",
        address: this.state.address + "",
        email: this.state.email + "",
        skills: this.state.skills,
        masterclasses: this.state.masterclasses,
        certificates: this.state.certificates,
        interests: this.state.interests
      });
      window.alert("Your form has been submitted successfully!");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    if (document.getElementById("d1")) {
      document.getElementById("d1").value = "";
    }
    if (document.getElementById("d2")) {
      document.getElementById("d2").value = "";
    }
    if (document.getElementById("d3")) {
      document.getElementById("d3").value = "";
    }
    if (document.getElementById("d4")) {
      document.getElementById("d4").value = "";
    }
    if (document.getElementById("d5")) {
      document.getElementById("d5").value = "";
    }
    if (document.getElementById("d6")) {
      document.getElementById("d6").value = "";
    }
    if (document.getElementById("d7")) {
      document.getElementById("d7").value = "";
    }
  };
  Submit = async () => {
    if (document.getElementById("d4") && document.getElementById("d5")) {
      if (this.state.password != this.state.confirmPass) {
        window.alert(
          "Your confirmed password didn't match.Please re-confirm your password!"
        );
      }
    }

    if (document.getElementById("d3")) {
      if (!this.state.email.match(/.+@.+/)) {
        window.alert("Please enter a valid email!");
      }
    }
  };
  render() {
    let func;
    if (this.state.cond == "button1") {
      func = (
        <div className="card push-down memprofileCard">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              First Name:
              <br />
              <input
                type="text"
                id="d1"
                className="mytext"
                name="fname"
                onChange={this.handleChange}
              />
              <br />
              Last Name:
              <br />
              <input
                type="text"
                id="d2"
                className="mytext"
                name="lname"
                onChange={this.handleChange}
              />
              <br />
              Email:
              <br />
              <input
                type="text"
                id="d3"
                className="mytext"
                name="email"
                onChange={this.handleChange}
              />
              <br />
              Password:
              <br />
              <input
                type="password"
                id="d4"
                className="mytext"
                name="password"
                onChange={this.handleChange}
              />
              <br />
              Confrim Password:
              <br />
              <input
                type="password"
                id="d5"
                className="mytext"
                name="confirmPass"
                onChange={this.handleChange}
              />
              <br />
              Username:
              <br />
              <input
                type="text"
                id="d6"
                className="mytext"
                name="username"
                onChange={this.handleChange}
              />
              <br />
              Address:
              <br />
              <input
                type="text"
                id="d7"
                className="mytext"
                name="address"
                onChange={this.handleChange}
              />
              <button
                onClick={this.Submit}
                type="submit"
                className="btn-primary"
              >
                CHECK
              </button>
            </form>
          </div>
        </div>
      );
    }
    if (this.state.cond == "button2") {
      func = (
        <div className="card push-down memprofileCard">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <label>
                Skills:
                <br />
                {this.state.skills.map(skill => {
                  
                  return <div>{<p>{skill}</p>}</div>;
                })}
                <input
                  ref="skillInput"
                  type="text"
                  className="mytext"
                  name="skill"
                  onChange={this.inputChangex}
                />
              </label>
              <br />
              <label>
                <button
                  onClick={() => this.handleChangeSkill()}
                  type="submit"
                  className="btn-primary"
                >
                  ADD SKILL
                </button>
                <br />
              </label>
              <br />
            </form>
          </div>
        </div>
      );
    }

    if (this.state.cond == "button3") {
      func = (
        <div className="card push-down memprofileCard">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <label>
                Interest:
                <br />
                {this.state.interests.map(interest => {
                  console.log(interest);
                  return <div>{<p>{interest}</p>}</div>;
                })}
                <input
                  ref="interestInput"
                  id="d9"
                  type="text"
                  className="mytext"
                  name="interest"
                  onChange={this.inputChangex}
                />
                <br />
              </label>
              <br />
              <label>
                <button
                  onClick={this.handleChangeInterest}
                  type="submit"
                  className=" btn-primary"
                >
                  ADD INTEREST
                </button>
                <br />
              </label>
              <br />
            </form>
          </div>
        </div>
      );
    }
    if (this.state.cond == "button4") {
      func = (
        <div className="card push-down memprofileCard">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <label>
                Masterclasses:
                <br />
                {this.state.masterclasses.map(masterclass => {
                  console.log(masterclass);
                  return <div>{<p>{masterclass}</p>}</div>;
                })}
                <input
                  ref="masterclassInput"
                  id="d10"
                  type="text"
                  className="mytext"
                  name="masterclass"
                  onChange={this.inputChangex}
                />
                <br />
              </label>
              <br />
              <label>
                <button
                  onClick={this.handleChangeMasterclass}
                  type="submit"
                  className=" btn-primary"
                >
                  ADD MASTERCLASS
                </button>
                <br />
              </label>
              <br />
            </form>
          </div>
        </div>
      );
    }

    if (this.state.cond == "button5") {
      func = (
        <div className="card push-down memprofileCard">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <label>
                Certificates:
                <br />
                {this.state.certificates.map(certificate => {
                  console.log(certificate);
                  return <div>{<p>{certificate}</p>}</div>;
                })}
                <input
                  ref="certificateInput"
                  id="d11"
                  type="text"
                  className="mytext"
                  name="certificate"
                  onChange={this.inputChangex}
                />
                <br />
              </label>
              <br />
              <label>
                <button
                  onClick={this.handleChangeCertificate}
                  type="submit"
                  className="btn-primary"
                >
                  ADD CERTIFICATE
                </button>
                <br />
              </label>
              <br />
            </form>
          </div>
        </div>
      );
    }
    return (
      <div className="card-group">
        <div className="container-fluid">
          <div className="row">
            <div className="list-group">
              <br />
              <br />
              <br />
              <br />

              <button
                onClick={this.handletoggle}
                type="submit"
                className="btn-primary"
              >
                ADD PERSONAL DETAILS
              </button>
              <br />

              <button
                onClick={this.handletoggle1}
                type="submit"
                className="btn-primary"
              >
                ADD SKILL
              </button>
              <br />
              <button
                onClick={this.handletoggle2}
                type="submit"
                className="btn-primary"
              >
                ADD INTEREST
              </button>
              <br />
              <button
                onClick={this.handletoggle3}
                type="submit"
                className="btn-primary"
              >
                ADD MASTERCLASS
              </button>
              <br />
              <button
                onClick={this.handletoggle4}
                type="submit"
                className="btn-primary"
              >
                ADD CERTIFICATE
              </button>
            </div>
            {func}
          </div>
          <button
            onClick={this.signUpMem}
            type="submit"
            className="btn-primary"
          >
            SIGN UP
          </button>
        </div>
      </div>
    );
  }
}
export default CreateMemberForm;
