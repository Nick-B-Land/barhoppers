import React, { Component } from "react";
import SearchCard from "./searchCard.js";
import Footer from "./footer.js";
//
// props:
// barStore- bar model
// location.state.name- state value from link component set to a search query
//
class Search extends Component {
  // renders any bars that match the search input
  renderBars = y => {
    if (!y)
      return (
        <h1 style={{ marginTop: "25px", marginBottom: "25px" }}>
          Invalid search
        </h1>
      );
    let arr = [];
    this.props.barStore.Bars.forEach(e => {
      let n = e.doc.Name.toUpperCase();
      let s = y.toUpperCase();
      let nn = n.replace(/[^a-zA-Z ]/g, "");
      let ss = s.replace(/[^a-zA-Z ]/g, "");
      if (nn.includes(ss)) arr.push(e);
    });
    if (arr.length === 0)
      return (
        <h1 style={{ marginTop: "25px", marginBottom: "25px" }}>No results</h1>
      );
    return arr.map(e => (
      <div key={e.doc.Name}>
        <SearchCard
          name={e.doc.Name}
          address={e.doc.Address}
          specials={e.doc.Specials}
          likes={e.doc.Likes}
          reviews={e.doc.Reviews}
          barStore={this.props.barStore}
          userStore={this.props.userStore}
        />
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h1 className="test">Results </h1>
        {this.renderBars(this.props.location.state.searchValue)}
        <Footer />
      </div>
    );
  }
}

export default Search;
