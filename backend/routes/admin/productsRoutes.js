const express = require("express");
const {
  handleImageUpload,
  addProduct,
  editProduct,
  getProducts,
  deleteProduct,
} = require("../../controllers/admin/productsController.js");
const { upload } = require("../../helpers/cloudinary.js");
const { authenticate, adminAuth } = require("../../middleware/authMiddleware.js");


const router = express.Router();

// Protect all admin routes
router.use(authenticate, adminAuth);

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.get("/get", getProducts);
router.delete("/delete/:id", deleteProduct);

module.exports = router;