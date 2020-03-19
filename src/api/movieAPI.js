import axios from "axios";

export const getMoviesList = async (
  { category, language = "en", page = 1 } = {}
) => {
  const path = `/api/movies/${category}`;
  const response = await axios({
    url: path,
    params: {
      language,
      page
    }
  });
  return response.data;
};

export const getMovieDetails = async ({ language, movieId }) => {
  const path = `/api/movie/${movieId}`;
  const response = await axios({
    url: path,
    params: {
      language
    }
  });
  return response.data;
};
