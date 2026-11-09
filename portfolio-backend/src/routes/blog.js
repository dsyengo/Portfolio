import { Router } from "express";
import * as c from "../controllers/blogController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

// Public
router.get("/", c.list);
router.get("/:slug", c.getBySlug);

// Admin
router.post("/", protect, c.create);
router.put("/:id", protect, c.update);
router.delete("/:id", protect, c.remove);

export default router;