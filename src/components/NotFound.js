import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withLanguageContext } from "./Language";

const ImageWrapper = styled.div`
  margin: calc((100vh - 320px) / 7) auto calc((100vh - 320px) / 7 + 0.5rem);
  width: fit-content;
`;

const Image = styled.img`
  width: 80px;

  @media screen and (min-height: 400px) {
    & {
      width: 100px;
    }
  }

  @media screen and (min-height: 600px) {
    & {
      width: 150px;
    }
  }

  @media screen and (min-width: 500px) and (min-height: 750px) {
    & {
      width: 200px;
    }
  }

  @media screen and (min-width: 1000px) and (min-height: 1000px) {
    & {
      width: 250px;
    }
  }
`;

const StyledLink = styled(Link)`
  color: black;
  padding: 0.2rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  font-size: 0.8rem;

  &:hover {
    border-color: black;
  }

  @media screen and (min-height: 400px) {
    & {
      font-size: 1rem;
      padding: 0.5rem;
    }
  }

  @media screen and (min-height: 400px) {
    & {
      font-size: 1.2rem;
      padding: 0.8rem;
    }
  }

  @media screen and (min-width: 500px) and (min-height: 750px) {
    & {
      font-size: 1.5rem;
      padding: 1.2rem;
      border-width: 3px;
    }
  }

  @media screen and (min-width: 1000px) and (min-height: 1000px) {
    & {
      font-size: 2rem;
      padding: 1.5rem;
    }
  }
`;

const NotFound = ({ getUIText, className }) => (
  <div className={className}>
    <ImageWrapper>
      <Image src={getUIText("pageNotFoundSrc")} alt="page-not-found" />
    </ImageWrapper>
    <StyledLink to="/">{getUIText("goToMainPage")}</StyledLink>
  </div>
);

NotFound.propTypes = {
  getUIText: PropTypes.func.isRequired
};

const StyledNotFound = styled(NotFound)`
  position: absolute;
  top: 3rem;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  padding: 1rem;
  background-color: rgba(109, 106, 154, 0.8);
  border-radius: 1rem;
  text-align: center;
`;

export default withLanguageContext(StyledNotFound);