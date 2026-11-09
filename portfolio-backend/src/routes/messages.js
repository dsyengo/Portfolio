import { Router } from "express";
import * as c from "../controllers/messageController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/", c.create);                 // public – contact form
router.get("/", protect, c.list);           // admin inbox
router.put("/:id/read", protect, c.markRead);
router.delete("/:id", protect, c.remove);

export default router;