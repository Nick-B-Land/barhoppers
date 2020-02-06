import React, { Component } from "react";
import "../main.css";
import Card from "./card.js";
import { observer } from "mobx-react";
import Footer from "./footer.js";

const bars = observer(
  class Bars extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedValue: "",
        category: "All",
        sliderValue: 5,
        latitude: 0,
        longitude: 0
      };
    }

    componentDidMount = () => {
      this.getLocation();
      this.getDay();
    };

    // gets day and updates state
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

    //uses built in navigator to get lat and long
    //this should probably be done in app
    getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showCoords);
      }
    };

    //helper function for calculate distance
    toRadians = degrees => {
      return (degrees * Math.PI) / 180;
    };

    //callback function needed in get location to set state
    showCoords = pos => {
      this.setState({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    };

    //formula to calculate distance from to points given lat and long
    //note that it just calculates in a straight line
    calculateDistance = (fromLat, fromLong, toLat, toLong) => {
      var R = 6371e3; // Earth's Radius in Meterss
      var Starting_Latitude = this.toRadians(fromLat); // Initial Location
      var Destination_Latitude = this.toRadians(toLat); // Destination
      var Final_Latitude = this.toRadians(toLat - fromLat);
      var Final_Longitude = this.toRadians(toLong - fromLong);
      var a =
        Math.sin(Final_Latitude / 2) * Math.sin(Final_Latitude / 2) +
        Math.cos(Starting_Latitude) *
          Math.cos(Destination_Latitude) *
          Math.sin(Final_Longitude / 2) *
          Math.sin(Final_Longitude / 2);

      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return Math.round(d / 1000);
    };
    // updates day on user input
    handleSelected = e => {
      this.setState({ selectedValue: e.target.value });
    };
    // updates category based on user input
    handleCategory = e => {
      this.setState({ category: e.target.value });
    };
    // updates proximity based on user input
    handleSlider = e => {
      this.setState({ sliderValue: e.target.value });
    };

    //renders a card for each bar within the selected proximity
    renderBars = (day, prox, cat) => {
      let proxArr = [];
      let Bars = this.props.barStore.Bars;
      Bars.forEach(e => {
        let distance = this.calculateDistance(
          this.state.latitude,
          this.state.longitude,
          e.doc.Latitude,
          e.doc.Longitude
        );
        if (distance <= prox) proxArr.push(e);
      });
      // returns card for each bar in proxArr
      return proxArr.map(e => (
        <div key={e.doc.Name}>
          <Card
            lat={this.state.latitude}
            long={this.state.longitude}
            name={e.doc.Name}
            address={e.doc.Address}
            specials={e.doc.Specials}
            day={day}
            prox={prox}
            cat={cat}
            reviews={e.doc.Reviews}
            likes={e.doc.Likes}
            barStore={this.props.barStore}
            userStore={this.props.userStore}
          />
        </div>
      ));
    };

    render() {
      let day = this.state.selectedValue;
      let prox = this.state.sliderValue;
      let cat = this.state.category;
      return (
        <div>
          <div className="container-fluid pageHeader text-center">
            <h1>View Bars!</h1>
          </div>
          <div className="test barRender">
            <div className="barSelects">
              {/* day selection */}
              <h6 className="proxPara">Day</h6>
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
              {/* category selection */}
              <h6 className=" proxPara">Category</h6>
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
            {/* proximity slider */}

            <div className="barSlider">
              <input
                type="range"
                min="1"
                max="50"
                onChange={this.handleSlider}
                value={this.state.sliderValue}
              />
              <p className="text-muted">
                Proximity(KM):{" "}
                <p className="proxPara font-weight-bolder">{prox}</p>
              </p>
            </div>
            {this.renderBars(day, prox, cat)}
          </div>
          <Footer />
        </div>
      );
    }
  }
);

export default bars;
