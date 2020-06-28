import React, { Component } from "react";
import { Route } from "react-router-dom";
import Select from "./components/select";
import Sorting from "./components/sorting";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Select />
        <Route exact path="/sorting" component={Sorting} />
      </React.Fragment>
    );
  }
}

export default App;
