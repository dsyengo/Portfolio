import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    fileUrl: { type: String, required: true },
    fileName: String,
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);