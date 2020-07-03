import React, { Component } from "react";
import { Route } from "react-router-dom";
import Select from "./components/select";
import Sorting from "./components/sorting/sorting";
import Pathfinding from "./components/pathfinding/pathfinding";

class App extends Component {
  state = { hidden: false };

  disableLinks = () => {
    if (this.state.hidden === false) {
      this.setState({ hidden: true });
    } else {
      this.setState({ hidden: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Select hidden={this.state.hidden} />
        <Route
          exact
          path="/sorting"
          render={(routeProps) => (
            <Sorting {...routeProps} disableLinks={this.disableLinks} />
          )}
        />
        <Route
          exact
          path="/pathfinding"
          render={(routeProps) => (
            <Pathfinding {...routeProps} disableLinks={this.disableLinks} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default App;
