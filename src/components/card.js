import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "./button.js";
import Popup from "reactjs-popup";
import Review from "./review.js";
import { observer } from "mobx-react";
import FavBtn from "./favButton.js";
//
//props:
//lat- users latitude
//long- users longitude
//name- name of bar to render
//address- address of bar to render
//specials- array of specials for bar to render
//day- day selected by user, used to determine specials to render
//prox- proximity selected by user, used to determine bar proximity of user
//cat- category selected by user, defaults to all
//reviews- array of reviews associated with a bar to render
//likes- likes of the bar to render
//barStore- bar model
//userStore- user model
//
const card = observer(
  class Card extends Component {
    constructor(props) {
      super(props);
      this.state = {
        likes: this.props.likes,
        name: "",
        showReviews: false,
        hop: 0,
        review: "",
        reviews: this.props.reviews,
        liked: false,
        closePop: false
      };
    }

    componentDidMount = () => {
      this.setState({ name: this.props.name });
      this.checkLikes();
    };
    // checks if user has liked the bar and updates liked state accordingly
    checkLikes = () => {
      if (this.props.userStore.BarsLiked.includes(this.props.name)) {
        this.setState({ liked: true });
      } else {
        this.setState({ liked: false });
      }
    };
    // updates hops based on whether the user has already hopped the bar or not
    handleHop = () => {
      if (this.props.userStore.IsLoggedIn) {
        this.props.barStore.HandleHops(this.state.liked, this.props.name);
        this.props.userStore.HandleHops(this.props.name);
        let l = this.state.liked;
        this.setState({ liked: !l });
      } else alert("Must be logged in to like a bar");
    };

    //renders specials of bar based on day
    renderSpecials = day => {
      let specials = this.props.specials[0];
      if (day) {
        if (day === "Monday") {
          return specials.Monday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ));
        } else if (day === "Tuesday") {
          return specials.Tuesday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ));
        } else if (day === "Wednesday") {
          return specials.Wednesday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ));
        } else if (day === "Thursday") {
          return specials.Thursday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ));
        } else if (day === "Friday") {
          return specials.Friday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ));
        } else if (day === "Saturday") {
          return specials.Saturday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ));
        } else if (day === "Sunday") {
          return specials.Sunday.map(e => (
            <div key={Math.random()}>
              <span className="card-text">
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ));
        }
      }
    };

    //formats price (some prices are strings)
    formatPrice = e => {
      if (typeof e === "string") return " : " + e;
      else if (typeof e === "number") return ": $" + e;
    };

    //changes visibility of reviews to opposite
    showHide = () => {
      this.setState({ showReviews: !this.state.showReviews });
    };

    //sets state of review
    reviewChange = e => {
      this.setState({ review: e.target.value });
    };

    //renders reviews if there are any
    renderReviews = () => {
      if (this.props.reviews.length > 0) {
        return this.props.reviews.map(e => (
          <Review
            name={this.props.name}
            key={Math.random()}
            postedBy={e.SubmittedBy}
            postedOn={e.SubmittedOn}
            content={e.Content}
            likes={e.Likes}
            children={e.Children}
            barStore={this.props.barStore}
            userStore={this.props.userStore}
          />
        ));
      } else return "No Reviews";
    };

    // handles review insertion by calling barStore method and updates userStore as well
    handleReviews = () => {
      let date = new Date().toLocaleString();
      this.props.barStore.AddReview(
        this.state.review,
        this.props.name,
        this.props.userStore._id,
        date
      );
      this.props.userStore.AddReview(this.props.name, date, this.state.review);
    };

    // needed for closing review popup
    closePopup = () => {
      this.setState({ closePop: true });
    };

    // calls review function and closes popup
    reviewSubmit = () => {
      this.handleReviews();
      this.closePopup();
    };
    //main render for each bar card
    cardRender = (day, cat) => {
      let specials = this.props.specials[0];
      let catArr = [];
      let l = this.props.likes;
      let caption = this.state.liked ? "UnLike" : "Like";
      //if there is a category selected, creates a new array
      //to use, filtered to specials that match selected category
      if (day && cat) {
        if (day === "Monday") {
          specials.Monday.forEach(e => {
            if (e.Cat === cat) catArr.push(e);
          });
        } else if (day === "Tuesday") {
          specials.Tuesday.forEach(e => {
            if (e.Cat === cat) catArr.push(e);
          });
        } else if (day === "Wednesday") {
          specials.Wednesday.forEach(e => {
            if (e.Cat === cat) catArr.push(e);
          });
        } else if (day === "Thursday") {
          specials.Thursday.forEach(e => {
            if (e.Cat === cat) catArr.push(e);
          });
        } else if (day === "Friday") {
          specials.Friday.forEach(e => {
            if (e.Cat === cat) catArr.push(e);
          });
        } else if (day === "Saturday") {
          specials.Saturday.forEach(e => {
            if (e.Cat === cat) catArr.push(e);
          });
        } else if (day === "Sunday") {
          specials.Sunday.forEach(e => {
            if (e.Cat === cat) catArr.push(e);
          });
        }
      }

      //main render logic, checks different conditions
      //
      //returns if no match on category
      if (cat !== "All" && catArr.length === 0) return null;
      //returns matching categories
      else if (cat !== "All" && catArr.length > 0) {
        return (
          <div className="card text-center cardContainer rounded">
            <div className="card-header">
              <Link
                to={{
                  pathname: "/bars/single",
                  state: {
                    name: this.state.name
                  }
                }}
              >
                <h4 className="card-title"> {this.props.name}</h4>
              </Link>
              <p className="card-subtitle mb-2 text-muted">
                {this.props.address}
              </p>
              <span>
                <FavBtn
                  userStore={this.props.userStore}
                  barStore={this.props.barStore}
                  name={this.props.name}
                />
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">Specials</h5>
              <ul className="list-group list-group-flush">
                {/* returns specials if category selected */}
                {catArr.map(e => (
                  <div key={Math.random()}>
                    <span>
                      {e.Desc} {this.formatPrice(e.Price)}
                    </span>
                    <br />
                  </div>
                ))}
              </ul>
            </div>
            <div className="card-footer text-muted cardFooter">
              <div>{l}</div>
              <button className="btn btn-dark likeBtn" onClick={this.handleHop}>
                {caption}
              </button>
              {/* toggles reviews*/}
              <Button showHide={this.showHide} caption="Reviews" />
              {this.props.userStore.IsLoggedIn ? (
                // component to handle writing a review
                // is only rendered if user is logged in
                <Popup
                  trigger={<button className="button"> Add Review </button>}
                  disabled={this.state.closePop}
                  modal
                  closeOnDocumentClick
                >
                  <div>
                    <h3>Write Review</h3>
                    <br />
                    <textarea
                      style={{ width: "80%" }}
                      onChange={this.reviewChange}
                      rows="10"
                      className="form-control"
                    ></textarea>
                    <br />
                    <br />
                    <button
                      className="btn btn-dark"
                      onClick={this.reviewSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </Popup>
              ) : null}
            </div>
            <div
              className={
                this.state.showReviews ? "display card-body" : "hide card-body"
              }
            >
              {this.renderReviews()}
            </div>
          </div>
        );
      } else if (day) {
        //returns if only day selected
        return (
          <div className="card text-center cardContainer rounded">
            <div className="card-header ">
              <Link
                to={{
                  pathname: "/bars/single",
                  state: {
                    name: this.state.name
                  }
                }}
              >
                <h4 className="card-title linkName"> {this.props.name}</h4>
              </Link>
              <p className="card-subtitle mb-2 text-muted">
                {this.props.address}
              </p>
              <span>
                <FavBtn
                  userStore={this.props.userStore}
                  barStore={this.props.barStore}
                  name={this.props.name}
                />
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">Specials</h5>
              <ul className="list-group list-group-flush">
                {this.renderSpecials(day)}
              </ul>
            </div>
            <div className="card-footer text-muted cardFooter">
              <span className="likeBtn">
                <button className="btn btn-dark" onClick={this.handleHop}>
                  {caption}
                </button>
                <span className="likeCount font-weight-bold"> {l} </span>
              </span>
              <Button
                showHide={this.showHide}
                className="reviewBtn"
                caption="Reviews"
              />
              {this.props.userStore.IsLoggedIn ? (
                // component to handle writing a review
                // is only rendered if user is logged in
                <Popup
                  trigger={
                    <button className="btn btn-dark"> Add Review </button>
                  }
                  disabled={this.state.closePop}
                  modal
                  closeOnDocumentClick
                >
                  <div>
                    <h2>Write Review</h2>
                    <br />
                    <textarea
                      style={{ width: "80%" }}
                      onChange={this.reviewChange}
                      rows="10"
                    ></textarea>
                    <br />
                    <button
                      className="btn btn-dark"
                      onClick={this.reviewSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </Popup>
              ) : null}
            </div>
            <div
              className={
                this.state.showReviews ? "display card-body" : "hide card-body"
              }
            >
              {this.renderReviews()}
            </div>
          </div>
        );
      }
    };

    render() {
      let day = this.props.day;
      let cat = this.props.cat;
      return <div>{this.cardRender(day, cat)}</div>;
    }
  }
);

export default card;
