import React, { Component } from "react";
import Node from "./node";
import "./pathfinding.css";

class Grid extends Component {
  state = {};
  render() {
    return (
      <div className="grid">
        {this.props.grid.map((row, rowidx) => {
          return (
            <div className="row" key={rowidx}>
              {row.map((node, nodeidx) => {
                const {
                  row,
                  col,
                  isStart,
                  isFinish,
                  weight,
                  visited,
                  isWall,
                  previousNode,
                } = node;
                return (
                  <Node
                    key={nodeidx}
                    row={row}
                    col={col}
                    weight={weight}
                    visited={visited}
                    isWall={isWall}
                    previousNode={previousNode}
                    node={node}
                    isStart={isStart}
                    isFinish={isFinish}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Grid;
