import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Rating = styled.span`
  position: absolute;
  top: -0.2rem;
  right: 0;
  color: #d0c759;
  border-radius: 50%;
  border: 1px solid;
  padding: 0.2rem;
`;

const Title = ({ title, rating, className }) => (
  <p className={className}>
    {title}
    {rating > 0 && <Rating>{rating}</Rating>}
  </p>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired
};

const StyledTitle = styled(Title)`
  position: relative;
  font-weight: bold;
  padding-right: 2rem;
`;

export default StyledTitle;
