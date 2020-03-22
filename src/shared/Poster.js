import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Poster = React.forwardRef(({ source, alt, className }, ref) => (
  <img
    src="img/poster-placeholder.png"
    alt={alt}
    onError={e => (e.target.src = "img/poster-placeholder.png")}
    onLoad={e => source && e.target.src !== source && (e.target.src = source)}
    ref={ref}
    className={className}
  />
));

Poster.propTypes = {
  source: PropTypes.string,
  alt: PropTypes.string.isRequired
};

const StyledPoster = styled(Poster)`
  width: var(--poster-width);
  object-fit: contain;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

export default StyledPoster;
