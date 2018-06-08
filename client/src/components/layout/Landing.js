import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../node_modules/toastr/build/toastr.css";
import "../../../node_modules/toastr/build/toastr.min";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Shopify</h1>
                <p className="lead">
                  {" "}
                  Shop all your grocery on a click of a button.
                </p>
                <hr />
                <Link to="/products" className="btn btn-lg btn-info">
                  Go Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
