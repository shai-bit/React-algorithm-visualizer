import React, { Component } from "react";
import Bars from "./bars";
import "./sorting.css";

class Array extends Component {
  render() {
    return (
      <div className="arraycontainer">
        {this.props.randomArray.map((e, index) => (
          <Bars key={index} number={e} />
        ))}
      </div>
    );
  }
}

export default Array;
