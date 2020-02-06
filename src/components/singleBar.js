import React, { Component } from "react";
import SearchCard from "./searchCard.js";
import { observer } from "mobx-react";
//
//props:
//barStore- bar model
//location.state.name- state value from link component set to a bar name
//
const singleBar = observer(
  class SingleBar extends Component {
    componentDidMount = () => {
      this.props.barStore.Fetch();
      this.syncSession();
    };
    // if it has state pass to it from the link component of browser router
    // set session storage item to that state
    // still buggy
    syncSession = () => {
      if (this.props.location.state.name) {
        let n = sessionStorage.getItem("singleBar");
        if (n !== this.props.location.state.name) {
          sessionStorage.removeItem("singleBar");
          sessionStorage.setItem("singleBar", this.props.location.state.name);
        }
      }
    };

    componentWillUnmount = () => {
      this.syncSession();
    };
    // determines the bar to render by using barStore and a passed state value from link
    setBar = () => {
      this.syncSession();
      let bar = [];
      let n = sessionStorage.getItem("singleBar");
      this.props.barStore.Bars.forEach(e => {
        if (e.doc.Name === n) {
          bar.push(e);
        }
      });

      if (bar.length !== 0) {
        return (
          <div className="test" key={bar[0].doc.Name}>
            <SearchCard
              name={bar[0].doc.Name}
              address={bar[0].doc.Address}
              specials={bar[0].doc.Specials}
              reviews={bar[0].doc.Reviews}
              likes={bar[0].doc.Likes}
              barStore={this.props.barStore}
              userStore={this.props.userStore}
            />
          </div>
        );
      } else {
        return (
          <div>
            <h1>Couldn't find bar</h1>
          </div>
        );
      }
    };

    render() {
      return <div>{this.setBar()}</div>;
    }
  }
);

export default singleBar;
