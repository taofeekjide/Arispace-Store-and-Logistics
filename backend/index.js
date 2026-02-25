require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth/authRoutes.js");
const adminProductsRoutes = require("./routes/admin/productsRoutes.js");
const shopProductsRouter = require("./routes/shop/productsRoutes.js");
const shopCartRouter = require("./routes/shop/cartRoutes.js");
const shopAddressRouter = require("./routes/shop/addressRoutes.js");
const orderRoutes = require("./routes/shop/orderRoutes.js");
const paystackRoutes = require("./routes/paystack.js");

//database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

//routes api
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProductsRoutes);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", orderRoutes);
app.use("/api/paystack", paystackRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
