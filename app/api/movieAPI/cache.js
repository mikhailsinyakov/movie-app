const fs = require("fs").promises;
const path = require("path");

let cache = null;

const readFromFile = async () => {
  const data = await fs.readFile(path.join(__dirname, "cache.json"), "utf8");
  return JSON.parse(data);
};

const clearCacheFromExpired = () => {
  const cacheArray = Object.entries(cache);
  console.log(cacheArray.length)
  const updatedCacheArray = cacheArray.filter(([key, value]) => 
    value.expires > Date.now() );
  const updatedCache = updatedCacheArray.reduce((obj, [key, value]) => 
    obj[key] = value, {});
  cache = updatedCache;
};

const updateCache = () => {
  fs.writeFile(
    path.join(__dirname, "cache.json"), 
    JSON.stringify(cache)
  )
};

const autoUpdate = () => {
  setInterval(async() => {
    clearCacheFromExpired();
    updateCache();
  }, 24 * 60 * 60 * 1000);
};

exports.init = async () => {
  try {
    cache = await readFromFile();
  } 
  catch (e) {
    cache = {};
  }
  autoUpdate();
};

exports.get = path => {
  if (!cache[path]) return null;
  const { expires, ...data } = cache[path];
  if (expires < Date.now())  return null;
  return data;
};

exports.set = (path, data) => {
  cache[path] = {
    ...data,
    expires: Date.now() + 24 * 60 * 60 *1000
  };
  updateCache();
};
