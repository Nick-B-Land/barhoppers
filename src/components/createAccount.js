import React, { Component } from "react";
import Footer from "./footer";
import PouchDB from "pouchdb";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      pass1: "",
      pass2: "",
      recovery: 1,
      recInput: "",
      inputsValid: false
    };
  }

  handleEmailInput = e => {
    this.setState({ email: e.target.value });
  };

  handleUsernameInput = e => {
    this.setState({ userName: e.target.value });
  };

  handlePass1Input = e => {
    this.setState({ pass1: e.target.value });
  };

  handlePass2Input = e => {
    this.setState({ pass2: e.target.value });
  };

  handleRecoveryQuestionChange = e => {
    this.setState({ recovery: e.target.value });
  };

  handleRecoveryInput = e => {
    this.setState({ recInput: e.target.value });
  };

  validateInputs = () => {
    let validEmail = false;
    let validUsername = false;
    let validPassword = false;
    let validRecoveryAnswer = false;

    if (this.state.email.length > 2) validEmail = true;

    if (this.state.userName.length >= 2) validUsername = true;

    if (
      this.state.pass1.length > 5 &&
      this.state.pass2.length > 5 &&
      this.state.pass1 === this.state.pass2
    )
      validPassword = true;

    if (this.state.recInput.length >= 2) validRecoveryAnswer = true;

    if (validEmail && validUsername && validPassword && validRecoveryAnswer)
      this.setState({ inputsValid: true });
  };

  createAcc = () => {
    this.validateInputs();
    console.log("inputsValid: " + this.state.inputsValid);
    let inputsRight = this.state.inputsValid;
    let canCreate = true;
    var db = new PouchDB(
      "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudantnosqldb.appdomain.cloud/users"
    );

    db.allDocs({ key: this.state.email })
      .then(function(result) {
        console.log(result);
        console.log(canCreate);
        if (result.rows.length > 0) canCreate = false;
        return canCreate;
      })
      .then(function(result) {
        if (result === false) {
          alert("Account already exists");
        }

        if (inputsRight) alert("Can create account");
      });

    // console.log(canCreate);
    // if (canCreate === false) {
    //   alert("Account already exists");
    // }

    // if (canCreate) {
    //   let acc = {
    //     _id: this.state.email,
    //     Username: this.state.userName,
    //     Password: this.state.Password,
    //     RecoveryQuestion: this.state.recovery,
    //     RecoveryAnswer: this.state.recInput,
    //     Favourites: [],
    //     BarsLiked: [],
    //     ReviewsLiked: [],
    //     ReviewsPosted: []
    //   };
    //   db.put(acc);
    // }
  };
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid pageHeader text-center">
          <h1>Create Account</h1>
        </div>
        <div className="align">
          <h3>Enter Email</h3>
          <input
            id="emailInput"
            className="form-control text-center"
            onChange={this.handleEmailInput}
          ></input>
          <h3>Enter Username</h3>
          <input
            id="userInput"
            className="form-control text-center"
            onChange={this.handleUsernameInput}
          ></input>
          <h3>Enter Password</h3>
          <input
            id="pass1Input"
            className="form-control text-center"
            onChange={this.handlePass1Input}
          ></input>
          <h3>Confirm Password</h3>
          <input
            id="pass2Input"
            className="form-control text-center"
            onChange={this.handlePass2Input}
          ></input>
          <h3>Password Recovery Question</h3>
          <select
            id="recovSel"
            className="form-control text-center"
            value={this.state.recovery}
            onChange={this.handleRecoveryQuestionChange}
          >
            <option value="1">Color of your first car</option>
            <option value="2">Mother's maiden name</option>
            <option value="3">Fathers middle name</option>
            <option value="4">First pet's name</option>
            <option value="5">City you were born in</option>
          </select>
          <br />
          <input
            id="recInput"
            className="form-control text-center"
            onChange={this.handleRecoveryInput}
          ></input>
          <br />
          <button className="btn btn-lg btn-dark" onClick={this.createAcc}>
            Create!
          </button>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default CreateAccount;
