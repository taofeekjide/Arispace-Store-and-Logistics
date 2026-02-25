const express = require("express");
const {
  register,
  login,
  logout,
  checkAuth,
} = require("../../controllers/auth/authController.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", checkAuth, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated",
    user,
  });
});

module.exports = router;
