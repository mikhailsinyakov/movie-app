import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import MovieOverview from "./MovieOverview";
import Button from "shared/Button";
import Error from "components/Error";
import { getMoviesList } from "api/movieAPI";
import cache from "cache";

const Wrapper = styled.div`
  text-align: center;
  padding-bottom: 1rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const MoviesList = ({ className }) => {
  const { t, i18n: { language } } = useTranslation();
  const isMounted = useRef(false);
  const [moviesData, setMoviesData] = useState({
    page: 0,
    total_pages: 0,
    results: []
  });

  const [error, setError] = useState(null);
  
  useEffect(() => {
    window.document.title = t("appName");
  }, [t]);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    let ignore = false;
    if (cache.has("movies", "latest", language)) {
      setMoviesData(cache.get("movies", "latest", language));
    } else {
      getMoviesList({ language })
        .then(initMoviesData => {
          cache.set("movies", "latest", language, initMoviesData);
          !ignore && setMoviesData(initMoviesData);
        })
        .catch(setError);
    }
    return () => (ignore = true);
  }, [language]);

  const addMoviesData = () => {
    getMoviesList({ language, page: moviesData.page + 1 })
      .then(newMoviesData => {
        newMoviesData.results = [
          ...moviesData.results,
          ...newMoviesData.results
        ];
        cache.set("movies", "latest", language, newMoviesData);
        isMounted.current && setMoviesData(newMoviesData);
      })
      .catch(setError);
  };

  return (
    <Wrapper>
      <div className={className}>
        {moviesData.results.map(movie => (
          <MovieOverview key={movie.id} movie={movie} />
        ))}
      </div>
      {error && <Error />}
      {moviesData.page !== moviesData.total_pages && !error ? (
        <Button onClick={addMoviesData}>{t("more")}</Button>
      ) : null}
    </Wrapper>
  );
};

const StyledMoviesList = styled(MoviesList)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default StyledMoviesList;
