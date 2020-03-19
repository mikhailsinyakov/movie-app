import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import MovieOverview from "./MovieOverview";
import Button from "shared/Button";
import Error from "components/Error";
import { CategoryContext } from "components/Category";
import { getMoviesList } from "api/movieAPI";
import * as cache from "homePageCache";

const Wrapper = styled.div`
  text-align: center;
  padding-bottom: 1rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const MoviesList = ({ className }) => {
  const { category } = useContext(CategoryContext);
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
    if (cache.has(language, category)) {
      const initMoviesData = cache.get(language, category);
      setMoviesData(initMoviesData);
      cache.clear();
    } else {
      getMoviesList({ category, language })
        .then(initMoviesData => {
          !ignore && setMoviesData(initMoviesData);
        })
        .catch(setError);
    }
    return () => (ignore = true);
  }, [language, category]);
  
  useEffect(() => {
    cache.set(language, category, moviesData);
  }, [language, category, moviesData]);

  const addMoviesData = () => {
    getMoviesList({ category, language, page: moviesData.page + 1 })
      .then(newMoviesData => {
        newMoviesData.results = [
          ...moviesData.results,
          ...newMoviesData.results
        ];
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
