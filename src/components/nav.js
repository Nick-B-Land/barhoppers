import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavLoggedIn from "./navLoggedIn";
import Logo from "../Logo1.png";
//
// props:
//userStore- user model
//
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }
  // handles the search input from user and sets searchValue state
  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };
  // renders nav
  render() {
    return (
      <nav className="navbar navbar-expand-lg navContainer">
        <Link to="/">
          <span className="navbar-brand">
            <img alt="This Is The Logo" src={Logo} />
          </span>
        </Link>
        <div
          className="collapse navbar-collapse container-fluid"
          id="navbarNav"
        >
          <ul className="navbar-nav mr-auto">
            <Link to="/map">
              <li className="nav-item">
                <span className="nav-link">Map</span>
              </li>
            </Link>
            <Link to="/bars">
              <li className="nav-item">
                <span className="nav-link">Bars</span>
              </li>
            </Link>
            <Link to="/account">
              <li className="nav-item ">
                <span className="nav-link">Account</span>
              </li>
            </Link>
            <Link to="/account/favs">
              <li className="nav-item ">
                <span className="nav-link">Favs</span>
              </li>
            </Link>
          </ul>
          <span className="navLoggedIn">
            <NavLoggedIn userStore={this.props.userStore} />
          </span>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={this.handleChange}
            />
            <Link
              to={{
                pathname: "/search",
                state: {
                  searchValue: this.state.searchValue
                }
              }}
            >
              <button
                className="btn btn-outline-dark my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </Link>
          </form>
        </div>
      </nav>
    );
  }
}

export default Nav;
