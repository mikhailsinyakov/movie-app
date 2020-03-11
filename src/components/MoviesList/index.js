import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withLanguageContext } from "../Language";
import MovieOverview from "./MovieOverview";
import Button from "shared/Button";
import { isNull } from "helpers/customPropCheckers";

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

const MoviesList = ({ getUIText, moviesData, getMoreMovies, className }) => {
  const { list, loading, completed } = moviesData;

  return (
    <Wrapper>
      <div className={className}>
        {list.map(movie => (
          <MovieOverview key={movie.id} movie={movie} />
        ))}
      </div>
      {loading ? (
        <Loading>{getUIText("loading")}...</Loading>
      ) : !completed ? (
        <Button onClick={getMoreMovies}>{getUIText("more")}</Button>
      ) : null}
    </Wrapper>
  );
};

MoviesList.propTypes = {
  getUIText: PropTypes.func.isRequired,
  moviesData: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        poster_src: PropTypes.oneOfType([PropTypes.string, isNull]),
        vote_average: PropTypes.number,
        genres: PropTypes.arrayOf(PropTypes.string)
      })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  getMoreMovies: PropTypes.func.isRequired
};

const StyledMoviesList = styled(MoviesList)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default withLanguageContext(StyledMoviesList);
