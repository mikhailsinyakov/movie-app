import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollRestoration from "./ScrollRestoration";
import HomeScreen from "screens/Home";
import MovieScreen from "screens/Movie";
import NotFoundScreen from "screens/NotFound";

const App = () => (
  <Router>
    <ScrollRestoration />
    <Switch>
      <Route exact path="/">
        <HomeScreen />
      </Route>
      <Route path="/movie/:id">
        <MovieScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  </Router>
);

export default App;
