const express = require("express");
const router = express.Router();
const {
  getBlogPosts,
  getBlogPostBySlug,
  getFeaturedPosts,
  getCategories,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require("../controllers/blogController");
const auth = require("../middleware/auth");

// Public routes
router.get("/", getBlogPosts);
router.get("/featured", getFeaturedPosts);
router.get("/categories", getCategories);
router.get("/:slug", getBlogPostBySlug);

// Admin routes (protected)
router.post("/", auth, createBlogPost);
router.put("/:id", auth, updateBlogPost);
router.delete("/:id", auth, deleteBlogPost);

module.exports = router;
