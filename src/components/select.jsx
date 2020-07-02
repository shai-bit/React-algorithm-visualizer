import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sorting/sorting.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Select extends Component {
  render() {
    return (
      <div className="select-buttons">
        <button type="button" className="links btn btn-dark">
          <Link style={{ color: "white" }} to="/sorting">
            Sorting Algorithms
          </Link>
        </button>
        <button type="button" className="links btn btn-dark">
          <Link style={{ color: "white" }} to="/pathfinding">
            Pathfinding
          </Link>
        </button>
      </div>
    );
  }
}

export default Select;
