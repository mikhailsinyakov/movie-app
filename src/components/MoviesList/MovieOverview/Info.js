import React from "react";
import PropTypes from "prop-types";

const Info = ({ title, rating, genres }) => (
  <div>
    <p>
      {title}
      <span>{rating}</span>
    </p>
    <p>
      {genres.map((genre, i) => (
        <span key={i}>{genre}</span>
      ))}
    </p>
  </div>
);

Info.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Info;
