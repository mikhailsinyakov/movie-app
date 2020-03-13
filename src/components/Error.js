import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withLanguageContext } from "./Language";

const Title = styled.h2`
  font-size: 1.15rem;
  @media screen and (min-width: 400px) {
    & {
      font-size: 1.3rem;
    }
  }
`;

const Problem = styled.p`
  font-size: 1.1rem;
`;

const Solution = styled.p`
  font-style: italic;
`;
const Error = ({ getUIText, className }) => (
  <div className={className}>
    <img src="img/error.png" alt="error" />
    <Title>{getUIText("errorTitle")}</Title>
    <Problem>{getUIText("errorProblem")}</Problem>
    <Solution>{getUIText("errorSolution")}</Solution>
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
