import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withLanguageContext } from "../Language";
import MovieOverview from "./MovieOverview";
import Button from "shared/Button";
import { getMoviesList } from "api/movieAPI";
import cache from "cache";

const Loading = styled.div`
  text-align: center;
  text-shadow: 0 0 10px black;
  color: #ded6ca;
  padding: 3rem;
`;

const Wrapper = styled.div`
  text-align: center;
  padding-bottom: 1rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const MoviesList = ({ language, getUIText, className }) => {
  const [loading, setLoading] = useState(false);
  const initialMoviesData = {
    page: 0,
    total_pages: 0,
    results: []
  };
  const [moviesData, setMoviesData] = useState(initialMoviesData);

  const fetchMoviesData = (page = 1) => {
    if (page === 1 && cache.has("movies", "latest", language)) {
      setMoviesData(cache.get("movies", "latest", language));
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
          cache.set("movies", "latest", language, moviesDataToSave);
          setMoviesData(moviesDataToSave);
          setLoading(false);
        } catch (e) {
          console.error(e);
        }
      })();
      return () => cancel("Component has unmounted");
    }
  };
  const getMoreMovies = () => fetchMoviesData(moviesData.page + 1);

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
    <Wrapper>
      <div className={className}>
        {moviesData.results.map(movie => (
          <MovieOverview key={movie.id} movie={movie} />
        ))}
      </div>
      {loading ? (
        <Loading>{getUIText("loading")}...</Loading>
      ) : moviesData.page !== moviesData.total_pages ? (
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
