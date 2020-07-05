import React, { Component } from "react";
import Grid from "./grid";
import Navbar from "./pathfindernavbar";
import { dijkstras, tracePath } from "../../algorithms/dijkstras";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let NUMBER_OF_ROWS = Math.floor(windowHeight * 0.0304);
let NUMBER_OF_NODES = Math.ceil(windowWidth * 0.0366);
console.log("number of rows, number of nodes", NUMBER_OF_ROWS, NUMBER_OF_NODES);
const StartNodeRow = 1;
const StartNodeCol = 5;
const FinishNodeRow = 9;
const FinishNodeCol = 45;

class Pathfinding extends Component {
  state = { grid: [] };

  // Creates a new grid on mount
  componentDidMount() {
    const grid = this.getNewGrid();
    this.setState({ grid });
  }

  getNewGrid = () => {
    let grid = [];
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      const thisRow = [];
      for (let col = 0; col < NUMBER_OF_NODES; col++) {
        thisRow.push(this.createNode(row, col));
      }
      grid.push(thisRow);
    }
    return grid;
  };

  createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === StartNodeRow && col === StartNodeCol,
      isFinish: row === FinishNodeRow && col === FinishNodeCol,
      distance: Infinity,
      visited: "false",
      iswall: "false",
      previousnode: null,
    };
  };

  animateDijkstras = () => {
    const { grid } = this.state;
    const startNode = grid[StartNodeRow][StartNodeCol];
    const finishNode = grid[FinishNodeRow][FinishNodeCol];
    const visitedNodesInOrder = dijkstras(grid, startNode, finishNode);
    const path = tracePath(finishNode);
    //Animates search
    for (let i = 0; i < visitedNodesInOrder.length; i++)
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        let toAnimate = document.getElementById(`node-${node.row}-${node.col}`);
        let className = toAnimate.className;
        toAnimate.className =
          className === "node start"
            ? "node start"
            : className === "node finish"
            ? "node finish finished"
            : "node animated-node";
      }, i * 5);
    // Animates path
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        let cancelAnimations = document.getElementsByClassName(
          "node animated-node"
        );
        for (let j = 0; j < cancelAnimations.length; j++) {
          cancelAnimations[j].className = "node";
        }
        const node = path[i];
        let toAnimate = document.getElementById(`node-${node.row}-${node.col}`);
        setTimeout(() => {
          toAnimate.className = "node animated-path";
        }, i * 20);
      }, visitedNodesInOrder.length * 5);
    }
  };

  render() {
    const { grid } = this.state;
    return (
      <React.Fragment>
        <Navbar animate={this.animateDijkstras} />
        <Grid grid={grid} />
      </React.Fragment>
    );
  }
}

export default Pathfinding;
