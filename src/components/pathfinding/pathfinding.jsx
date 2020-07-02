import React, { Component } from "react";
import Grid from "./grid";
import Navbar from "./pathfindernavbar";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let numberofRows = Math.ceil(windowHeight * 0.024);
let numberofNodes = Math.ceil(windowWidth * 0.0366);

class Pathfinding extends Component {
  state = { nodes: [] };

  componentDidMount() {
    let nodes = [];
    for (let row = 0; row < numberofRows; row++) {
      const thisRow = [];
      for (let node = 0; node < numberofNodes; node++) {
        const thisNode = {
          row,
          node,
          isStart: row === 6 && node === 5,
          isFinish: row === 6 && node === 45,
        };
        thisRow.push(thisNode);
      }
      nodes.push(thisRow);
    }
    this.setState({ nodes });
  }

  render() {
    const { nodes } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <Grid nodes={nodes} />
      </React.Fragment>
    );
  }
}

export default Pathfinding;
