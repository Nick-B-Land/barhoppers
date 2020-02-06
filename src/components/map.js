import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import stickman from "../PingMan.png";
import testMug from "../testMug.png";
//
//props:
//barStore- bar model
//
class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      selectedValue: "",
      currentName: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  // gets day and sets state
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
  // handles clicking on a marker
  // sets active marker for info window rendering
  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      currentName: props.name
    });
  };
  // handles clicking on the map, clears screen
  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  // sets a marker on users current location
  displayLocation = () => {
    let iconMarker = new window.google.maps.MarkerImage(
      stickman,
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(50, 50)
    );
    // render marker
    return (
      <Marker
        icon={iconMarker}
        key={Math.random()}
        position={{
          lat: this.state.latitude,
          lng: this.state.longitude
        }}
      />
    );
  };
  // displays markers for all bars in barStore
  displayMarkers = () => {
    // create custom marker
    let iconMarker = new window.google.maps.MarkerImage(
      testMug,
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(36, 36)
    );
    // loops through barStores
    return this.props.barStore.Bars.map(e => {
      return (
        <Marker
          icon={iconMarker}
          key={e.doc.Name}
          name={e.doc.Name}
          day={this.state.selectedValue}
          specials={e.doc.Specials[0]}
          address={e.doc.Address}
          position={{
            lat: e.doc.Latitude,
            lng: e.doc.Longitude
          }}
          onClick={this.onMarkerClick}
        />
      );
    });
  };
  // formats price for rendering
  formatPrice = e => {
    if (typeof e === "string") return " : " + e;
    else if (typeof e === "number") return ": $" + e;
  };

  //returns special based on day
  renderSpecials = (day, specials) => {
    let y = specials;
    if (day && y) {
      if (day === "Monday") {
        return y.Monday.map(e => (
          <div key={Math.random()}>
            <span>
              {e.Desc} {this.formatPrice(e.Price)}
            </span>
            <br />
          </div>
        ));
      } else if (day === "Tuesday") {
        return y.Tuesday.map(e => (
          <div key={Math.random()}>
            <span>
              {e.Desc} {this.formatPrice(e.Price)}
            </span>
            <br />
          </div>
        ));
      } else if (day === "Wednesday") {
        return y.Wednesday.map(e => (
          <div key={Math.random()}>
            <span>
              {e.Desc} {this.formatPrice(e.Price)}
            </span>
            <br />
          </div>
        ));
      } else if (day === "Thursday") {
        return y.Thursday.map(e => (
          <div key={Math.random()}>
            <span>
              {e.Desc} {this.formatPrice(e.Price)}
            </span>
            <br />
          </div>
        ));
      } else if (day === "Friday") {
        return y.Friday.map(e => (
          <div key={Math.random()}>
            <span>
              {e.Desc} {this.formatPrice(e.Price)}
            </span>
            <br />
          </div>
        ));
      } else if (day === "Saturday") {
        return y.Saturday.map(e => (
          <div key={Math.random()}>
            <span>
              {e.Desc} {this.formatPrice(e.Price)}
            </span>
            <br />
          </div>
        ));
      } else if (day === "Sunday") {
        return y.Sunday.map(e => (
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
  // gets current location and sets state
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showCoords);
    }
  };
  // callback for get location
  showCoords = pos => {
    this.setState({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    });
  };
  // initalizes location and day
  componentDidMount = () => {
    this.getLocation();
    this.getDay();
  };
  // main map render
  testMapRender = () => {
    let n = this.state.longitude;
    let l = this.state.latitude;
    if (l & n) {
      return (
        <div>
          <div>
            {/* creates map component used from google-maps-react library*/}
            <Map
              google={this.props.google}
              onClick={this.onMapClicked}
              zoom={15}
              initialCenter={{ lat: l, lng: n }}
            >
              {this.displayMarkers()}
              {this.displayLocation()}
              {/* creates info component used from google-maps-react library */}
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div className="falseReviewFav">
                  <h1 className="homeLead">{this.state.selectedPlace.name}</h1>
                  <div>
                    <div className="text-center">
                      <h5 className="homeLead greyOut">
                        {this.state.selectedPlace.address}
                      </h5>
                      <br />
                      <h6 className="homeLead">
                        {this.state.selectedValue} Specials
                      </h6>
                      {this.renderSpecials(
                        this.state.selectedPlace.day,
                        this.state.selectedPlace.specials
                      )}
                    </div>
                  </div>
                </div>
              </InfoWindow>
            </Map>
          </div>
        </div>
      );
    }
  };

  render() {
    return <div>{this.testMapRender()}</div>;
  }
}

//export default MapView;
export default GoogleApiWrapper({
  apiKey: "AIzaSyDTEqILULbLxet4F2Z5yOds8eL7jVOCW0I"
})(MapView);
