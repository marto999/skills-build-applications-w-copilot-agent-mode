/**
 * Seed the octofit_db database with test data
 *
 * This script connects to the local MongoDB instance on port 27017
 * and populates sample users, teams, activities, workouts and leaderboard entries.
 */

import mongoose from "mongoose";
import User from "../models/User";
import Team from "../models/Team";
import Activity from "../models/Activity";
import Workout from "../models/Workout";
import Leaderboard from "../models/Leaderboard";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/octofit_db";

async function seed() {
  console.log("Seed the octofit_db database with test data");
  await mongoose.connect(MONGO_URI);
  console.log("Connected to", MONGO_URI);

  // Clear existing
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create teams
  const alpha = new Team({ name: "Alpha Runners" });
  const beta = new Team({ name: "Beta Cyclers" });
  await alpha.save();
  await beta.save();

  // Create users
  const users = [
    new User({ name: "Alicia Gomez", email: "alicia@example.com", team: alpha._id }),
    new User({ name: "Ben Turner", email: "ben@example.com", team: alpha._id }),
    new User({ name: "Cara Li", email: "cara@example.com", team: beta._id }),
  ];
  await User.insertMany(users);

  // Add members to teams
  alpha.members = [users[0]._id, users[1]._id];
  beta.members = [users[2]._id];
  await alpha.save();
  await beta.save();

  // Activities
  const activities = [
    new Activity({ user: users[0]._id, type: "run", distanceKm: 5.2, durationMin: 28, date: new Date() }),
    new Activity({ user: users[1]._id, type: "cycle", distanceKm: 20.5, durationMin: 60, date: new Date() }),
    new Activity({ user: users[2]._id, type: "swim", distanceKm: 1.2, durationMin: 35, date: new Date() }),
  ];
  await Activity.insertMany(activities);

  // Workouts
  const workouts = [
    new Workout({ user: users[0]._id, exercises: [{ name: "Push Ups", sets: 3, reps: 12 }] }),
    new Workout({ user: users[1]._id, exercises: [{ name: "Squats", sets: 4, reps: 10, weightKg: 40 }] }),
  ];
  await Workout.insertMany(workouts);

  // Leaderboard
  const lb = [
    new Leaderboard({ entityType: "team", entity: alpha._id, points: 250, period: "weekly" }),
    new Leaderboard({ entityType: "team", entity: beta._id, points: 180, period: "weekly" }),
  ];
  await Leaderboard.insertMany(lb);

  console.log("Seeding complete.");
  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
