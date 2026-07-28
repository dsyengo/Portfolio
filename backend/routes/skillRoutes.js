const express = require("express");
const router = express.Router();
const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");
const auth = require("../middleware/auth");

// Public routes
router.get("/", getSkills);
router.get("/:id", getSkill);

// Admin routes (protected)
router.post("/", auth, createSkill);
router.put("/:id", auth, updateSkill);
router.delete("/:id", auth, deleteSkill);

module.exports = router;
