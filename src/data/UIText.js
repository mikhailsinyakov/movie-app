const data = {
  appName: {
    en: "Movie App",
    ru: "Фильмы"
  }
};

export const stickLanguage = language => name => data[name][language];
