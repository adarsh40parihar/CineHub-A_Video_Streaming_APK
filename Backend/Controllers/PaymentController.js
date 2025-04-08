const Razorpay = require("razorpay");
const UserModel = require("../Model/UserModel");
const ShortId = require("short-unique-id");
const uid = new ShortId({ length: 10 });


const { RAZORPAY_PUBLIC_KEY, RAZORPAY_PRIVATE_KEY } = process.env;
const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_PUBLIC_KEY,
  key_secret: RAZORPAY_PRIVATE_KEY,
});

const getPaymentController = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found." });
        }
        if (user.premiumAccess) {
          return res.status(400).json({ error: "You have alreay a existing plan" });
        }

        // if no existing plan then create a new one
        const amount = req.params.order === "family" ? 89 : 29;
        const currency = "INR";
        const receipt = `rp_${uid.rnd()}_${Date.now()}`;//generates a random & unique ID for receipt.

        const orderConfig = {
            amount: amount * 100, //converted into Rupees
            currency: currency,
            receipt: receipt,
        };
        const order = await razorpayInstance.orders.create(orderConfig);

        res.status(200).json({
            amount: order.amount,
            orderId: order.id,
        });
    } catch (err) {
        res.status(500).json({
          message: err.message,
          status: "failure",
        });
    }
};

// updation of status of premium access
const updatePremiumAccessController = async (req, res) => {
    try {
      const { email, premiumType } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Find and update user
      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        {
          $set: {
            premiumAccess: true,
            premiumType: premiumType,
          },
        },
        { new: true, runValidators: true }
      );
        
        res.json({ message: { isPremium: true } });
        
    } catch (err) {
        res.status(500).json({ message: err.message, status: "failure" });
    }
};

module.exports = { getPaymentController, updatePremiumAccessController };
