import React, { useRef } from "react";
import PropTypes from "prop-types";
import withDetailsStyles from "hocs/withDetailsStyles";
import withImageStyles from "hocs/withImageStyles";
import useScrollToMoveElement from "hooks/useScrollToMoveElement";
import Poster from "shared/Poster";
import Info from "./Info";

const StyledPoster = withImageStyles(Poster);

const Details = ({ details, className }) => {
  const posterEl = useRef();
  useScrollToMoveElement(posterEl);

  return (
    <div className={className}>
      <StyledPoster 
        source={details.poster_src} 
        alt={details.title} 
        key={details.poster_src}
        ref={posterEl}
       />
      <Info {...details} />
    </div>
  );
}

Details.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_src: PropTypes.string,
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

export default withDetailsStyles(Details);
