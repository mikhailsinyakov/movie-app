import { getMoviesList, getMovieDetails } from "../../../api/movieAPI";

let movies;

beforeAll(async () => {
  movies = await getMoviesList();
});

describe("getMoviesList", () => {
  it("returns an array", () => {
    expect(movies).toBeInstanceOf(Array);
  });

  it("its random element is an object and it has necessary properties", () => {
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
});

describe("getMovieDetails", () => {
  let movie;

  beforeAll(async () => {
    const movieId = movies[Math.floor(Math.random() * movies.length)].id;
    movie = await getMovieDetails({ movieId });
  });

  it("is an object and it has all the necessary properties", () => {
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
});
