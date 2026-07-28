const Achievement = require("../models/Achievement");

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort("-year");

    res.json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching achievements",
      error: error.message,
    });
  }
};

// @desc    Get single achievement
// @route   GET /api/achievements/:id
// @access  Public
const getAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching achievement",
      error: error.message,
    });
  }
};

// @desc    Create achievement
// @route   POST /api/admin/achievements
// @access  Private
const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);

    res.status(201).json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating achievement",
      error: error.message,
    });
  }
};

// @desc    Update achievement
// @route   PUT /api/admin/achievements/:id
// @access  Private
const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating achievement",
      error: error.message,
    });
  }
};

// @desc    Delete achievement
// @route   DELETE /api/admin/achievements/:id
// @access  Private
const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.json({
      success: true,
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting achievement",
      error: error.message,
    });
  }
};

module.exports = {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
