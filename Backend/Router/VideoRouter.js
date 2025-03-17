const express = require("express");
const VideoRouter = express.Router();
const {
  getVideoStream,
  getAllVideos,
} = require("../Controllers/VideoController");
/***********routes**************/

VideoRouter.get("/", getAllVideos);
VideoRouter.get("/watch", getVideoStream);   //not verified yet
module.exports = VideoRouter;
