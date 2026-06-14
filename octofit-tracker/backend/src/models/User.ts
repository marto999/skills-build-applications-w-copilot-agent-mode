import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: Types.ObjectId, ref: "Team" },
  role: { type: String, default: "member" },
  joinedAt: { type: Date, default: () => new Date() },
});

export default model("User", UserSchema);
