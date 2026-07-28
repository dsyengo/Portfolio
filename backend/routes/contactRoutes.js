const express = require("express");
const router = express.Router();
const {
  submitContact,
  getContacts,
  getContact,
  markAsRead,
  deleteContact,
  resendEmail,
} = require("../controllers/contactController");
const auth = require("../middleware/auth");

// Public routes
router.post("/", submitContact);

// Admin routes (protected)
router.get("/", auth, getContacts);
router.get("/:id", auth, getContact);
router.patch("/:id/read", auth, markAsRead);
router.post("/:id/resend", auth, resendEmail);
router.delete("/:id", auth, deleteContact);

module.exports = router;
