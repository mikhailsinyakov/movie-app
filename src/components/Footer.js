import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withLanguageContext } from "./Language";

const Footer = ({ getUIText, className }) => (
  <footer className={className}>
    <span>{getUIText("tmdbAttribution")}</span>
  </footer>
);

Footer.propTypes = {
  getUIText: PropTypes.func.isRequired
};

const StyledFooter = styled(Footer)`
  margin-top: auto;
  background-color: rgba(86, 177, 49, 0.8);
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.8rem;
`;

export default withLanguageContext(StyledFooter);
