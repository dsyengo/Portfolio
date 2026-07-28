const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    icon: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Skill", skillSchema);
