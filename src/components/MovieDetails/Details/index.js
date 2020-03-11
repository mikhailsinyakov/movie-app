import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Poster from "shared/Poster";
import Info from "./Info";

const PosterWithAddStyles = styled(Poster)`
  width: 250px;
  align-self: flex-start;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const Details = ({ details, className }) => (
  <div className={className}>
    <PosterWithAddStyles source={details.poster_src} title={details.title} />
    <Info {...details} />
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
    runtime: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

const StyledDetails = styled(Details)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default StyledDetails;
