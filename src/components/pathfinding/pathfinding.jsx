import React, { Component } from "react";
import Grid from "./grid";
import Navbar from "./pathfindernavbar";
import { dijkstras, tracePath } from "../../algorithms/dijkstras";
import {
  clearPassages,
  generateMaze,
  getOrientation,
} from "../../algorithms/mazegen";
import history from "../history";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let NUMBER_OF_ROWS = Math.floor(windowHeight * 0.0304);
let NUMBER_OF_NODES = Math.ceil(windowWidth * 0.0366);

class Pathfinding extends Component {
  state = {
    grid: [],
    animating: false,
    animated: false,
    clicked: false,
    startNodeRow: Math.floor(NUMBER_OF_ROWS / 2),
    startNodeCol: Math.floor(NUMBER_OF_NODES / 5),
    finishNodeRow: Math.floor(NUMBER_OF_ROWS / 2),
    finishNodeCol: NUMBER_OF_NODES - Math.floor(NUMBER_OF_NODES / 5) - 1,
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
      iswall: "false",
      previousnode: null,
    };
  };

  handleMouseDown(node, row, col) {
    if (this.state.animated) return;
    // Changes node depending on its attributes
    if (node.isStart) {
      let newGrid = this.getNewStart(this.state.grid, row, col);
      this.setState({ changingStart: true, grid: newGrid, clicked: true });
      return;
    } else if (node.isFinish) {
      let newGrid = this.getNewFinish(this.state.grid, row, col);
      this.setState({ changingFinish: true, grid: newGrid, clicked: true });
      return;
    } else {
      let newGrid = this.getNewGridWithWalls(this.state.grid, row, col);
      this.setState({ grid: newGrid, clicked: true });
    }
  }

  // Reverses node.isStart
  getNewStart(grid, row, col) {
    let newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isStart: !node.isStart };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  // Reverses node.isFinish
  getNewFinish(grid, row, col) {
    let newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isFinish: !node.isFinish };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  // Creating walls by hovering over them when mouse is clicked
  handleMouseEnter(row, col) {
    if (!this.state.clicked) return;
    // Avoids making start or finish a wall
    if (this.state.changingStart || this.state.changingFinish) return;
    let newGrid = this.getNewGridWithWalls(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  getNewGridWithWalls(grid, row, col) {
    let newGrid = grid.slice();
    const node = newGrid[row][col];
    if (node.iswall === "false") node.iswall = "true";
    else node.iswall = "false";
    newGrid[row][col] = node;
    return newGrid;
  }

  // Handles start or finish change
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

  animateDijkstras = () => {
    const {
      grid,
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
    } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = dijkstras(grid, startNode, finishNode);
    const path = tracePath(finishNode);
    if (!path) {
      history.push("/pathfinding/warning");
      return;
    }
    let animationsSave = [];
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
            ? "node finish"
            : "node animated-node";
        if (toAnimate.className === "node animated-node")
          animationsSave.push(toAnimate);
      }, i * 5);

    // Animates path
    for (let i = 0; i < path.length; i++)
      setTimeout(() => {
        for (let j = 0; j < animationsSave.length; j++) {
          animationsSave[j].className = "node";
        }
        const node = path[i];
        let toAnimate = document.getElementById(`node-${node.row}-${node.col}`);
        setTimeout(() => {
          toAnimate.className = "node animated-path";
        }, i * 20);
      }, visitedNodesInOrder.length * 5);
    setTimeout(() => {
      this.props.disableLinks();
      this.setState({ animating: false });
    }, visitedNodesInOrder.length * 5);
    this.props.disableLinks();
    this.setState({ animated: true, animating: true });
  };

  clearGrid(grid) {
    if (this.state.animated) {
      const { finishNodeCol, finishNodeRow } = this.state;
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const path = tracePath(finishNode);
      for (let i = 0; i < path.length; i++) {
        const node = path[i];
        let toAnimate = document.getElementById(`node-${node.row}-${node.col}`);
        toAnimate.className = "node";
      }
    }
    let newGrid = grid.slice();
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[0].length; j++) {
        let node = newGrid[i][j];
        let newNode = {
          ...node,
          iswall: "false",
          visited: "false",
          distance: Infinity,
          previousnode: null,
        };
        newGrid[i][j] = newNode;
      }
    }
    return newGrid;
  }

  getMaze() {
    const {
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
    } = this.state;
    let grid = this.getNewGrid();
    let passages = [
      [startNodeRow, startNodeCol],
      [finishNodeRow, finishNodeCol],
    ];
    generateMaze(
      grid,
      0,
      0,
      NUMBER_OF_NODES,
      NUMBER_OF_ROWS,
      getOrientation(NUMBER_OF_NODES, NUMBER_OF_ROWS),
      passages
    );
    clearPassages(grid, passages, NUMBER_OF_NODES - 1, NUMBER_OF_ROWS - 1);
    this.setState({ grid });
  }

  render() {
    const { grid, animated, animating } = this.state;
    return (
      <React.Fragment>
        <Navbar
          generateMaze={() => this.getMaze()}
          animate={() => this.animateDijkstras()}
          clearPath={() => {
            let newGrid = this.clearGrid(grid);
            this.setState({ grid: newGrid, animated: false });
          }}
          animated={animated}
          animating={animating}
        />
        <Grid
          grid={grid}
          onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
          onMouseDown={(node, row, col) => this.handleMouseDown(node, row, col)}
          onMouseUp={(row, col) => this.handleMouseUp(row, col)}
          onTouchStart={(node, row, col) =>
            this.handleMouseDown(node, row, col)
          }
          onTouchMove={(row, col) => this.handleMouseEnter(row, col)}
          onTouchEnd={(row, col) => this.handleMouseUp(row, col)}
        />
      </React.Fragment>
    );
  }
}

export default Pathfinding;
