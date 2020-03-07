import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = ({ onClick, children, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

const StyledButton = styled(Button)`
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  border: none;
  background-color: azure;

  &:hover {
    background-color: #ccccc8;
  }
`;

export default StyledButton;
