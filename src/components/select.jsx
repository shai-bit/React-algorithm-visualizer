import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sorting/sorting.css";

class Select extends Component {
  render() {
    let hidden = this.props.hidden === false ? "link-enabled" : "link-disabled";
    return (
      <div className="select-buttons">
        <Link className={`link ${hidden}`} to="/pathfinding/welcome">
          Pathfinding
        </Link>
        <Link className={`link ${hidden}`} to="/sorting/welcome">
          Sorting Algorithms
        </Link>
      </div>
    );
  }
}

export default Select;
