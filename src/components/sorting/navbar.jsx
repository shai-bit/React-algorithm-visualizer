import React, { Component } from "react";
import "./sorting.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Navbar extends Component {
  render() {
    let collapsed = "";

    // Checks props to update navbar visibility dynamically
    collapsed +=
      this.props.collapsed === false ? "navbar-collapse" : "collapse";
    const { selectAlgorithm, onReset, onStart, hideNavbar } = this.props;
    const buttonStyle = {
      margin: "10px",
    };

    return (
      <nav className="navbar navbar-expand-lg">
        <button
          className="navbar-toggler hidden-sm-up"
          type="button"
          onClick={() => hideNavbar()}
        >
          &#9776;
        </button>
        {/* Dynamic class */}
        <div className={collapsed}>
          <button
            onClick={() => selectAlgorithm("quicksort")}
            type="button"
            className="btn btn-outline-dark"
            style={buttonStyle}
          >
            Quicksort
          </button>
          <button
            onClick={() => selectAlgorithm("mergesort")}
            type="button"
            className="btn btn-outline-dark"
            style={buttonStyle}
          >
            Mergesort
          </button>
          <button
            onClick={() => selectAlgorithm("bubblesort")}
            type="button"
            className="btn btn-outline-dark"
            style={buttonStyle}
          >
            Bubblesort
          </button>
          <button
            onClick={() => selectAlgorithm("heapsort")}
            type="button"
            className="btn btn-outline-dark"
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
            style={buttonStyle}
            className="btn btn-warning"
          >
            Generate new array
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
