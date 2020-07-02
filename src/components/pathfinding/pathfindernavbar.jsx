import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Navbar extends Component {
  render() {
    const buttonStyle = { justifyContent: "center" };
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-collapse">
          <button
            type="button"
            className="btn btn-secondary"
            style={buttonStyle}
          >
            Button
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
