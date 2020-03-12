import { getMoviesList, getMovieDetails } from "api/movieAPI";

let moviesData, moviesDataRu, movies, moviesRu;

beforeAll(async () => {
  moviesData = await getMoviesList();
  moviesDataRu = await getMoviesList({ language: "ru" });
  movies = moviesData.results;
  moviesRu = moviesDataRu.results;
});

describe("getMoviesList", () => {
  it("returns an array", () => {
    expect(movies).toBeInstanceOf(Array);
    expect(moviesRu).toBeInstanceOf(Array);
  });

  it("movies's random element is an object and it has necessary properties", () => {
    const movie = movies[Math.floor(Math.random() * movies.length)];
    expect(typeof moviesData.page).toBe("number");
    expect(typeof moviesData.total_pages).toBe("number");
    expect(movie).toBeInstanceOf(Object);
    expect(movie).toHaveProperty("id");
    expect(movie).toHaveProperty("title");
    expect(movie).toHaveProperty("vote_average");
    expect(movie).toHaveProperty("poster_src");
    expect(movie).toHaveProperty("genres");
    expect(movie.genres).toBeInstanceOf(Array);
  });

  it("movies in russian's random element is an object and it has necessary properties", () => {
    const movie = moviesRu[Math.floor(Math.random() * moviesRu.length)];
    expect(typeof moviesDataRu.page).toBe("number");
    expect(typeof moviesDataRu.total_pages).toBe("number");
    expect(movie).toBeInstanceOf(Object);
    expect(movie).toHaveProperty("id");
    expect(movie).toHaveProperty("title");
    expect(movie).toHaveProperty("vote_average");
    expect(movie).toHaveProperty("poster_src");
    expect(movie).toHaveProperty("genres");
    expect(movie.genres).toBeInstanceOf(Array);
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
    expect(movie).toHaveProperty("original_title");
    expect(movie).toHaveProperty("overview");
    expect(movie).toHaveProperty("budget");
    expect(movie).toHaveProperty("release_date");
    expect(movie).toHaveProperty("revenue");
    expect(movie).toHaveProperty("runtime");
    expect(movie).toHaveProperty("production_countries");
    expect(movie.production_countries).toBeInstanceOf(Array);
  });

  it("movie in russian is an object and it has all the necessary properties", () => {
    expect(movieRu).toBeInstanceOf(Object);
    expect(movieRu).toHaveProperty("id");
    expect(movieRu).toHaveProperty("title");
    expect(movieRu).toHaveProperty("vote_average");
    expect(movieRu).toHaveProperty("poster_src");
    expect(movieRu).toHaveProperty("genres");
    expect(movieRu.genres).toBeInstanceOf(Array);
    expect(movieRu).toHaveProperty("original_title");
    expect(movieRu).toHaveProperty("overview");
    expect(movieRu).toHaveProperty("budget");
    expect(movieRu).toHaveProperty("release_date");
    expect(movieRu).toHaveProperty("revenue");
    expect(movieRu).toHaveProperty("runtime");
    expect(movieRu).toHaveProperty("production_countries");
    expect(movieRu.production_countries).toBeInstanceOf(Array);
  });
});
