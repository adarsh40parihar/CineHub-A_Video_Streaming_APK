const { getUserWishList } = require("../../Controllers/UserController");
const UserModel = require("../../Model/UserModel");

jest.mock("../../Model/UserModel");

describe("User Controller", () => {
  it("View Wishlist", async () => {
    // req ,res
    const req = {
      userId: "1234",
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // input
    UserModel.findById.mockResolvedValue({
      wishlist: [{ id: "abc" }, { id: "xyz" }],
      name: "Jasbir",
    });

    await getUserWishList(req, res);
    // verify (according to my given input is the correct output received)
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: [{ id: "abc" }, { id: "xyz" }],
    });
  });

  it("should throw an error", async () => {
    const req = {
      userId: "1234",
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // input
    UserModel.findById.mockRejectedValue({
      message: "rejected value",
    });

    await getUserWishList(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
        message: "rejected value",
        status: "failure",
    });
  });
});
