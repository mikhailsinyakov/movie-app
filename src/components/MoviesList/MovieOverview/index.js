import React from "react";
import PropTypes from "prop-types";
import { isNull } from "../../../helpers/customPropCheckers";
import Poster from "./Poster";
import Info from "./Info";

const MovieOverview = ({ movie }) => (
  <div>
    <Poster source={movie.poster_src} title={movie.title} />
    <Info
      title={movie.title}
      rating={movie.vote_average}
      genres={movie.genres}
    />
  </div>
);

MovieOverview.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    poster_src: PropTypes.oneOfType([PropTypes.string, isNull]),
    vote_average: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string)
  })
};

export default MovieOverview;
