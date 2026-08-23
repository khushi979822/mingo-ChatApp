import express from "express";
import { getAllUsers, searchUsers, updateProfile } from "../controllers/userController.js";
import { SendMessage, GetMessages } from "../controllers/messageController.js";
import { Protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ── User routes ──────────────────────────────────────────────────────────────
router.get("/allUsers", Protect, getAllUsers);
router.get("/search", Protect, searchUsers);          // GET /api/user/search?q=name
router.put("/profile", Protect, updateProfile);

// ── Message routes ───────────────────────────────────────────────────────────
router.post("/send-message", Protect, SendMessage);
router.get("/get-messages/:friendId", Protect, GetMessages);

export default router;
