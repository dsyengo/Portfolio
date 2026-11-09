import { Router } from "express";
import * as c from "../controllers/resumeController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", c.getCurrent);
router.post("/", protect, upload.single("resume"), c.uploadResume);

export default router;