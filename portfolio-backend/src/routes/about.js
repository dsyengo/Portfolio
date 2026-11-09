import { Router } from "express";
import * as c from "../controllers/aboutController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", c.getAbout);
router.put("/", protect, c.updateAbout);

export default router;