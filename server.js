const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const movieAPI = require("./app/api/movieAPI");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.get("/api/movies/:category", async (req, res) => {
  const { category } = req.params;
  const { language, page } = req.query;
  try {
    const moviesList = await movieAPI.getMoviesList(category, page, language);
    res.send(moviesList);
  } 
  catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.get("/api/movie/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const { language } = req.query;
  try {
    const movieDetails = await movieAPI.getMovieDetails(movieId, language);
    res.send(movieDetails);
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

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});




app.listen(process.env.PORT || 8080);
