const express = require("express");
const {
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getMovieDetails,
  getRomanceMovies,
  getAnimeMovies,
} = require("../Controllers/MovieControllers");

const { protectRouteMiddleware } = require('../Controllers/AuthController');

const MoviesRouter = express.Router();
// MoviesRouter.use(protectRouteMiddleware);
MoviesRouter
  .get("/action", getActionMovies)
  .get("/comedy", getComedyMovies)
  .get("/horror", getHorrorMovies)
  .get("/romance", getRomanceMovies)
  .get("/anime", getAnimeMovies)
  .get("/details", getMovieDetails);

module.exports = MoviesRouter;
