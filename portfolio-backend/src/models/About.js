import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    headline: { type: String, required: true },
    bio: { type: String, required: true },
    location: { type: String, default: "Nairobi, Kenya" },
    email: String,
    phone: String,
    socials: {
      linkedin: String,
      github: String,
      twitter: String,
    },
    highlights: [String], // bullet points
    profileImage: String,
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);