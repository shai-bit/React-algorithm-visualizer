import React, { Component } from "react";
import "./sorting.css";

class Bars extends Component {
  render() {
    const { number } = this.props;
    return <div className="bar" style={{ height: `${number}px` }}></div>;
  }
}

export default Bars;
