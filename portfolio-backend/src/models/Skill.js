import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    category: { type: String, required: true }, // e.g. "Backend Architecture"
    icon: { type: String, default: "Code" },    // lucide icon name
    color: { type: String, default: "from-blue-500 to-cyan-500" },
    items: [{ type: String }],                   // ["Node.js", "Express", ...]
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);