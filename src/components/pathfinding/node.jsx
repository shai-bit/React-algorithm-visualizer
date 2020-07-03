import React, { Component } from "react";
import "./pathfinding.css";

class Node extends Component {
  render() {
    const {
      row,
      col,
      weight,
      visited,
      isWall,
      previousNode,
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
        isWall={isWall}
        weight={weight}
        visited={visited}
        previousNode={previousNode}
      ></div>
    );
  }
}

export default Node;
