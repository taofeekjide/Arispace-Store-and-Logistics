const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      price: Number,
      salesPrice: Number,
      image: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String,
    notes: String,
  },
  deliveryFee: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "processing",
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    default: "pending",
  },
  totalAmount: Number,
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderUpdateDate: Date,
  paymentId: String,
});

module.exports = mongoose.model("Order", orderSchema);
