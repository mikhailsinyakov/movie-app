import React from "react";
import PropTypes from "prop-types";
import { withLanguageContext } from "../Language";
import MovieOverview from "./MovieOverview";
import Button from "../../shared/Button";
import { isNull } from "../../helpers/customPropCheckers";

const MoviesList = ({ getUIText, moviesData, getMoreMovies }) => {
  const { list, loading, completed } = moviesData;

  return (
    <div>
      {list.map(movie => (
        <MovieOverview key={movie.id} movie={movie} />
      ))}
      {loading ? (
        <div>{getUIText("loading")}...</div>
      ) : !completed ? (
        <Button onClick={getMoreMovies}>{getUIText("more")}</Button>
      ) : null}
    </div>
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

export default withLanguageContext(MoviesList);
