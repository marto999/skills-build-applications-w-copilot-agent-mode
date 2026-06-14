import { Schema, model, Types } from "mongoose";

const ActivitySchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["run", "cycle", "swim", "gym"], required: true },
  distanceKm: { type: Number },
  durationMin: { type: Number },
  date: { type: Date, default: () => new Date() },
  notes: { type: String },
});

export default model("Activity", ActivitySchema);
