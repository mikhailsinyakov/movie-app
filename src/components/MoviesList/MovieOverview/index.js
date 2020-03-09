import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { isNull } from "../../../helpers/customPropCheckers";
import Poster from "../../../shared/Poster";
import Info from "./Info";

const MovieOverview = ({ movie, className }) => {
  const history = useHistory();
  return (
    <div
      className={className}
      onClick={() => history.push(`/movie/${movie.id}`)}
    >
      <Poster source={movie.poster_src} title={movie.title} />
      <Info
        title={movie.title}
        rating={movie.vote_average}
        genres={movie.genres}
      />
    </div>
  );
};

MovieOverview.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    poster_src: PropTypes.oneOfType([PropTypes.string, isNull]),
    vote_average: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string)
  })
};

const StyledMovieOverview = styled(MovieOverview)`
  width: var(--poster-width);
  margin: 1rem;
  border-radius: 1rem;
  background-color: #442c2c;
  color: #9a9a86;
  height: fit-content;
  cursor: pointer;
  transition: transform 0.5s;

  &:hover {
    transform: translateY(-1rem);
  }
`;

export default StyledMovieOverview;
