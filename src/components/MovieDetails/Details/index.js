import React from "react";
import PropTypes from "prop-types";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Details = ({ details }) => (
  <div>
    <LeftSide {...details} />
    <RightSide {...details} />
  </div>
);

Details.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_src: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string,
    release_date: PropTypes.string.isRequired,
    production_countries: PropTypes.arrayOf(PropTypes.string).isRequired,
    runtime: PropTypes.number
  })
};

export default Details;
