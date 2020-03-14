import React, { useState } from "react";
import { stickLanguage } from "data/UIText";

export const LanguageContext = React.createContext();

const withLanguage = Component => props => {
  const setLanguageOutside = language => {
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
  };
  const initialLanguage = (() => {
    let language = localStorage.getItem("language");
    if (language) return language;
    const langs = window.navigator.language;
    if (!langs) return "en";
    const lang = langs.split(";")[0];
    if (/[rR]u/.test(lang)) return "ru";
    return "en";
  })();
  setLanguageOutside(initialLanguage);

  const [language, setLanguage] = useState(initialLanguage);

  const setLanguageEverywhere = language => {
    setLanguage(language);
    setLanguageOutside(language);
  };

  return (
    <LanguageContext.Provider
      value={{ 
        language, 
        setLanguage: setLanguageEverywhere,
        getUIText: stickLanguage(language)
       }}
    >
      <Component {...props} />
    </LanguageContext.Provider>
  );
};

export default withLanguage;
