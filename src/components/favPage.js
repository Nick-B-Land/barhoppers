import React, { Component } from "react";
import Card from "./card.js";
import { observer } from "mobx-react";
import Footer from "./footer.js";

const favPage = observer(
  class FavPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedValue: "",
        category: "All"
      };
    }

    componentDidMount = () => {
      this.getDay();
    };

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

    handleSelected = e => {
      this.setState({ selectedValue: e.target.value });
    };

    handleCategory = e => {
      this.setState({ category: e.target.value });
    };

    buildFavourites = (d, c) => {
      let Bars = this.props.barStore.Bars;
      let favArr = [];

      Bars.forEach(e => {
        this.props.userStore.Favourites.forEach(f => {
          if (f === e.doc.Name) {
            favArr.push(e);
          }
        });
      });

      return favArr.map(e => (
        <div key={e.doc.Name}>
          <Card
            lat={this.state.latitude}
            long={this.state.longitude}
            name={e.doc.Name}
            address={e.doc.Address}
            specials={e.doc.Specials}
            day={d}
            cat={c}
            reviews={e.doc.Reviews}
            likes={e.doc.Likes}
            barStore={this.props.barStore}
            userStore={this.props.userStore}
          />
        </div>
      ));
    };

    mainRender = (d, c) => {
      return (
        <div>
          <div className="container-fluid pageHeader text-center">
            <h1>Your Favorites</h1>
          </div>
          <div className="test barRender">
            <div className="barSelects">
              <select
                id="sel"
                className="form-control text-center"
                onChange={this.handleSelected}
                value={this.state.selectedValue}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday </option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <br />
            <div className="barSelects">
              <select
                id="catSel"
                className="form-control text-center"
                onChange={this.handleCategory}
                value={this.state.category}
              >
                <option value="All">All</option>
                <option value="Drinks">Drinks</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Burgers">Burgers</option>
                <option value="Wings">Wings</option>
                <option value="Tacos">Tacos/Burritos</option>
                <option value="Nachos">Nachos</option>
                <option value="Pizzas">Pizzas</option>
                <option value="Sandwiches">Sandwiches/ Wraps</option>
                <option value="Fish">Fish</option>
                <option value="Entrees">Entrees</option>
              </select>
            </div>
            <br />
            {this.buildFavourites(d, c)}
          </div>
        </div>
      );
    };

    notLoggedIn = () => {
      return (
        <div className="notLoggedContainer">
          <h1>Must be logged in to view favourites!</h1>
        </div>
      );
    };

    render() {
      let c = this.state.category;
      let d = this.state.selectedValue;
      return (
        <div>
          {this.props.userStore.IsLoggedIn
            ? this.mainRender(d, c)
            : this.notLoggedIn()}
          <Footer />
        </div>
      );
    }
  }
);

export default favPage;
