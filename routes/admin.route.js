import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { User } from "../models/user.model.js";

const router = express.Router();

// ✅ Get all users
router.get("/users", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don't send password
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Delete user
router.delete("/users/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
