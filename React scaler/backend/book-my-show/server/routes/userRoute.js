const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");

const userRouter = express.Router();

// Register a user
userRouter.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User Already Exists",
      });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "Registration Successful, Please login",
    });
  } catch (error) {
    console.log(error);
  }
});

// Login a user
userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist. Please register.",
      });
    }
    // Simplified password validation (assuming passwords are stored in plain text, which is not recommended)
    if (req.body.password !== user.password) {
      return res.send({
        success: false,
        message: "Sorry, invalid password entered!",
      });
    }
    const tokan = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("Token", tokan);

    res.send({
      success: true,
      message: "Login successfully!",
      data: tokan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});

// Get current user
userRouter.get("/get-current-user", authMiddleware, async (req, res) => {
  console.log("Proscessing request for user with ID:", req.body.userId);
  const user = await User.findById(req.body.userId).select("-password");
  res.send({
    success: true, 
    data: user, 
    message: "You are authorized to go to the protected route"
  });
  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User not found",
    });
  }  
});




module.exports = userRouter;
