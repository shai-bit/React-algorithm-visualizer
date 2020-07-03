import React, { Component } from "react";
import Grid from "./grid";
import Navbar from "./pathfindernavbar";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let numberofRows = Math.ceil(windowHeight * 0.024);
let numberofNodes = Math.ceil(windowWidth * 0.0366);

class Pathfinding extends Component {
  state = { grid: [] };

  componentDidMount() {
    const grid = this.getNewGrid();
    this.setState({ grid });
  }

  getNewGrid = () => {
    let grid = [];
    for (let row = 0; row < numberofRows; row++) {
      const thisRow = [];
      for (let col = 0; col < numberofNodes; col++) {
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
      isStart: row === 6 && col === 5,
      isFinish: row === 6 && col === 45,
      weight: Infinity,
      visited: false,
      isWall: false,
      previousNode: null,
    };
  };

  render() {
    const { grid } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <Grid grid={grid} />
      </React.Fragment>
    );
  }
}

export default Pathfinding;
