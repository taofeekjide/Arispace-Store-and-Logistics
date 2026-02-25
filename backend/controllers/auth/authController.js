const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.js");

//register
async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or Username already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
}

//login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not registered",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
        email: existingUser.email,
        userName: existingUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: existingUser._id,
          email: existingUser.email,
          role: existingUser.role,
          userName: existingUser.username,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
}

//logout
function logout(req, res) {
  res.clearCookie("token").json({
    success: true,
    message: "Logout successful",
  });
}

//to check authentication status
async function checkAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
}

module.exports = { register, login, logout, checkAuth };
