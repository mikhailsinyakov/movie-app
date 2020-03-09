import React from "react";
import PropTypes from "prop-types";

const Title = ({ title, original_title, rating }) => (
  <div>
    <span>
      {title} {title !== original_title && `(${original_title})`}
    </span>
    <span>{rating.toFixed(1)}</span>
  </div>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default Title;
