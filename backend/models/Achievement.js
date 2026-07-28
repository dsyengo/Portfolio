const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
    },
    icon: {
      type: String,
      required: true,
      enum: ["Trophy", "Award", "Star", "Shield", "Medal", "GraduationCap"],
      default: "Trophy",
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Achievement", achievementSchema);
