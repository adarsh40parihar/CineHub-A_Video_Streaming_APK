const express = require('express');
const PaymentRouter = express.Router();

const { getPaymentController, updatePremiumAccessController } = require("../Controllers/PaymentController");

PaymentRouter.post("/:order", getPaymentController);
PaymentRouter.patch("/updatepremium", updatePremiumAccessController);