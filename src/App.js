import React, { Component } from "react";
import { Route } from "react-router-dom";
import Select from "./components/select";
import Sorting from "./components/sorting/sorting";
import Pathfinding from "./components/pathfinding/pathfinding";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Select />
        <Route exact path="/sorting" component={Sorting} />
        <Route exact path="/pathfinding" component={Pathfinding} />
      </React.Fragment>
    );
  }
}

export default App;
