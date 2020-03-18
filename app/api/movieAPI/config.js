const fs = require("fs").promises;
const path = require("path");
const request = require("./request");

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

const getConfigFromAPI = async () => {
  const urlPaths = [
    "/configuration?language=en",
    "/genre/movie/list?language=en",
    "/genre/movie/list?language=ru"
  ];
  const [configData, genresDataEn, genresDataRu] = await Promise.all(
    urlPaths.map(
      async (path) => await request(path) )
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

let config = null;

const readFromFile = async () => {
  const data = await fs.readFile(path.join(__dirname, "config.json"), "utf8");
  return JSON.parse(data);
};

const updateConfig = async () => {
  config = await getConfigFromAPI();
  config.expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  await fs.writeFile(
    path.join(__dirname, "config.json"), 
    JSON.stringify(config)
  );
};

const autoUpdate = () => {
  const untilExpired = config.expires - Date.now();
  setTimeout(async() => {
    await updateConfig();
    autoUpdate();
  }, untilExpired);
};

exports.init = async () => {
  let loadFromAPI = false;
  try {
    const gotConfig = await readFromFile();
    if (gotConfig.expires < Date.now()) loadFromAPI = true;
    else config = gotConfig;
  } catch (e) {
    loadFromAPI = true;
  }
  if (loadFromAPI) {
    await updateConfig();
  }
  autoUpdate();
};

exports.get = () => config;

