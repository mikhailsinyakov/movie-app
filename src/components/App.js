import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getMoviesList } from "../api/movieAPI";
import { withLanguageContext } from "./Language";
import HomeScreen from "../screens/Home";

const App = ({ language }) => {
  const [loading, setLoading] = useState(false);
  const initialMoviesData = {
    page: 0,
    total_pages: 0,
    results: []
  };
  const [moviesData, setMoviesData] = useState(initialMoviesData);

  const fetchMoviesData = (page = 1) => {
    setLoading(true);
    const { cancel, promise } = getMoviesList({ language, page });
    (async () => {
      try {
        const newMoviesData = await promise;
        setMoviesData({
          ...newMoviesData,
          results: [...moviesData.results, ...newMoviesData.results]
        });
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => cancel("Component has unmounted");
  };

  useEffect(fetchMoviesData, []);

  useEffect(() => {
    setMoviesData(initialMoviesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (!moviesData.results.length) {
      fetchMoviesData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesData]);

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
