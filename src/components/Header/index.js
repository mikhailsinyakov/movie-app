import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Logo from "./Logo";
import { withLanguageContext } from "../Language";

const Head = styled.h1`
  font-size: 1.5em;
  line-height: 1.5em;
  color: #c9fdb0;
  text-shadow: 0 0 5px black;
`;

const Header = ({ getUIText, className }) => {
  return (
    <header className={className}>
      <Logo filename="app-logo.svg" href="/" size="medium" />
      <Head>{getUIText("appName")}</Head>
      <Logo
        filename="tmdb-logo.png"
        href="https://www.themoviedb.org/"
        size="small"
      />
    </header>
  );
};

Header.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  getUIText: PropTypes.func.isRequired
};

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  height: var(--header-height);
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url(/img/tickets.jpg);
  background-position: center;
  background-size: cover;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

export default withLanguageContext(StyledHeader);
