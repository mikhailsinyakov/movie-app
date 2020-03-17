const config = require("./config");
const request = require("./request");
const cache = require("./cache");

config.init();
cache.init();

const getPosterSrc = (config, posterPath) =>
  `${config.imageBaseUrl}${config.posterSize}${posterPath}`;
  
exports.getMoviesList = async (category, page = 1, language = "en") => {
  const currConfig = config.get();
  const path = `/movie/${category}?page=${page}&language=${language}`;
  let result = cache.get(path);
  if (!result) {
    result = await request(path, language);
    cache.set(path, result);
  }
  return {
    ...result,
    results: result.results.map(movie => ({
      ...movie,
      genres: movie.genre_ids.map(genreId => currConfig.genres[language][genreId]),
      poster_src: movie.poster_path && getPosterSrc(currConfig, movie.poster_path)
    }))
  };
};

exports.getMovieDetails = async (movieId, language = "en") => {
  const currConfig = config.get();
  const path = `/movie/${movieId}?language=${language}`;
  let result = cache.get(path);
  if (!result) {
    result = await request(path, language);
    cache.set(path, result);
  }
  return {
    ...result,
    genres: result.genres.map(genre => genre.name),
    poster_src:
      result.poster_path && getPosterSrc(currConfig, result.poster_path),
    production_countries: result.production_countries.map(
      contry => contry.name
    )
  };
};
