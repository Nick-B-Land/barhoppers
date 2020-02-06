import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/nav.js";
import MapView from "./components/map.js";
import Bars from "./components/bars";
import Home from "./components/home.js";
import Account from "./components/account.js";
import Search from "./components/search.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SingleBar from "./components/singleBar.js";
import { observer } from "mobx-react";
import LogIn from "./components/login.js";
import FavPage from "./components/favPage.js";
import CreateAccount from "./components/createAccount.js";
// import PouchDB from "pouchdb";
// import x from "./data.js";
// import y from "./userData.js";

const app = observer(
  class App extends Component {
    componentDidMount = async () => {
      // // -- Needed to initialize bar database --
      // var db = new PouchDB(
      //   "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/bars"
      // );
      // x.Bars.forEach(e => {
      //   let obj = {
      //     _id: e._id,
      //     Name: e.Name,
      //     Address: e.Address,
      //     Latitude: e.Latitude,
      //     Longitude: e.Longitude,
      //     Reviews: e.Reviews,
      //     Likes: e.Likes,
      //     Specials: e.Specials
      //   };
      //   db.put(obj);
      // });

      // // -- Needed to initialize user database --
      // var db = new PouchDB(
      //   "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/users"
      // );
      // y.Users.forEach(e => {
      //   let obj = {
      //     _id: e._id,
      //     Username: e.Username,
      //     Favourites: e.Favourites,
      //     BarsLiked: e.BarsLiked,
      //     ReviewsLiked: [],
      //     ReviewsPosted: e.ReviewsPosted
      //   };
      //   db.put(obj);
      // });

      //initializes barStore
      this.props.barStore.Fetch();
      // Initializes user across refresh
      let u = sessionStorage.getItem("Username");
      if (u) {
        this.props.userStore.Fetch(u);
      }
    };
    // browser routing to main pages
    render() {
      return (
        <React.Fragment>
          <BrowserRouter>
            <Nav userStore={this.props.userStore} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    {...props}
                    barStore={this.props.barStore}
                    userStore={this.props.userStore}
                  />
                )}
              />
              <Route
                exact
                path="/bars"
                render={props => (
                  <Bars
                    {...props}
                    barStore={this.props.barStore}
                    userStore={this.props.userStore}
                  />
                )}
              />
              <Route
                exact
                path="/bars/single"
                render={props => (
                  <SingleBar
                    {...props}
                    barStore={this.props.barStore}
                    userStore={this.props.userStore}
                  />
                )}
              />
              <Route
                exact
                path="/map"
                render={props => (
                  <MapView {...props} barStore={this.props.barStore} />
                )}
              />
              <Route
                exact
                path="/search"
                render={props => (
                  <Search
                    {...props}
                    barStore={this.props.barStore}
                    userStore={this.props.userStore}
                  />
                )}
              />
              <Route
                exact
                path="/account"
                render={props => (
                  <Account
                    {...props}
                    userStore={this.props.userStore}
                    barStore={this.props.barStore}
                  />
                )}
              />
              <Route
                exact
                path="/account/login"
                render={props => (
                  <LogIn
                    {...props}
                    barStore={this.props.barStore}
                    userStore={this.props.userStore}
                  />
                )}
              />
              <Route
                exact
                path="/account/favs"
                render={props => (
                  <FavPage
                    {...props}
                    barStore={this.props.barStore}
                    userStore={this.props.userStore}
                  />
                )}
              />
              <Route
                exact
                path="/createaccount"
                render={props => <CreateAccount />}
              />
            </Switch>
          </BrowserRouter>
        </React.Fragment>
      );
    }
  }
);

export default app;
