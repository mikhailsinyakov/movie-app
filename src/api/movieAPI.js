import axios from "axios";

export const getMoviesList = async (
  { category, language = "en", page = 1 } = {}
) => {
  if (category === "wishlist") {
    const authKey = window.localStorage.getItem("authKey");
    const response = await axios(`/api/wishlist?authKey=${authKey}`);
    const movieIds = response.data.wishlist;
    const results = await Promise.all(
      movieIds.map(async movieId => 
        await getMovieDetails({ language, movieId })
      )
    );
    return {
      page: 1,
      total_pages: 1,
      results
    };
  } else {
    const path = `/api/movies/${category}`;
    const response = await axios({
      url: path,
      params: {
        language,
        page
      }
    });
    return response.data;
  }
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

export const getMoviesListBySearch = async (
  { query, language = "en", page = 1 } = {}
) => {
  const path = `/api/search`;
  const response = await axios({
    url: path,
    params: {
      query,
      language,
      page
    }
  });
  return response.data;
};

export const getActorDetails = async ({ language, actorId }) => {
  const path = `/api/actor/${actorId}`;
  const response = await axios({
    url: path,
    params: {
      language
    }
  });
  return response.data;
};
