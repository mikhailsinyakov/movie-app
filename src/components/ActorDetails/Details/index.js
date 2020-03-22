import React, { useRef } from "react";
import PropTypes from "prop-types";
import withDetailsStyles from "hocs/withDetailsStyles";
import withImageStyles from "hocs/withImageStyles";
import useScrollToMoveElement from "hooks/useScrollToMoveElement";
import Poster from "shared/Poster";
import Info from "./Info";

const StyledPhoto = withImageStyles(Poster);

const Details = ({ details, className }) => {
  const posterEl = useRef();
  useScrollToMoveElement(posterEl);

  return (
    <div className={className}>
      <StyledPhoto 
        source={details.profile_src} 
        alt={details.name} 
        key={details.profile_src}
        ref={posterEl}
       />
      <Info {...details} />
    </div>
  );
}

Details.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profile_src: PropTypes.string,
    birthday: PropTypes.string,
    place_of_birth: PropTypes.string,
    biography: PropTypes.string.isRequired
  })
};

export default withDetailsStyles(Details);
