import Blog from "../models/Blog.js";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function list(req, res) {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.search) filter.title = { $regex: req.query.search, $options: "i" };
  if (req.query.published) filter.published = req.query.published === "true";
  const posts = await Blog.find(filter).sort({ createdAt: -1 });
  res.json(posts);
}

export async function getBySlug(req, res) {
  const post = await Blog.findOne({ slug: req.params.slug });
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
}

export async function create(req, res) {
  const data = { ...req.body, slug: req.body.slug || slugify(req.body.title) };
  const post = await Blog.create(data);
  res.status(201).json(post);
}

export async function update(req, res) {
  const data = { ...req.body };
  if (data.title && !data.slug) data.slug = slugify(data.title);
  const post = await Blog.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
}

export async function remove(req, res) {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
}