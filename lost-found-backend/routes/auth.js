const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/* =========================
   REGISTER USER
========================= */

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // ✅ Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // ✅ Email format check (important)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    // ✅ Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    // ❗ IMPORTANT: Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET missing in .env");
      return res.status(500).json({
        message: "JWT_SECRET not configured"
      });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error); // 🔥 debug

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});


/* =========================
   LOGIN USER
========================= */

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // ✅ Validate fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // ✅ Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // ❗ Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET missing in .env");
      return res.status(500).json({
        message: "JWT_SECRET not configured"
      });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.log("LOGIN ERROR:", error); // 🔥 debug

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});

module.exports = router;