const _cache = {
  movies: {},
  movie: {}
};

const cache = {
  has(type, id, language) {
    if (!_cache[type][id]) return false;
    return !!_cache[type][id][language];
  },
  get(type, id, language) {
    if (!_cache[type][id]) return null;
    return _cache[type][id][language] || null;
  },
  set(type, id, language, data) {
    if (!_cache[type][id]) _cache[type][id] = {};
    _cache[type][id][language] = data;
  }
};

Object.freeze(cache);

export default cache;
