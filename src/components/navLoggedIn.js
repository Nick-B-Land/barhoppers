import React, { Component } from "react";
import { observer } from "mobx-react";
//
// props:
//userStore- user model
//
const navLoggedIn = observer(
  class NavLoggedIn extends Component {
    // renders name of user for nav bar if logged in
    renderUser = () => {
      if (this.props.userStore.IsLoggedIn) {
        return (
          <div className="navbar-nav mr-auto">
            {" "}
            Hi, {this.props.userStore.Username}
          </div>
        );
      } else return null;
    };
    // renders name
    render() {
      return <span>{this.renderUser()}</span>;
    }
  }
);

export default navLoggedIn;
