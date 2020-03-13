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
  },
  more: {
    en: "More",
    ru: "Ещё"
  },
  budget: {
    en: "Budget",
    ru: "Бюджет"
  },
  revenue: {
    en: "Revenue",
    ru: "Сборы"
  },
  release: {
    en: "Release year",
    ru: "Год выпуска"
  },
  production: {
    en: "Production",
    ru: "Производство"
  },
  runtime: {
    en: "Runtime",
    ru: "Продолжительность"
  },
  rating: {
    en: "Rating",
    ru: "Рейтинг"
  },
  errorTitle: {
    en: "Oops! Something went wrong!",
    ru: "Упс! Что-то пошло не так!"
  },
  errorProblem: {
    en:
      "We encountered an error while trying to fetch the data from third-party resource.",
    ru: "Произошла ошибка при получении данных со стороннего ресурса"
  },
  errorSolution: {
    en: "Try go to the website later",
    ru: "Попробуйте зайти на сайт позднее"
  }
};

export const stickLanguage = language => name => data[name][language];
