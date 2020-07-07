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
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    } = this.props;
    let startorfinish = isStart
      ? "node start"
      : isFinish
      ? "node finish"
      : iswall === "true"
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
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseDown={() => onMouseDown(node, row, col)}
        onMouseUp={() => onMouseUp(row, col)}
        onTouchStart={() => onTouchStart(node, row, col)}
        onTouchMove={() => onTouchMove(row, col)}
        onTouchEnd={() => onTouchEnd(row, col)}
      ></div>
    );
  }
}

export default Node;
