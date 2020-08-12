import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
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
        <Router history={history}>
          <Select hidden={this.state.hidden} />
          <Route render={() => <Redirect to="/pathfinding/welcome" />} />
          <Route
            path="/sorting"
            render={(routeProps) => (
              <Sorting {...routeProps} disableLinks={this.disableLinks} />
            )}
          />
          <Route
            path="/sorting/welcome"
            render={(routeProps) => (
              <Popup
                {...routeProps}
                styling={"algorithms"}
                header={"Welcome!"}
                content={"Choose an algorithm and click start."}
                linkTo={"/sorting"}
                onDismiss={() => history.push("/sorting")}
              />
            )}
          />
          <Route
            path="/pathfinding"
            render={(routeProps) => (
              <Pathfinding {...routeProps} disableLinks={this.disableLinks} />
            )}
          />
          <Route
            path="/pathfinding/welcome"
            render={(routeProps) => (
              <Popup
                {...routeProps}
                styling={"welcome"}
                header={"Welcome!"}
                content={
                  "You can create walls and move start/finish by clicking or dragging."
                }
                linkTo={"/pathfinding"}
                onDismiss={() => history.push("/pathfinding")}
              />
            )}
          />
          <Route
            path="/pathfinding/warning"
            render={(routeProps) => (
              <Popup
                {...routeProps}
                styling={"warning"}
                header={"Sorry!"}
                content={"༼ つ ಥ_ಥ ༽つ No path found"}
                linkTo={"/pathfinding"}
                onDismiss={() => history.push("/pathfinding")}
              />
            )}
          />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
