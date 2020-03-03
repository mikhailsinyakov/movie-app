import React from "react";
import PropTypes from "prop-types";
import { isNull } from "../../../helpers/customPropCheckers";

const Poster = ({ source, title }) => (
  <img src={source || "img/poster-placeholder.png"} alt={title} />
);

Poster.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string.isRequired, isNull]).isRequired,
  title: PropTypes.string.isRequired
};

export default Poster;
