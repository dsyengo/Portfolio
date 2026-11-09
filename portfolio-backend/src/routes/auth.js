import { Router } from "express";
import * as c from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/login", c.login);
router.get("/me", protect, c.me);
router.put("/password", protect, c.changePassword);

export default router;