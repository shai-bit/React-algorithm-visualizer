import React, { Component } from "react";
import "./pathfinding.css";

class Node extends Component {
  render() {
    const {
      row,
      col,
      distance,
      visited,
      iswall,
      previousnode,
      node,
      isStart,
      isFinish,
    } = this.props;
    let startorfinish = isStart
      ? "node start"
      : isFinish
      ? "node finish"
      : "node";
    return (
      <div
        id={`node-${row}-${col}`}
        className={startorfinish}
        node={node}
        row={row}
        col={col}
        iswall={iswall}
        distance={distance}
        visited={visited}
        previousnode={previousnode}
      ></div>
    );
  }
}

export default Node;
