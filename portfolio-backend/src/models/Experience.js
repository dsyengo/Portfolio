import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    startDate: { type: String, required: true }, // "Jan 2023"
    endDate: { type: String, default: "Present" },
    description: [String],
    technologies: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);