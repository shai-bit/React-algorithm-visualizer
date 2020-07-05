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
      onMouseEnter,
      onMouseDown,
      onMouseUp,
    } = this.props;
    let startorfinish = isStart
      ? "node start"
      : isFinish
      ? "node finish"
      : iswall
      ? "node wall"
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
        onMouseEnter={() => onMouseEnter(node, row, col)}
        onMouseDown={() => onMouseDown(node, row, col)}
        onMouseUp={() => onMouseUp(row, col)}
      ></div>
    );
  }
}

export default Node;
