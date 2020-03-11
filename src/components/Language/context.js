import React from "react";
import { stickLanguage } from "data/UIText";

export const LanguageContext = React.createContext();

export const withLanguageContext = Component => props => (
  <LanguageContext.Consumer>
    {({ language, setLanguage }) => (
      <Component
        {...props}
        language={language}
        getUIText={stickLanguage(language)}
        setLanguage={setLanguage}
      />
    )}
  </LanguageContext.Consumer>
);
