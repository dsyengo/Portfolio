import jwt from "jsonwebtoken";
import { z } from "zod";
import Admin from "../models/Admin.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export async function login(req, res) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = schema.parse(req.body);
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await admin.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    token: signToken(admin._id),
    admin: { id: admin._id, name: admin.name, email: admin.email },
  });
}

export async function me(req, res) {
  res.json(req.admin);
}

export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin._id).select("+password");
  const ok = await admin.comparePassword(currentPassword);
  if (!ok) return res.status(400).json({ message: "Wrong current password" });
  admin.password = newPassword;
  await admin.save();
  res.json({ message: "Password updated" });
}