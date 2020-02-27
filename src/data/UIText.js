const data = {
  appName: {
    en: "Movie App",
    ru: "Фильмы"
  },
  tmdbAttribution: {
    en:
      "This product uses the TMDb API but is not endorsed or certified by TMDb",
    ru:
      "Этот продукт использует TMDb API, но не одобрен и не сертифицирован TMDb"
  }
};

export const stickLanguage = language => name => data[name][language];
