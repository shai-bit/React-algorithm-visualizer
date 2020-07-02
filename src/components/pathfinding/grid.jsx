import React, { Component } from "react";
import Node from "./node";
import "./pathfinding.css";

class Grid extends Component {
  state = {};
  render() {
    return (
      <div className="grid">
        {this.props.nodes.map((row, rowidx) => {
          return (
            <div className="row" key={rowidx}>
              {row.map((node, nodeidx) => {
                const { isStart, isFinish } = node;
                return (
                  <Node
                    key={nodeidx}
                    rowidx={rowidx}
                    node={node}
                    nodeidx={nodeidx}
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
