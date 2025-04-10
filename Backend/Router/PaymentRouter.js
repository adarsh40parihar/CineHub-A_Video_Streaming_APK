const express = require('express');
const PaymentRouter = express.Router();

const { getPaymentController, updatePremiumAccessController } = require("../Controllers/PaymentController");

const { protectRouteMiddleware } = require("../Controllers/AuthController");

PaymentRouter
    .use(protectRouteMiddleware)
    .patch("/updatepremium", updatePremiumAccessController)
    .post("/order", getPaymentController)

module.exports = PaymentRouter;