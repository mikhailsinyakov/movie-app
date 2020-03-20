import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import MovieOverview from "./MovieOverview";
import Button from "shared/Button";
import Error from "components/Error";
import { getMoviesList, getMoviesListBySearch } from "api/movieAPI";
import { HomeStateContext } from "components/HomeState";

const Wrapper = styled.div`
  text-align: center;
  padding-bottom: 1rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const MoviesList = ({ className }) => {
  const { t, i18n: { language } } = useTranslation();
  const isMounted = useRef(false);
  const { 
    category, moviesData, setMoviesData, 
    isSearchActive, searchQuery, error, setError
  } = useContext(HomeStateContext);
  
  useEffect(() => {
    window.document.title = t("appName");
  }, [t]);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  
  const mergeResults = (results, newResults) => {
    const mergedResults = results;
    for (const newResult of newResults) {
      if (results.findIndex(result => result.id === newResult.id) === -1) {
        mergedResults.push(newResult);
      }
    }
    return mergedResults;
  };

  const addMoviesData = () => {
    if (isSearchActive) {
      getMoviesListBySearch({ 
        query: encodeURIComponent(searchQuery), 
        language, 
        page: moviesData.page + 1 
      }).then(data => {
          data.results = mergeResults(moviesData.results, data.results);
          isMounted.current && setMoviesData(data);
        })
        .catch(setError);
    } else {
      getMoviesList({ category, language, page: moviesData.page + 1 })
        .then(data => {
          data.results = mergeResults(moviesData.results, data.results);
          isMounted.current && setMoviesData(data);
        })
        .catch(setError);
    }
    
  };

  return (
    <Wrapper>
      <div className={className}>
        {moviesData.results.map(movie => (
          <MovieOverview key={movie.id} movie={movie} />
        ))}
      </div>
      {error && <Error />}
      {moviesData.page < moviesData.total_pages && !error ? (
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
