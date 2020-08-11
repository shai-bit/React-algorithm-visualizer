import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Select from "./components/select";
import Sorting from "./components/sorting/sorting";
import Pathfinding from "./components/pathfinding/pathfinding";
import Popup from "./components/popup/popup";
import history from "./components/history";

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
        <BrowserRouter history={history}>
          <Select hidden={this.state.hidden} />
          <Route
            exact
            path="/sorting"
            render={(routeProps) => (
              <Sorting {...routeProps} disableLinks={this.disableLinks} />
            )}
          />
          <Route
            path="/pathfinding"
            render={(routeProps) => (
              <Pathfinding {...routeProps} disableLinks={this.disableLinks} />
            )}
          />
          <Route path="/pathfinding/welcome" component={Popup} />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
