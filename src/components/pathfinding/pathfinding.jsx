import React, { Component } from "react";
import Grid from "./grid";
import Navbar from "./pathfindernavbar";
import { dijkstras, tracePath } from "../../algorithms/dijkstras";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let NUMBER_OF_ROWS = Math.floor(windowHeight * 0.0304);
let NUMBER_OF_NODES = Math.ceil(windowWidth * 0.0366);
console.log("number of rows, number of nodes", NUMBER_OF_ROWS, NUMBER_OF_NODES);

class Pathfinding extends Component {
  state = {
    grid: [],
    clicked: false,
    startNodeRow: 5,
    startNodeCol: 5,
    finishNodeRow: 5,
    finishNodeCol: 30,
    changingStart: false,
    changingFinish: false,
  };

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
    const {
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
    } = this.state;
    return {
      row,
      col,
      isStart: row === startNodeRow && col === startNodeCol,
      isFinish: row === finishNodeRow && col === finishNodeCol,
      distance: Infinity,
      visited: "false",
      iswall: false,
      previousnode: null,
    };
  };

  handleMouseDown(node, row, col) {
    // Avoids making start or finish a wall
    if (node.isStart) {
      let newGrid = this.getNewStart(this.state.grid, row, col);
      this.setState({ changingStart: true, grid: newGrid, clicked: true });
      return;
    }
    if (node.isFinish) {
      let newGrid = this.getNewFinish(this.state.grid, row, col);
      this.setState({ changingFinish: true, grid: newGrid, clicked: true });
      return;
    }
    let newGrid = this.getNewGridWithWalls(this.state.grid, row, col);
    this.setState({ grid: newGrid, clicked: true });
  }

  handleMouseUp(row, col) {
    if (this.state.changingStart) {
      let newGrid = this.getNewStart(this.state.grid, row, col);
      this.setState({
        changingStart: false,
        grid: newGrid,
        startNodeRow: row,
        startNodeCol: col,
      });
    } else if (this.state.changingFinish) {
      let newGrid = this.getNewFinish(this.state.grid, row, col);
      this.setState({
        changingFinish: false,
        grid: newGrid,
        finishNodeRow: row,
        finishNodeCol: col,
      });
    }
    this.setState({ clicked: false });
  }

  // Creating walls by hovering over them when mouse is clicked
  handleMouseEnter(node, row, col) {
    if (!this.state.clicked) return;
    // Avoids making start or finish a wall
    if (this.state.changingStart || this.state.changingFinish) return;
    let newGrid = this.getNewGridWithWalls(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  getNewStart(grid, row, col) {
    let newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isStart: !node.isStart };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  getNewFinish(grid, row, col) {
    let newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isFinish: !node.isFinish };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  getNewGridWithWalls(grid, row, col) {
    let newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, iswall: !node.iswall };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  animateDijkstras = () => {
    const {
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
    } = this.state;
    const { grid } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
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
        <Navbar animate={() => this.animateDijkstras()} />
        <Grid
          grid={grid}
          onMouseEnter={(node, row, col) =>
            this.handleMouseEnter(node, row, col)
          }
          onMouseDown={(node, row, col) => this.handleMouseDown(node, row, col)}
          onMouseUp={(row, col) => this.handleMouseUp(row, col)}
        />
      </React.Fragment>
    );
  }
}

export default Pathfinding;
