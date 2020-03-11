import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withLanguageContext } from "../Language";
import MovieOverview from "./MovieOverview";
import Button from "shared/Button";
import { getMoviesList } from "api/movieAPI";
import cache from "cache";

const Wrapper = styled.div`
  text-align: center;
  padding-bottom: 1rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const MoviesList = ({ language, getUIText, className }) => {
  const [moviesData, setMoviesData] = useState({
    page: 0,
    total_pages: 0,
    results: []
  });

  const fetchMoviesData = (page = 1) => {
    if (page === 1 && cache.has("movies", "latest", language)) {
      setMoviesData(cache.get("movies", "latest", language));
    } else {
      const { cancel, promise } = getMoviesList({ language, page });
      (async () => {
        try {
          const newMoviesData = await promise;
          if (page === moviesData.page + 1) {
            newMoviesData.results = [
              ...moviesData.results,
              ...newMoviesData.results
            ];
          }
          cache.set("movies", "latest", language, newMoviesData);
          setMoviesData(newMoviesData);
        } catch (e) {
          console.error(e);
        }
      })();
      return () => cancel("Component has unmounted");
    }
  };
  const getMoreMovies = () => fetchMoviesData(moviesData.page + 1);

  useEffect(fetchMoviesData, [language]);

  return (
    <Wrapper>
      <div className={className}>
        {moviesData.results.map(movie => (
          <MovieOverview key={movie.id} movie={movie} />
        ))}
      </div>
      {moviesData.page !== moviesData.total_pages ? (
        <Button onClick={getMoreMovies}>{getUIText("more")}</Button>
      ) : null}
    </Wrapper>
  );
};

MoviesList.propTypes = {
  language: PropTypes.string.isRequired,
  getUIText: PropTypes.func.isRequired
};

const StyledMoviesList = styled(MoviesList)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default withLanguageContext(StyledMoviesList);
