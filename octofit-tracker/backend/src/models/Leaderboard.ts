import { Schema, model, Types } from "mongoose";

const LeaderboardSchema = new Schema({
  entityType: { type: String, enum: ["user", "team"], required: true },
  entity: { type: Types.ObjectId, required: true },
  points: { type: Number, default: 0 },
  period: { type: String, default: "weekly" },
});

export default model("Leaderboard", LeaderboardSchema);
