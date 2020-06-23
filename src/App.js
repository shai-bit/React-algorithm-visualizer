import React, { Component } from "react";
import Array from "./components/array";
import Navbar from "./components/navbar";
import * as sortingAlgorithms from "./algorithms/quicksort";
class App extends Component {
  state = {
    array: [],
    algorithm: "",
  };

  //Creates the random array when app is loaded
  componentDidMount() {
    const array = [];
    for (let i = 0; i < 250; i++) {
      array.push(this.getRandomInt(5, 500));
    }
    this.setState({ array });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  changeAlgorithm = (chosen) => {
    this.setState({ algorithm: chosen });
  };

  //Gets and updates new random array
  onReset = () => {
    const array = [];
    for (let i = 0; i < 250; i++) {
      array.push(this.getRandomInt(5, 500));
    }
    this.setState({ array });
  };

  startSort = () => {
    const chosenAlgorithm = this.state.algorithm;
    const array = this.state.array;
    if (chosenAlgorithm.length > 0) {
      if (chosenAlgorithm === "quicksort") {
        let barsArray = document.getElementsByClassName("bar");
        console.log(barsArray);
        let results = sortingAlgorithms.getQuicksortAnimations(array);
        console.log("sorted array", results[0]);
        console.log("animations", results[1]);
        //this.setState({ array: results[0] });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          selectAlgorithm={this.changeAlgorithm}
          onStart={this.startSort}
          onReset={this.onReset}
        />
        <Array randomArray={this.state.array} />;
      </React.Fragment>
    );
  }
}

export default App;
