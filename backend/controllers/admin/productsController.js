const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

async function handleImageUpload(req, res) {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error uploading image:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during image upload" });
  }
}

//to add a product
async function addProduct(req, res) {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      stock,
    } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      stock,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//get all products
async function getProducts(req, res) {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//edit a product
async function editProduct(req, res) {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      stock,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: true,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salesPrice =
      salesPrice === "" ? '' : salesPrice || findProduct.salesPrice;
    findProduct.image = image || findProduct.image;
    findProduct.stock = stock || findProduct.stock;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
      message: "Product edited successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//delete a product
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: true,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

module.exports = {
  handleImageUpload,
  addProduct,
  getProducts,
  editProduct,
  deleteProduct,
};
