const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://mikhailsinyakov:" +
  process.env.ATLAS_PASSWORD +
  "@cluster0-6bako.mongodb.net/movie-app";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let collection;

const connect = () => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) reject(err);
      else {
        collection = client.db("movie-app").collection("users");
        resolve();
      }
    });
  });
};

const isUserExist = async authKey => {
  try {
    const doc = await collection.findOne({authKey});
    return !!doc;
  } catch(e) {
    return false;
  }
};

const getUserMovies = async authKey => {
  const user = await collection.findOne({authKey});
  return user && user.movies;
};

const addUser = async authKey => {
  const user = {
    authKey,
    movies: []
  };
  await collection.insertOne(user);
};

const addMovieToWishList = async (authKey, movieId) => {
  const user = await collection.findOne({authKey});
  if (!user) return false;
  if (!user.movies.includes(movieId)) {
    await collection.replaceOne(
      {authKey}, 
      {...user, movies: [...user.movies, movieId]}
    );
  }
  return true;
};

const deleteMovieFromWishList = async (authKey, movieId) => {
  const user = await collection.findOne({authKey});
  if (!user) return false;
  if (user.movies.includes(movieId)) {
    await collection.replaceOne(
      {authKey}, 
      {...user, movies: user.movies.filter(m => m !== movieId)}
    );
  }
  return true;
};

module.exports = {
  connect,
  isUserExist,
  getUserMovies,
  addUser,
  addMovieToWishList,
  deleteMovieFromWishList
};
