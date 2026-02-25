// middle/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const authenticate = async (req, res, next) => {
  try {
    // Get token from headers or cookies
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Admin role check middleware
const adminAuth = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied. Admins only." });

  next();
};

module.exports = { authenticate, adminAuth };
