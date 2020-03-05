import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getMoviesList } from "../api/movieAPI";
import { withLanguageContext } from "./Language";
import HomeScreen from "../screens/Home";

const App = ({ language }) => {
  const [loading, setLoading] = useState(false);

  const [moviesData, setMoviesData] = useState({
    page: 0,
    total_pages: 1,
    results: []
  });

  const fetchMoviesData = (page = 1) => {
    setLoading(true);
    const { cancel, promise } = getMoviesList({ language, page });
    promise
      .then(newMoviesData => {
        setMoviesData({
          ...newMoviesData,
          results: [...moviesData.results, ...newMoviesData.results]
        });
        setLoading(false);
      })
      .catch(console.error);
    return () => cancel("Component has unmounted");
  };

  useEffect(fetchMoviesData, []);

  return (
    <Router>
      <Route exact path="/">
        <HomeScreen
          moviesData={{
            list: moviesData.results,
            loading,
            completed: moviesData.page === moviesData.total_pages
          }}
          getMoreMovies={() => fetchMoviesData(moviesData.page + 1)}
        />
      </Route>
    </Router>
  );
};

App.propTypes = {
  language: PropTypes.string.isRequired
};

export default withLanguageContext(App);
