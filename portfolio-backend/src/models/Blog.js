import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true }, // markdown or HTML
    featuredImage: String,
    category: { type: String, required: true },
    tags: [String],
    readTime: { type: String, default: "5 min read" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);