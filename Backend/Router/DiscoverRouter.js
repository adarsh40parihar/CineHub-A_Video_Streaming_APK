const express = require("express");
const {
  getUpcoming,
  getTopRated,
  getTrending,
  getNowPlaying,
  getSeachResult,
} = require("../Controllers/DiscoverController");

const DiscoverRouter = express.Router();

// DiscoverRouter.use(protectRouteMiddleware);
DiscoverRouter.get("/now-playing", getNowPlaying);
DiscoverRouter.get("/trending", getTrending);
DiscoverRouter.get("/upcoming", getUpcoming);
DiscoverRouter.get("/top-rated", getTopRated);
DiscoverRouter.get("/explore", getSeachResult);

module.exports = DiscoverRouter;
