import React, { Component } from "react";
import "./pathfinding.css";

class Node extends Component {
  render() {
    const { node, nodeidx, rowidx, isStart, isFinish } = this.props;
    let startorfinish = isStart
      ? "node start"
      : isFinish
      ? "node finish"
      : "node";
    return (
      <div
        className={startorfinish}
        node={node}
        nodeidx={nodeidx}
        rowidx={rowidx}
      ></div>
    );
  }
}

export default Node;
