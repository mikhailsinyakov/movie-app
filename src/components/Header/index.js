import React, { useState } from "react";
import Logo from "./Logo";
import { withLanguageContext } from "../Language";

const Header = ({ language, setLanguage, getUIText }) => {
  const [value, setValue] = useState(language);
  const handleChange = e => {
    const newValue = e.target.value;
    setValue(newValue);
    if (language !== newValue) setLanguage(newValue);
  };

  return (
    <header>
      <h1>{getUIText("appName")}</h1>
      <select value={value} onChange={handleChange}>
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
      <Logo filename="app-logo" href="/" />
      <Logo
        filename="tmdb-logo"
        href="https://www.themoviedb.org/"
        size="small"
      />
    </header>
  );
};

export default withLanguageContext(Header);
