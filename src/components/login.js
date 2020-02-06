import React, { Component } from "react";
import Footer from "./footer";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: ""
    };
  }
  // handles email input by user
  handleEmail = e => {
    this.setState({ email: e.target.value });
  };
  // handles password input by user
  handlePass = e => {
    this.setState({ pass: e.target.value });
  };
  // use the provided api to verify login and set the userStore on success
  loginFetch = async () => {
    let e = this.state.email;
    let pass = this.state.pass;
    const endPoint = "//s28.ca/rest/bowspace/login";
    const req = {
      EmailAddress: e,
      Password: pass
    };

    let P = await fetch(endPoint, {
      method: "POST",
      body: JSON.stringify(req)
    });
    let data = await P.json();
    if (data.Status === "success") {
      // decode the jwt to find the username
      // used as the primary key in our user database
      let split = data.Jwt.split(".");
      let json = window.atob(split[1]);
      let payload = JSON.parse(json);
      let user = payload.sub;
      this.props.userStore.Fetch(payload.sub);
      // create copy of username to keep user logged in on page refresh
      sessionStorage.setItem("Username", user);
      // go to account page
      this.props.history.push("/account");
    } else {
      alert("Invalid login");
      this.refs.emailRef.value = "";
      this.refs.passRef.value = "";
    }
  };

  render() {
    return (
      <div>
        <div className="loginContainer">
          <h6 className=" proxPara text-center">Login!</h6>
          <br />
          <span>
            <input
              className="form-control mr-sm-2"
              type="search"
              ref="emailRef"
              placeholder="Email Address"
              aria-label="Email Address"
              onChange={this.handleEmail}
            />
          </span>
          <br />
          <span>
            <input
              className="form-control mr-sm-2"
              type="password"
              ref="passRef"
              placeholder="Password"
              aria-label="Password"
              onChange={this.handlePass}
            />
          </span>
          <br />
          <div className="loginCenter">
            <button
              className="btn btn-dark my-2 my-sm-0"
              onClick={this.loginFetch}
            >
              LogIn
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default LogIn;
