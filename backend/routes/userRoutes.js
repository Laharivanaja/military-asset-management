const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { auth, authorize } = require("../middleware/auth");

// TEST
router.get("/test", (req, res) => {
  res.send("User route working");
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, base } = req.body;

    const user = new User({ name, email, password, role, base });
    await user.save();

    res.json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login success", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔒 ADMIN ONLY ROUTE
router.get("/admin-data", auth, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

// 🔒 COMMANDER ONLY ROUTE
router.get("/commander-data", auth, authorize("commander"), (req, res) => {
  res.json({ message: "Welcome Commander", user: req.user });
});

module.exports = router;