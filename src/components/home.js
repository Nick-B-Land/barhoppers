import React, { Component } from "react";
import bar from "../bar.jpg";
import { Link } from "react-router-dom";
import Footer from "./footer";

class Home extends Component {
  // renders main landing page
  // if no user shows login button
  render() {
    let u = sessionStorage.getItem("Username");
    return (
      <div className="homeContainer">
        <div className="container">
          <div className="row" id="homeRow">
            <div className="col-sm-7">
              <h1 className="homeLead">Bar information, made simple</h1>
              <p>
                Find all you need to know when your out on the town looking for
                a great spot to eat or grab a drink. Feeling like wings on a
                Thursday? With barhoppers you have all the options available to
                you with a click. Create a account to save your favourite bars,
                and compare specials to find the best deal open to you.
              </p>
              <p>
                Barhoppers, saving you time and money, cause who doesn't need a
                extra drink?
              </p>
              <p>
                <Link to="/bars">
                  <button className="btn btn-lg btn-dark">View Bars</button>
                </Link>
                {u ? null : (
                  <Link to="/account/login">
                    <button className="btn btn-lg btn-dark" id="accBtnHome">
                      LogIn
                    </button>
                  </Link>
                )}
                <Link to="/createaccount">
                  <button className="btn btn-lg btn-dark" id="createBtnHome">
                    Create Account
                  </button>
                </Link>
              </p>
            </div>
            <div className="col-sm-5">
              <img
                src={bar}
                className="img-responsive rounded-circle border "
                id="imgMain"
                alt="People cheering great deals at their favourite bar"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
