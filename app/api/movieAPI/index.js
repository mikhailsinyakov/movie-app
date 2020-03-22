const config = require("./config");
const request = require("./request");
const cache = require("./cache");

config.init();
cache.init();

const getPosterSrc = (config, posterPath) =>
  `${config.imageBaseUrl}${config.posterSize}${posterPath}`;
  
const getProfileSrc = (config, profilePath) =>
  `${config.imageBaseUrl}${config.profileSize}${profilePath}`;
  
const changeResults = (results, currConfig, language) => {
  return results.map(movie => ({
    ...movie,
    genres: movie.genre_ids.map(genreId => currConfig.genres[language][genreId]),
    poster_src: movie.poster_path && getPosterSrc(currConfig, movie.poster_path)
  }));
};
  
exports.getMoviesList = async (category, page = 1, language = "en") => {
  const currConfig = config.get();
  const path = `/movie/${category}?page=${page}&language=${language}`;
  let list = cache.get(path);
  if (!list) {
    list = await request(path, language);
    cache.set(path, list);
  }
  
  return {
    ...list,
    results: changeResults(list.results, currConfig, language)
  };
};

exports.getMovieDetails = async (movieId, language = "en") => {
  const currConfig = config.get();
  const path = `/movie/${movieId}?language=${language}`;
  let details = cache.get(path);
  if (!details) {
    details = await request(path, language);
    cache.set(path, details);
  }
  return {
    ...details,
    genres: details.genres.map(genre => genre.name),
    poster_src:
      details.poster_path && getPosterSrc(currConfig, details.poster_path),
    production_countries: details.production_countries.map(
      contry => contry.name
    )
  };
};

exports.getMovieActors = async movieId => {
  const currConfig = config.get();
  const path = `/movie/${movieId}/credits`;
  let credits = cache.get(path);
  if (!credits) {
    credits = await request(path);
    cache.set(path, credits);
  }
  const actors = credits.cast.filter((_, i) => i < 6);
  return actors.map(actor => ({
    ...actor,
    profile_src: 
      actor.profile_path && getProfileSrc(currConfig, actor.profile_path)
  }));
}

exports.getMoviesListBySearch = async (query, page = 1, language = "en") => {
  const currConfig = config.get();
  const path = `/search/movie?query=${query}&page=${page}&language=${language}`;
  let list = cache.get(path);
  if (!list) {
    list = await request(path, language);
    cache.set(path, list);
  }
  
  return {
    ...list,
    results: changeResults(list.results, currConfig, language)
  };
};

exports.getActorDetails = async (actorId, language = "en") => {
  const currConfig = config.get();
  const path = `/person/${actorId}?language=${language}`;
  let details = cache.get(path);
  if (!details) {
    details = await request(path);
    cache.set(path, details);
  }
  
  return {
    ...details,
    profile_src: 
      details.profile_path && getProfileSrc(currConfig, details.profile_path)
  };
};
