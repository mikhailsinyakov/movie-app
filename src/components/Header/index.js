import React, { useState } from "react";
import PropTypes from "prop-types";
import Logo from "./Logo";
import { withLanguageContext } from "../Language";
import Select from "../../shared/Select";

const Header = ({ language, setLanguage, getUIText }) => {
  const languageOptions = [
    { value: "en", name: "EN" },
    { value: "ru", name: "RU" }
  ];

  return (
    <header>
      <Logo filename="app-logo" href="/" />
      <h1>{getUIText("appName")}</h1>
      <Select
        options={languageOptions}
        initValue={language}
        handleChange={setLanguage}
      />
      <Logo
        filename="tmdb-logo"
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

export default withLanguageContext(Header);
