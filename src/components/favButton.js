import React, { Component } from "react";
import { observer } from "mobx-react";
//
//props:
//name- name of bar
//barStore- bar model
//userStore- user model
//
const favBtn = observer(
  class FavBtn extends Component {
    constructor(props) {
      super(props);
      this.state = {
        favourited: false
      };
    }

    componentDidMount = () => {
      this.checkFav();
    };
    // checks if user has favorited or not
    checkFav = () => {
      let favs = this.props.userStore.Favourites;
      if (favs.includes(this.props.name)) {
        this.setState({ favourited: true });
      } else {
        this.setState({ favourited: false });
      }
    };
    // adds favorite to userStore, updates state of favorited
    handleFavourite = () => {
      this.props.userStore.HandleFavs(this.props.name);
      let f = this.state.favourited;
      this.setState({ favourited: !f });
    };
    // main render
    buttonRender = () => {
      let caption = this.state.favourited ? "UnFavourite" : "Favourite";
      if (this.props.userStore.IsLoggedIn) {
        return (
          <div>
            <button
              className="btn btn-outline-dark"
              onClick={this.handleFavourite}
            >
              {" "}
              {caption}{" "}
            </button>
          </div>
        );
      } else return null;
    };

    render() {
      return this.buttonRender();
    }
  }
);

export default favBtn;
