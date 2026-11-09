import Resume from "../models/Resume.js";
import fs from "fs";
import path from "path";

export async function getCurrent(req, res) {
  const r = await Resume.findOne().sort({ uploadedAt: -1 });
  res.json(r || null);
}

export async function uploadResume(req, res) {
  if (!req.file) return res.status(400).json({ message: "No file" });

  // delete old file
  const old = await Resume.findOne().sort({ uploadedAt: -1 });
  if (old?.fileUrl) {
    const p = path.join("uploads", path.basename(old.fileUrl));
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  const r = await Resume.create({
    fileUrl: `/uploads/${req.file.filename}`,
    fileName: req.file.originalname,
  });
  res.status(201).json(r);
}