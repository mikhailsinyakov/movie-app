let cache = {};

export const set = (language, category, data) => {
  cache[`${language}-${category}`] = data;
};

export const has = (language, category) => {
  return !!cache[`${language}-${category}`];
}

export const get = (language, category) => {
  if (!cache[`${language}-${category}`]) return null;
  return cache[`${language}-${category}`];
}

export const clear = () => {
  cache = {};
};
