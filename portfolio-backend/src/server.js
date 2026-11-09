import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.js";
import aboutRoutes from "./routes/about.js";
import skillRoutes from "./routes/skills.js";
import projectRoutes from "./routes/projects.js";
import achievementRoutes from "./routes/achievements.js";
import experienceRoutes from "./routes/experiences.js";
import blogRoutes from "./routes/blog.js";
import messageRoutes from "./routes/messages.js";
import resumeRoutes from "./routes/resume.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ─── CORS (runs first — must answer preflights before anything else) ─
if (!process.env.CLIENT_URL) {
  console.error("❌ CLIENT_URL is not set in .env — refusing to start");
  process.exit(1);
}

const allowedOrigins = process.env.CLIENT_URL
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  console.error("❌ CLIENT_URL is empty — refusing to start");
  process.exit(1);
}

console.log("🌐 Allowed origins:", allowedOrigins);

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // curl / Postman
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
// ─────────────────────────────────────────────────────────────────────

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

// static uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
});