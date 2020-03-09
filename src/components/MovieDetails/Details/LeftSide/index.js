import React from "react";
import PropTypes from "prop-types";
import Poster from "../../../../shared/Poster";
import Money from "./Money";

const LeftSide = ({ title, poster_src, budget, revenue }) => (
  <div>
    <Poster source={poster_src} title={title} />
    <Money budget={budget} revenue={revenue} />
  </div>
);

LeftSide.propTypes = {
  title: PropTypes.string.isRequired,
  poster_src: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  revenue: PropTypes.number.isRequired
};

export default LeftSide;
