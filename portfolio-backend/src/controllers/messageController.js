import Message from "../models/Message.js";
import { sendContactEmail } from "../utils/mailer.js";

export async function create(req, res) {
  const msg = await Message.create(req.body);
  sendContactEmail(req.body).catch((e) => console.error("mail err", e));
  res.status(201).json({ message: "Message sent", id: msg._id });
}

export async function list(req, res) {
  const msgs = await Message.find().sort({ createdAt: -1 });
  res.json(msgs);
}

export async function markRead(req, res) {
  await Message.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ message: "Marked read" });
}

export async function remove(req, res) {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
}