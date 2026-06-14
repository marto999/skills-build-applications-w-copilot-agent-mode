import { Router } from "express";
import User from "../models/User";

const router = Router();

// GET /api/users/
router.get("/", async (req, res) => {
  const users = await User.find().populate("team");
  res.json({ users });
});

// POST /api/users/
router.post("/", async (req, res) => {
  const u = new User(req.body);
  await u.save();
  res.status(201).json({ message: "user created", user: u });
});

export default router;
