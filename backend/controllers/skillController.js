const Skill = require("../models/Skill");

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    res.json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching skills",
      error: error.message,
    });
  }
};

// @desc    Get single skill category
// @route   GET /api/skills/:id
// @access  Public
const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching skill",
      error: error.message,
    });
  }
};

// @desc    Create skill category
// @route   POST /api/admin/skills
// @access  Private
const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating skill",
      error: error.message,
    });
  }
};

// @desc    Update skill category
// @route   PUT /api/admin/skills/:id
// @access  Private
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating skill",
      error: error.message,
    });
  }
};

// @desc    Delete skill category
// @route   DELETE /api/admin/skills/:id
// @access  Private
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting skill",
      error: error.message,
    });
  }
};

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};
