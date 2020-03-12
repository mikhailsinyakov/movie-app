import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ScrollRestoration from "./ScrollRestoration";
import HomeScreen from "screens/Home";
import MovieScreen from "screens/Movie";

const App = () => (
  <Router>
    <ScrollRestoration />
    <Route exact path="/">
      <HomeScreen />
    </Route>
    <Route path="/movie/:id">
      <MovieScreen />
    </Route>
  </Router>
);

export default App;
