const express = require('express');
const UserRouter = express.Router();

const {
  getCurrentUser,
  getAllUser,
  deleteUser,
  isAdminMiddleWare,
  addToWishList,
  getUserWishList,
} = require("../Controllers/UserController");

const { protectRouteMiddleware} = require('../Controllers/AuthController');

UserRouter.use(protectRouteMiddleware)
  .get("/", getCurrentUser)
  .get("/", isAdminMiddleWare, getAllUser)
  .delete("/", deleteUser)
  .post("/wishList", addToWishList)
  .get("/wishList", getUserWishList);

module.exports = UserRouter;