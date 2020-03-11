import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getMoviesList } from "api/movieAPI";
import { withLanguageContext } from "./Language";
import HomeScreen from "screens/Home";
import MovieScreen from "screens/Movie";

const moviesDataCache = {};

const App = ({ language }) => {
  const [loading, setLoading] = useState(false);
  const initialMoviesData = {
    page: 0,
    total_pages: 0,
    results: []
  };
  const [moviesData, setMoviesData] = useState(initialMoviesData);

  const fetchMoviesData = (page = 1) => {
    if (page === 1 && moviesDataCache[language]) {
      setMoviesData(moviesDataCache[language]);
    } else {
      setLoading(true);
      const { cancel, promise } = getMoviesList({ language, page });
      (async () => {
        try {
          const newMoviesData = await promise;
          const moviesDataToSave = {
            ...newMoviesData,
            results: [...moviesData.results, ...newMoviesData.results]
          };
          moviesDataCache[language] = moviesDataToSave;
          setMoviesData(moviesDataToSave);
          setLoading(false);
        } catch (e) {
          console.error(e);
        }
      })();
      return () => cancel("Component has unmounted");
    }
  };

  useEffect(fetchMoviesData, []);

  useEffect(() => {
    setMoviesData(initialMoviesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (!moviesData.results.length) {
      return fetchMoviesData();
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
      <Route path="/movie/:id">
        <MovieScreen />
      </Route>
    </Router>
  );
};

App.propTypes = {
  language: PropTypes.string.isRequired
};

export default withLanguageContext(App);
