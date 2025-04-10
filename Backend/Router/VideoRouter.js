const express = require("express");
const VideoRouter = express.Router();
const {
  getVideoStream,
  getAllVideos,
  getThumbnail,
} = require("../Controllers/VideoController");
/***********routes**************/

VideoRouter.get("/", getAllVideos);
VideoRouter.get("/watch", getVideoStream);   //not verified yet
VideoRouter.get("/thumbnail", getThumbnail);
module.exports = VideoRouter;
