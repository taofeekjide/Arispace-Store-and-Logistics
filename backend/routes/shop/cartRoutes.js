const express = require("express");
const Cart = require('../../models/Cart.js')

const {
  addToCart,
  getCartItems,
  editCartItems,
  deleteCartItems,
} = require("../../controllers/shop/cartController.js");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCartItems);
router.put("/edit-cart", editCartItems);
router.delete("/delete/:userId/:productId", deleteCartItems);
router.delete("/clear/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.json({ success: true, data: [] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
