import axios, { CancelToken } from "axios";
import getConfigPromise from "./getConfigPromise";

const request = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
  }
});

const getRegion = lang => (lang === "en" ? "US" : "RU");

const getPosterSrc = (config, posterPath) =>
  `${config.imageBaseUrl}${config.posterSize}${posterPath}`;

export const getMoviesList = ({ language = "en", page = 1 } = {}) => {
  const source = CancelToken.source();

  const promise = (async () => {
    const config = await getConfigPromise;
    const path = "/movie/now_playing";
    const response = await request({
      url: path,
      params: {
        language,
        region: getRegion(language),
        page
      },
      cancelToken: source.token
    });

    return {
      ...response.data,
      results: response.data.results.map(movie => ({
        ...movie,
        genres: movie.genre_ids.map(
          genreId => config.genres[language][genreId]
        ),
        poster_src: movie.poster_path && getPosterSrc(config, movie.poster_path)
      }))
    };
  })();

  return { cancel: source.cancel, promise };
};

export const getMovieDetails = ({ language, movieId }) => {
  const source = CancelToken.source();

  const promise = (async () => {
    const config = await getConfigPromise;
    const path = `/movie/${movieId}`;
    const response = await request({
      url: path,
      params: {
        language,
        region: getRegion(language)
      }
    });
    const movieData = response.data;
    return {
      ...movieData,
      genres: movieData.genres.map(genre => genre.name),
      poster_src:
        movieData.poster_path && getPosterSrc(config, movieData.poster_path),
      production_countries: movieData.production_countries.map(
        contry => contry.name
      )
    };
  })();

  return { cancel: source.cancel, promise };
};
