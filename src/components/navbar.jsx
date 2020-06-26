import React, { Component } from "react";
import "./arraybars.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Navbar extends Component {
  render() {
    const { selectAlgorithm, onReset, onStart } = this.props;
    const buttonStyle = {
      margin: "10px",
    };

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <button
              onClick={() => selectAlgorithm("quicksort")}
              type="button"
              className="btn btn-secondary"
              style={buttonStyle}
            >
              Quicksort
            </button>
            <button
              onClick={() => selectAlgorithm("mergesort")}
              type="button"
              className="btn btn-secondary"
              style={buttonStyle}
              disabled
            >
              Mergesort
            </button>
            <button
              onClick={() => selectAlgorithm("bubblesort")}
              type="button"
              className="btn btn-secondary"
              style={buttonStyle}
            >
              Bubblesort
            </button>
            <button
              onClick={() => selectAlgorithm("heapsort")}
              type="button"
              className="btn btn-secondary"
              style={buttonStyle}
            >
              Heap Sort
            </button>
            <button
              id="startbutton"
              onClick={() => onStart()}
              type="button"
              className="btn btn-success"
              style={buttonStyle}
            >
              START
            </button>
            <button
              id="generatebutton"
              onClick={() => onReset()}
              style={{ marginLeft: "500px" }}
              className="btn btn-warning"
            >
              Generate new array
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
