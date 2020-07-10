import React, { Component } from "react";
import Node from "./node";
import "./pathfinding.css";

class Grid extends Component {
  state = {};
  render() {
    return (
      <div className="grid stop">
        {this.props.grid.map((row, rowidx) => {
          return (
            <div className="row stop" key={rowidx}>
              {row.map((node, nodeidx) => {
                const {
                  row,
                  col,
                  isStart,
                  isFinish,
                  distance,
                  visited,
                  iswall,
                  previousnode,
                } = node;
                const {
                  onMouseEnter,
                  onMouseDown,
                  onMouseUp,
                  onTouchStart,
                  onTouchMove,
                  onTouchEnd,
                } = this.props;
                return (
                  <Node
                    onMouseEnter={(row, col) => onMouseEnter(row, col)}
                    onMouseDown={(node, row, col) =>
                      onMouseDown(node, row, col)
                    }
                    onMouseUp={(row, col) => onMouseUp(row, col)}
                    onTouchStart={(node, row, col) =>
                      onTouchStart(node, row, col)
                    }
                    onTouchMove={(row, col) => onTouchMove(row, col)}
                    onTouchEnd={(row, col) => onTouchEnd(row, col)}
                    key={nodeidx}
                    row={row}
                    col={col}
                    distance={distance}
                    visited={visited}
                    iswall={iswall}
                    previousnode={previousnode}
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
