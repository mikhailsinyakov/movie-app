import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withLanguageContext } from "./Language";

const Error = ({ getUIText, className }) => (
  <div className={className}>
    <img src="img/error.png" alt="error" />
    <h2>{getUIText("errorTitle")}</h2>
    <p>{getUIText("errorProblem")}</p>
    <p>{getUIText("errorSolution")}</p>
  </div>
);

Error.propTypes = {
  getUIText: PropTypes.func.isRequired
};

const StyledError = styled(Error)`
  background-color: rgba(241, 209, 209, 0.8);
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  margin: 1rem 0.5rem;
  text-align: center;
  border: 0.5rem solid rgba(189, 148, 148, 0.8);
  max-width: 300px;

  @media screen and (min-width: 400px) {
    & {
      margin: 1rem auto;
    }
  }
`;

export default withLanguageContext(StyledError);
