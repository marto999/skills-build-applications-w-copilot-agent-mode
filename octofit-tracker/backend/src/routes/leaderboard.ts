import { Router } from "express";
import Leaderboard from "../models/Leaderboard";

const router = Router();

router.get("/", async (req, res) => {
  const leaderboard = await Leaderboard.find();
  res.json({ leaderboard });
});

export default router;
