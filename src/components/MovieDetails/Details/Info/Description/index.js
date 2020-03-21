import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Genres from "shared/Genres";
import Item from "./Item";
import Actors from "./Actors";

const Overview = styled.p`
  text-indent: 1rem;

  ${({ children }) =>
    children.match(/^[^\d]/) &&
    `
			&::first-letter {
				font-size: 2rem;
				text-shadow: 2px -2px 0px #715555;
			}
	`}
`;

const StyledGenres = styled(Genres)`
  justify-content: flex-start;
`;

const Description = ({
  overview,
  genres,
  rating,
  release,
  runtime,
  production,
  budget,
  revenue,
  actors
}) => (
  <div>
    {overview && <Overview>{overview}</Overview>}
    <StyledGenres genres={genres} />
    <Item name="rating" value={rating} showOnSmallScreen={true} />
    <Item name="release" value={release} showOnSmallScreen={true} />
    <Item name="runtime" value={runtime} showOnSmallScreen={true} />
    <Item name="production" value={production} />
    <Item name="budget" value={budget} />
    <Item name="revenue" value={revenue} />
    <Actors actors={actors} />
  </div>
);

Description.propTypes = {
  overview: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.string,
  release: PropTypes.number.isRequired,
  runtime: PropTypes.string,
  production: PropTypes.string,
  budget: PropTypes.string,
  revenue: PropTypes.string,
  actors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    profile_src: PropTypes.string,
    name: PropTypes.string
  })).isRequired
};

export default Description;
