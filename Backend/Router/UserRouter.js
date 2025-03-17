const express = require('express');
const UserRouter = express.Router();

const {
  getCurrentUser,
  getAllUser,
  deleteUser,
  isAdminMiddleWare,
  addToWishList,
  getUserWishList,
  deleteFromWishlist,
} = require("../Controllers/UserController");

const { protectRouteMiddleware} = require('../Controllers/AuthController');

UserRouter
  .use(protectRouteMiddleware)
  .get("/", getCurrentUser)
  .get("/all", isAdminMiddleWare, getAllUser)
  .delete("/", deleteUser)
  .post("/wishList", addToWishList)
  .delete("/wishList", deleteFromWishlist)
  .get("/wishList", getUserWishList);

module.exports = UserRouter;