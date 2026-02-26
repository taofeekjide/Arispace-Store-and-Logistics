const express = require("express");
const router = express.Router();
const axios = require("axios");
const Order = require("../models/Order.js");
const Cart = require("../models/Cart.js");

// Initialize Paystack Transaction
router.post("/initialize", async (req, res) => {
  try {
    const { email, amount, orderId } = req.body;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
        callback_url: `${process.env.CLIENT_BASE_URL}/checkout-success`,
        metadata: {
          orderId: orderId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.status(200).json({ success: true, data: response.data.data });
  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json({ success: false, message: "Paystack init failed" });
  }
});

// Verify Paystack Transaction
router.get("/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;

    // Verify Paystack transaction
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const data = response.data.data;

    if (data.status === "success") {
      const orderId = data.metadata?.orderId;

      if (!orderId) {
        return res
          .status(400)
          .json({ success: false, message: "Order ID missing in metadata" });
      }

      // Fetch the order from DB
      const order = await Order.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }

      // Update order status
      order.paymentStatus = "paid";
      order.orderStatus = "processing";
      await order.save();

      // Clear the user's cart using order.userId
      await Cart.findOneAndUpdate({ userId: order.userId }, { items: [] });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.log("VERIFY ERROR:", err.response?.data || err.message);
    res
      .status(500)
      .json({ success: false, message: "Paystack verification failed" });
  }
});

module.exports = router;
