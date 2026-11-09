import Achievement from "../models/Achievement.js";

export async function list(req, res) {
  const items = await Achievement.find().sort({ order: 1, year: -1 });
  res.json(items);
}

export async function getOne(req, res) {
  const item = await Achievement.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
}

export async function create(req, res) {
  const item = await Achievement.create(req.body);
  res.status(201).json(item);
}

export async function update(req, res) {
  const item = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
}

export async function remove(req, res) {
  const item = await Achievement.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
}