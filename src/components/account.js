import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import Footer from "./footer.js";

const account = observer(
  class Account extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedValue: ""
      };
    }

    componentDidMount = () => {
      this.getDay();
    };
    // gets the current day and updates state
    getDay = () => {
      let date = new Date();
      let d = date.getDay();

      if (d === 0) this.setState({ selectedValue: "Sunday" });
      else if (d === 1) this.setState({ selectedValue: "Monday" });
      else if (d === 2) this.setState({ selectedValue: "Tuesday" });
      else if (d === 3) this.setState({ selectedValue: "Wednesday" });
      else if (d === 4) this.setState({ selectedValue: "Thursday" });
      else if (d === 5) this.setState({ selectedValue: "Friday" });
      else if (d === 6) this.setState({ selectedValue: "Saturday" });
    };

    // clears session storage and userStore
    handleLogout = () => {
      sessionStorage.removeItem("Username");
      this.props.userStore.Clear();
      //window.location.reload(true);
    };

    // returns all bars liked from userStore
    buildLikedBars = () => {
      let likedbars = this.props.userStore.BarsLiked;

      if (likedbars.length === 0) {
        return "No liked bars (a little prudish, ya?)";
      } else return likedbars.map(e => <div key={e}>{e}</div>);
    };
    // returns all favorites in userStore
    buildFavs = () => {
      let favs = this.props.userStore.Favourites;

      if (favs.length === 0) {
        return "No favourites (yet!)";
      } else return favs.map(e => <div key={e}>{e}</div>);
    };
    // returns all reviews posted obejects from userStore
    buildReviewsPosted = () => {
      let reviews = this.props.userStore.ReviewsPosted;
      let counter = 0;
      if (reviews.length === 0) {
        return "No reviews posted, get cracking!";
      } else
        return reviews.map(e => (
          <div
            className={
              this.isOdd(counter++)
                ? "trueReviewFav rounded bg-dark"
                : "falseReviewFav rounded"
            }
            key={Math.random()}
          >
            {console.log(counter)}
            <h3>{e.Barname}</h3>
            <h4>{e.PostedOn}</h4>
            <p>{e.Content}</p>
          </div>
        ));
    };
    isOdd = n => {
      if (n % 2 === 0) return true;
    };
    // main render for page if user is logged in
    mainRender = () => {
      return (
        <div className="container">
          <div className="row justify-content-md-center accountCard">
            <div className="container-fluid pageHeader text-center">
              <h1> Welcome {this.props.userStore.Username} !</h1>
            </div>
          </div>
          <div className="container">
            <div class="row float-left btnSpace">
              <div className="col-12">
                {/* this determines button to render.. if not logged in login button if logged in button logout*/}
                {!this.props.userStore.IsLoggedIn ? (
                  <Link to="/account/login">
                    <button className="btn btn-dark btn-lg">Login</button>
                  </Link>
                ) : (
                  <button
                    onClick={this.handleLogout}
                    className="btn btn-dark btn-lg"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            <div className="row align-middle rowSpacing">
              <div className="col-3 align-text-bottom">
                <h3 className="textRed">Favourites</h3>
              </div>
              <div className="col-9 card card-body border border-secondary">
                {this.buildFavs()}
              </div>
            </div>
            <div className="row rowSpacing">
              <div className="col-3 mx-auto ">
                <h3 className="textRed">Bars Liked</h3>
              </div>
              <div className="col-9 card card-body border border-secondary">
                {this.buildLikedBars()}
              </div>
            </div>
            <div className="row rowSpacing reviewPostedSpacing">
              <div className="col-3 mx-auto">
                <h3 className="textRed">Reviews Posted</h3>
              </div>
              <div className="col-9 card card-body border border-secondary">
                {this.buildReviewsPosted()}
              </div>
            </div>
          </div>
        </div>
      );
    };
    // renders if user not logged in
    notLoggedIn = () => {
      return (
        <div className="notLoggedContainer">
          <h1 className="notLoggedInHead">Log in to view your account page!</h1>
          <Link to="/account/login">
            <div className="notLoggedBtn">
              <button className="btn btn-dark btn-lg">Login</button>
            </div>
          </Link>
        </div>
      );
    };
    render() {
      return (
        <React.Fragment>
          {this.props.userStore.IsLoggedIn
            ? this.mainRender()
            : this.notLoggedIn()}
          <Footer />
        </React.Fragment>
      );
    }
  }
);

export default account;
