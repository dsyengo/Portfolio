import Project from "../models/Project.js";

export async function list(req, res) {
  const filter = {};
  if (req.query.featured === "true") filter.featured = true;
  const items = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(items);
}

export async function getOne(req, res) {
  const item = await Project.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
}

export async function create(req, res) {
  const item = await Project.create(req.body);
  res.status(201).json(item);
}

export async function update(req, res) {
  const item = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
}

export async function remove(req, res) {
  const item = await Project.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
}