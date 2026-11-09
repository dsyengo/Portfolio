import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";

async function run() {
  await connectDB();
  const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (exists) {
    console.log("Admin already exists");
  } else {
    await Admin.create({
      name: "Denis Wilson",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log("✅ Admin created:", process.env.ADMIN_EMAIL);
  }
  await mongoose.disconnect();
  process.exit(0);
}

run();