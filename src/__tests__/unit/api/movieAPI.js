import { getMoviesList, getMovieDetails } from "../../../api/movieAPI";

let movies, moviesRu;

beforeAll(async () => {
  movies = await getMoviesList();
  moviesRu = await getMoviesList({ language: "ru" });
});

describe("getMoviesList", () => {
  it("returns an array", () => {
    expect(movies).toBeInstanceOf(Array);
    expect(moviesRu).toBeInstanceOf(Array);
  });

  it("movies's random element is an object and it has necessary properties", () => {
    const movie = movies[Math.floor(Math.random() * movies.length)];
    expect(movie).toBeInstanceOf(Object);
    expect(movie).toHaveProperty("id");
    expect(movie).toHaveProperty("title");
    expect(movie).toHaveProperty("vote_average");
    expect(movie).toHaveProperty("poster_src");
    expect(movie).toHaveProperty("genres");
    expect(movie.genres).toBeInstanceOf(Array);
    expect(typeof movie.genres[0]).toBe("string");
  });

  it("movies in russian's random element is an object and it has necessary properties", () => {
    const movie = moviesRu[Math.floor(Math.random() * moviesRu.length)];
    expect(movie).toBeInstanceOf(Object);
    expect(movie).toHaveProperty("id");
    expect(movie).toHaveProperty("title");
    expect(movie).toHaveProperty("vote_average");
    expect(movie).toHaveProperty("poster_src");
    expect(movie).toHaveProperty("genres");
    expect(movie.genres).toBeInstanceOf(Array);
    expect(typeof movie.genres[0]).toBe("string");
  });
});

describe("getMovieDetails", () => {
  let movie, movieRu;

  beforeAll(async () => {
    const movieId = movies[Math.floor(Math.random() * movies.length)].id;
    const movieRuId = moviesRu[Math.floor(Math.random() * moviesRu.length)].id;
    movie = await getMovieDetails({ movieId });
    movieRu = await getMovieDetails({ movieId: movieRuId });
  });

  it("movie is an object and it has all the necessary properties", () => {
    expect(movie).toBeInstanceOf(Object);
    expect(movie).toHaveProperty("id");
    expect(movie).toHaveProperty("title");
    expect(movie).toHaveProperty("vote_average");
    expect(movie).toHaveProperty("poster_src");
    expect(movie).toHaveProperty("genres");
    expect(movie.genres).toBeInstanceOf(Array);
    expect(typeof movie.genres[0]).toBe("string");
    expect(movie).toHaveProperty("original_title");
    expect(movie).toHaveProperty("overview");
    expect(movie).toHaveProperty("budget");
    expect(movie).toHaveProperty("release_date");
    expect(movie).toHaveProperty("revenue");
    expect(movie).toHaveProperty("runtime");
    expect(movie).toHaveProperty("production_countries");
    expect(movie.production_countries).toBeInstanceOf(Array);
    expect(typeof movie.production_countries[0]).toBe("string");
  });

  it("movie in russian is an object and it has all the necessary properties", () => {
    expect(movieRu).toBeInstanceOf(Object);
    expect(movieRu).toHaveProperty("id");
    expect(movieRu).toHaveProperty("title");
    expect(movieRu).toHaveProperty("vote_average");
    expect(movieRu).toHaveProperty("poster_src");
    expect(movieRu).toHaveProperty("genres");
    expect(movieRu.genres).toBeInstanceOf(Array);
    expect(typeof movieRu.genres[0]).toBe("string");
    expect(movieRu).toHaveProperty("original_title");
    expect(movieRu).toHaveProperty("overview");
    expect(movieRu).toHaveProperty("budget");
    expect(movieRu).toHaveProperty("release_date");
    expect(movieRu).toHaveProperty("revenue");
    expect(movieRu).toHaveProperty("runtime");
    expect(movieRu).toHaveProperty("production_countries");
    expect(movieRu.production_countries).toBeInstanceOf(Array);
    expect(typeof movieRu.production_countries[0]).toBe("string");
  });
});
