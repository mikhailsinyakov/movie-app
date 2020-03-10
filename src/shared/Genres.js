import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Genre = styled.span`
  background-color: #335433;
  padding: 0.2rem;
  margin: 0.2rem;
  border-radius: 0.3rem;
`;

const capitalizeFirstLetter = word => word[0].toUpperCase() + word.slice(1);

const Genres = ({ genres, className }) => (
  <p className={className}>
    {genres.map((genre, i) => (
      <Genre key={i}>{capitalizeFirstLetter(genre)}</Genre>
    ))}
  </p>
);

Genres.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

const StyledGenres = styled(Genres)`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  font-size: 0.8rem;
`;

export default StyledGenres;
