import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "screens/Home";
import MovieScreen from "screens/Movie";

const App = () => (
  <Router>
    <Route exact path="/">
      <HomeScreen />
    </Route>
    <Route path="/movie/:id">
      <MovieScreen />
    </Route>
  </Router>
);

export default App;
