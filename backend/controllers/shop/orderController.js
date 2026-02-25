const Cart = require("../../models/Cart.js");
const Order = require("../../models/Order.js");

const createOrder = async (req, res) => {
  try {
    const { userId, addressInfo, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ success: false, message: "Cart is empty" });

    const deliveryFee =
      addressInfo.state.toLowerCase() === "lagos" ? 4000 : 8000;

    // Calculate total
    const totalAmount =
      cart.items.reduce(
        (sum, item) =>
          sum +
          (item.productId.salesPrice > 0
            ? item.productId.salesPrice
            : item.productId.price) *
            item.quantity,
        0,
      ) + deliveryFee;

    const order = new Order({
      userId,
      cartItems: cart.items.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        price: item.productId.price,
        salesPrice: item.productId.salesPrice,
        image: item.productId.image,
        quantity: item.quantity,
      })),
      addressInfo,
      orderStatus: "pending",
      paymentMethod,
      paymentStatus: "pending",
      deliveryFee,
      totalAmount,
      orderDate: new Date(),
    });

    await order.save();

    res.status(200).json({
      success: true,
      data: { orderId: order._id, totalAmount: order.totalAmount },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createOrder, getUserOrders };
