const express = require("express");
const router = express.Router();
const {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievementController");
const auth = require("../middleware/auth");

// Public routes
router.get("/", getAchievements);
router.get("/:id", getAchievement);

// Admin routes (protected)
router.post("/", auth, createAchievement);
router.put("/:id", auth, updateAchievement);
router.delete("/:id", auth, deleteAchievement);

module.exports = router;
