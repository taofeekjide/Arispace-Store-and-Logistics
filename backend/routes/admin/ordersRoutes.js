const express = require("express");
const Order = require("../../models/Order.js");
const { authenticate, adminAuth } = require("../../middleware/authMiddleware.js");

const router = express.Router();

// Protect all admin routes
router.use(authenticate, adminAuth);

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update order status
router.patch("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.orderStatus = status;
    order.orderUpdateDate = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;