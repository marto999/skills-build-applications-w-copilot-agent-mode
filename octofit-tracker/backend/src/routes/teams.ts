import { Router } from "express";
import Team from "../models/Team";

const router = Router();

router.get("/", async (req, res) => {
  const teams = await Team.find().populate("members");
  res.json({ teams });
});

router.post("/", async (req, res) => {
  const t = new Team(req.body);
  await t.save();
  res.status(201).json({ message: "team created", team: t });
});

export default router;
