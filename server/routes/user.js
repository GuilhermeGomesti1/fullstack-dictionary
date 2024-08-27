const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const User = require("../models/user");

const router = express.Router();

router.get("/me", authenticateToken, (req, res) => {
  res.json({ name: "User 1", email: "example@email.com" });
});

router.get("/me/history", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      results: user.history.map((word) => ({ word, added: new Date() })),
      totalDocs: user.history.length,
      page: 1,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching history", error });
  }
});

router.get("/me/favorites", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      results: user.favorites.map((word) => ({ word, added: new Date() })),
      totalDocs: user.favorites.length,
      page: 1,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error });
  }
});

module.exports = router;
