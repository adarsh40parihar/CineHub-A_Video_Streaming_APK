const UserModel = require("../Model/UserModel");
const {
  tmdbApi,
  TMDB_ENDPOINT,
} = require("../../../../Nodejs/Final_code_Auth&User/Services/TMDB_Services");
/********************handler function -> users*********************************/

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, name, email, createdAt, wishlist, isPremium } =
      await UserModel.findById(userId);
    if (_id) {
      res.status(200).json({
        user: {
          _id: _id,
          name: name,
          email: email,
          createdAt: createdAt,
          wishlist: wishlist,
          isPremium: isPremium,
        },
        status: "success",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    // if user is present -> send the resp
    if (users.length != 0) {
      res.status(200).json({
        message: users,
      });
    } else {
      res.status(404).json({
        message: "did not found any user",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.userId;
    const user = await UserModel.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({
        message: "user deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

const isAdminMiddleWare = async function (req, res, next) {
  const id = req.userId;
  const user = await UserModel.findById(id);
  if (user.role !== "admin") {
    return res.status(403).json({
      message: "you are not admin",
      status: "failure",
    });
  } else {
    next();
  }
};

const addToWishList = async (req, res) => {
  try {
    const userId = req.userId;
    const { id, poster_path, name, media_type } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.wishlist.find((item) => item.id === id)) {
      return res.status(400).json({
        message: "Item already in wishlist",
        status: "failure",
      });
    }
    const wishlistItem = {
      poster_path: poster_path,
      name: name,
      id: id,
      media_type: media_type,
    };
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { wishlist: wishlistItem } },
      { new: true, upsert: true } // options to return the updated document and create if it doesn't exist
    );
    // Send response
    res.status(200).json({
      user: updatedUser,
      status: "success",
      message: "Item added to wishlist successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

const deleteFromWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.body; // Only need the item ID for deletion

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "failure",
      });
    }

    // Check if item exists in wishlist before attempting to remove
    if (!user.wishlist.some((item) => item.id === id)) {
      return res.status(404).json({
        message: "Item not found in wishlist",
        status: "failure",
      });
    }

    // Remove the item from wishlist using $pull operator
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: { id: id } } },
      { new: true }
    );

    // Send success response
    res.status(200).json({
      user: updatedUser,
      status: "success",
      message: "Item removed from wishlist successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

const getUserWishList = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    res.status(200).json({
      data: user.wishlist,
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

module.exports = {
  getCurrentUser: getCurrentUser,
  getAllUser: getAllUser,
  deleteUser: deleteUser,
  isAdminMiddleWare: isAdminMiddleWare,
  addToWishList: addToWishList,
  deleteFromWishlist:deleteFromWishlist,
  getUserWishList: getUserWishList,
};
