import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const OriginalTitle = styled.span`
  font-style: italic;
`;

const Title = ({ title, original_title, className }) => (
  <p className={className}>
    {title}{" "}
    {title !== original_title && (
      <OriginalTitle>({original_title})</OriginalTitle>
    )}
  </p>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired
};

const StyledTitle = styled(Title)`
  text-align: center;
  font-weight: bold;
`;

export default StyledTitle;
