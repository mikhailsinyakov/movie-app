const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const movieAPI = require("./app/api/movieAPI");
require("dotenv").config();
const db = require("./app/db");
const addAuthKey = require("./app/api/addAuthKey");

const corsOptions = {
  origin: process.env.ORIGIN
};

db.connect().catch(console.log)

const app = express();
app.use(cors(corsOptions));
app.use((err, req, res, next) => {
  console.log(err);
  if (err) res.status(500).send({ error: err });
  else next();
});
app.use(bodyParser.json());

app.get("/api/movies/:category", async (req, res) => {
  const { category } = req.params;
  const { language, page } = req.query;
  try {
    const moviesList = await movieAPI.getMoviesList(category, page, language);
    res.send(moviesList);
  } 
  catch (e) {
    res.status(500).send(e);
  }
});

app.get("/api/movie/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const { language } = req.query;
  try {
    const [movieDetails, actors] = await Promise.all([
      movieAPI.getMovieDetails(movieId, language),
      movieAPI.getMovieActors(movieId)
    ]);
    res.send({...movieDetails, actors});
  }
  catch (e) {
    res.status(500).send(e);
  }
});

app.get("/api/search", async (req, res) => {
  const { query, language, page } = req.query;
  try {
    const moviesList = await movieAPI.getMoviesListBySearch(query, page, language);
    res.send(moviesList);
  } 
  catch (e) {
    res.status(500).send(e);
  }
});

app.get("/api/actor/:actorId", async (req, res) => {
  const { actorId } = req.params;
  const { language } = req.query;
  try {
    const actorDetails = await movieAPI.getActorDetails(actorId, language);
    res.send(actorDetails);
  } 
  catch (e) {
    res.status(500).send(e);
  }
});

app.post("/api/authKey", async (req, res) => {
  try {
    const authKey = await addAuthKey();
    res.send({authKey});
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/api/wishlist", async (req, res) => {
  const { authKey } = req.query;
  try {
    const wishlist = await db.getUserMovies(authKey);
    res.send({wishlist});
  } catch (e) {
    res.status(500).send(e);
  }
});

app.put("/api/wishlist/:movieId", async (req, res) => {
  const { authKey } = req.query;
  const { movieId } = req.params;
  try {
    const success = await db.addMovieToWishList(authKey, movieId);
    if (success) res.status(200).send();
    else res.status(401).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

app.delete("/api/wishlist/:movieId", async (req, res) => {
  const { authKey } = req.query;
  const { movieId } = req.params;
  try {
    const success = await db.deleteMovieFromWishList(authKey, movieId);
    if (success) res.status(200).send();
    else res.status(401).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.all("*", (req, res) => {
  res.status(404).send({error: "The operation is not supported"});
});

app.listen(process.env.PORT || 8080);
