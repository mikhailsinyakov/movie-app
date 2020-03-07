import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Poster = ({ source, title, className }) => (
  <img
    src="img/poster-placeholder.png"
    alt={title}
    onError={e => (e.target.src = "img/poster-placeholder.png")}
    onLoad={e => source && e.target.src !== source && (e.target.src = source)}
    className={className}
  />
);

Poster.propTypes = {
  source: PropTypes.string,
  title: PropTypes.string.isRequired
};

const StyledPoster = styled(Poster)`
  width: var(--poster-width);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

export default StyledPoster;
