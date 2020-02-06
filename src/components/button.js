import React, { Component } from "react";
//
//props:
//cap-name to display on button
//showHide- shows or hides the reviews based on click in a card component
//
class Button extends Component {
  // calling the hide show function
  handleClick = () => {
    if (this.props.showHide) this.props.showHide();
  };
  // hides and shows the reviews in a card component
  render() {
    let cap = this.props.caption;
    return (
      <button
        type="button"
        className="btn btn-dark reviewBtn"
        onClick={this.handleClick}
      >
        {cap}
      </button>
    );
  }
}

export default Button;
