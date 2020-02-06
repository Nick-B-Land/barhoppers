import React, { Component } from "react";
import Button from "./button.js";
import Popup from "reactjs-popup";
import Review from "./review.js";
import FavBtn from "./favButton.js";
import { observer } from "mobx-react";
//
//props:
//name= bar name
//address= bar address
//specials= array of bar specials
//likes= likes for bar
//reviews= array of reviews for bar
//barStore= bar model
//userStore= store model
//
const searchCard = observer(
  class SearchCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        showReviews: false,
        liked: false,
        review: ""
      };
    }

    componentDidMount = () => {
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
      } else alert("Must be logged in to like a bar");
      let l = this.state.liked;
      this.setState({ liked: !l });
    };
    //changes visibility of reviews to opposite
    showHide = () => {
      this.setState({ showReviews: !this.state.showReviews });
    };

    //sets state of review
    reviewChange = e => {
      this.setState({ review: e.target.value });
    };
    // calls review function and closes popup
    reviewSubmit = () => {
      this.handleReviews();
      this.closePopup();
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

    //renders reviews if there are any
    renderReviews = () => {
      if (this.props.reviews && this.props.reviews.length > 0) {
        return this.props.reviews.map(e => (
          <Review
            name={this.props.name}
            key={Math.random()}
            postedBy={e.SubmittedBy}
            postedOn={e.SubmittedOn}
            content={e.Content}
            likes={e.Likes}
            children={e.Children}
            userStore={this.props.userStore}
            barStore={this.props.barStore}
          />
        ));
      } else return "No Reviews";
    };

    //adds a review on click of submit
    handleReview = () => {
      this.props.barStore.AddReview(this.state.review, this.props.name);
    };
    //renders all specials of bar
    renderSpecials = () => {
      let s = this.props.specials[0];

      return (
        <div>
          <h6>Monday</h6>
          {s.Monday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ))}
          <br />
          <h6>Tueday</h6>
          {s.Tuesday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ))}
          <br />
          <h6>Wednesday</h6>
          {s.Wednesday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ))}
          <br />
          <h6>Thursday</h6>
          {s.Thursday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ))}
          <br />
          <h6>Friday</h6>
          {s.Friday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ))}
          <br />
          <h6>Saturday</h6>
          {s.Saturday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ))}
          <br />
          <h6>Sunday</h6>
          {s.Sunday.map(e => (
            <div key={Math.random()}>
              <span>
                {e.Desc} {this.formatPrice(e.Price)}
              </span>
              <br />
            </div>
          ))}
        </div>
      );
    };
    //formats price (some prices are strings)
    formatPrice = e => {
      if (typeof e === "string") return " : " + e;
      else if (typeof e === "number") return ": $" + e;
    };
    //main render for each bar card
    cardRender = () => {
      let l = this.props.likes;
      let caption = this.state.liked ? "UnLike" : "Like";
      return (
        <div
          style={{ marginTop: "25px", marginBottom: "25px" }}
          className="card text-center"
        >
          <div className="card-header ">
            <h4 className="card-title"> {this.props.name}</h4>
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
              {this.renderSpecials()}
            </ul>
          </div>
          <div className="card-footer text-muted">
            <div>{l}</div>
            <button onClick={this.handleHop}>{caption}</button>
            <Button showHide={this.showHide} caption="Reviews" />
            {this.props.userStore.IsLoggedIn ? (
              <Popup
                trigger={<button className="button"> Add Review </button>}
                disabled={this.state.closePop}
                modal
                closeOnDocumentClick
              >
                <div>
                  <span> Write Review </span>
                  <br />
                  <textarea
                    style={{ width: "80%" }}
                    onChange={this.reviewChange}
                    rows="10"
                  ></textarea>
                  <br />
                  <button onClick={this.reviewSubmit}>Submit</button>
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
    };
    render() {
      return <div>{this.cardRender()}</div>;
    }
  }
);

export default searchCard;
