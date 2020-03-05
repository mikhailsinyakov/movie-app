import React from "react";
import PropTypes from "prop-types";

const Poster = ({ source, title }) => (
  <img src={source || "img/poster-placeholder.png"} alt={title} />
);

Poster.propTypes = {
  source: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default Poster;
