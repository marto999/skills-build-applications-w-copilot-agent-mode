import { Schema, model, Types } from "mongoose";

const TeamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: () => new Date() },
});

export default model("Team", TeamSchema);
