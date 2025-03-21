const express = require("express");
const {
  getUpcoming,
  getTopRated,
  getTrending,
  getNowPlaying,
} = require("../Controllers/DiscoverController");

const { protectRouteMiddleware } = require("../Controllers/AuthController");

const DiscoverRouter = express.Router();

// DiscoverRouter.use(protectRouteMiddleware);
DiscoverRouter.get("/now-playing", getNowPlaying);
DiscoverRouter.get("/trending", getTrending);
DiscoverRouter.get("/upcoming", getUpcoming);
DiscoverRouter.get("/top-rated", getTopRated);

module.exports = DiscoverRouter;
