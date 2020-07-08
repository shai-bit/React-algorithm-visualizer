import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Navbar extends Component {
  render() {
    const buttonStyle = { justifyContent: "center", margin: "10px" };
    const { animate, clearPath, animated } = this.props;
    let disabled = animated ? true : false;
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="navbar-collapse">
          <button
            type="button"
            className="btn btn-outline-dark"
            style={buttonStyle}
            onClick={animate}
            disabled={disabled}
          >
            Animate Dijkstras
          </button>
          <button
            type="button"
            className="btn btn-danger"
            style={buttonStyle}
            onClick={() => clearPath()}
          >
            Clear Grid
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
