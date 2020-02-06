import React, { Component } from "react";
import { observer } from "mobx-react";
//
//props:
//name= bars name
//postedBy= user who posted
//postedOn= date time posted
//content= review content
//likes= review likes
//barStore= bar model
//userStore= user model
//
const review = observer(
  class Review extends Component {
    constructor(props) {
      super(props);
      this.state = {
        liked: false,
        canDelete: false
      };
    }
    // initalizes state of liked and can delete
    componentDidMount = () => {
      this.checkDelete();
      this.checkLikes();
    };
    // checks UserStore to see if current user posted review if so they can delete review
    checkDelete = () => {
      let uReviews = this.props.userStore.ReviewsPosted;
      uReviews.forEach(e => {
        if (
          e.Barname === this.props.name &&
          e.PostedOn === this.props.postedOn &&
          this.props.userStore._id === this.props.postedBy
        ) {
          this.setState({ canDelete: true });
        }
      });
    };
    // deletes review by using model methods
    deleteReview = () => {
      this.props.userStore.DeleteReview(this.props.name, this.props.postedOn);
      this.props.barStore.DeleteReview(
        this.props.name,
        this.props.userStore._id,
        this.props.postedOn
      );
      this.checkDelete();
    };
    // checks userStore to see if current user has liked the review
    // this is a little buggy still
    checkLikes = () => {
      if (this.props.userStore.IsLoggedIn) {
        this.props.userStore.ReviewsLiked.forEach(e => {
          if (
            e.PostedBy === this.props.postedBy &&
            e.PostedOn === this.props.postedOn
          ) {
            this.setState({ liked: true });
          } else {
            this.setState({ liked: false });
          }
        });
      }
    };
    // handles only logged in users to like a review
    // calls model methods if user logged in to handle likes
    handleReviewLike = () => {
      if (this.props.userStore.IsLoggedIn) {
        this.props.barStore.LikeReview(
          this.state.liked,
          this.props.name,
          this.props.postedBy,
          this.props.postedOn
        );
        this.props.userStore.HandleReviewHops(
          this.props.postedBy,
          this.props.postedOn
        );
      } else alert("Must be logged in to like");
    };
    // main render for review only renders delete button if user can delete review
    render() {
      let caption = this.state.liked ? "Unlike" : "Like";
      return (
        <div className="container bg-light reviewBody border rounded">
          <h5 className="float-left reviewName">{this.props.postedBy}</h5>
          <h6 className="float-left clearfix reviewPosted">
            {this.props.postedOn}
          </h6>
          <br />
          <p className="reviewContent text-left">{this.props.content}</p>
          <div className="reviewFooter">
            <span className="reviewLikeBtn float-left">
              <button className="btn btn-dark " onClick={this.handleReviewLike}>
                {caption}
              </button>
              <span className="reviewLikes">{this.props.likes}</span>
            </span>
            {this.state.canDelete ? (
              <button
                className="btn btn-dark reviewDelBtn float-right"
                onClick={this.deleteReview}
              >
                Delete
              </button>
            ) : null}
          </div>
        </div>
      );
    }
  }
);

export default review;
