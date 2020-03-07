import axios from "axios";

const request = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
  }
});

const getGenresObj = genresData =>
  genresData.genres.reduce(
    (obj, genre) => ({
      ...obj,
      [genre.id]: genre.name
    }),
    {}
  );

const definePosterSize = (posterSizes, width) => {
  return posterSizes.find(size => +size.slice(1) >= width);
};

const getConfig = async () => {
  const urlParts = [
    { path: "/configuration" },
    { path: "/genre/movie/list", language: "en" },
    { path: "/genre/movie/list", language: "ru" }
  ];
  const [configData, genresDataEn, genresDataRu] = await Promise.all(
    urlParts.map(
      async ({ path, language }) =>
        (await request({ url: path, params: { language } })).data
    )
  );
  const posterSize = definePosterSize(configData.images.poster_sizes, 300);

  return {
    imageBaseUrl: configData.images.secure_base_url,
    posterSize,
    genres: {
      en: getGenresObj(genresDataEn),
      ru: getGenresObj(genresDataRu)
    }
  };
};

const promise = getConfig();
promise.catch(console.error);

export default promise;
