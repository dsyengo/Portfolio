import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    year: { type: String, required: true },
    type: {
      type: String,
      enum: ["Competition", "Certification", "Award", "Other"],
      default: "Certification",
    },
    color: { type: String, default: "from-blue-500 to-cyan-500" },
    icon: { type: String, default: "Award" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Achievement", achievementSchema);