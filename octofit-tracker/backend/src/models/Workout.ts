import { Schema, model, Types } from "mongoose";

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  sets: { type: Number },
  reps: { type: Number },
  weightKg: { type: Number },
});

const WorkoutSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: () => new Date() },
  exercises: [ExerciseSchema],
  notes: { type: String },
});

export default model("Workout", WorkoutSchema);
