import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usersRouter from "./routes/users";
import teamsRouter from "./routes/teams";
import activitiesRouter from "./routes/activities";
import leaderboardRouter from "./routes/leaderboard";
import workoutsRouter from "./routes/workouts";

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/octofit_db";
const PORT = Number(process.env.PORT) || 8000;

// Codespaces-aware frontend origin
const CODESPACE = process.env.CODESPACE_NAME;
const FRONTEND_ORIGIN = CODESPACE
  ? `https://${CODESPACE}-5173.app.github.dev`
  : process.env.VITE_API_URL || "http://localhost:5173";

app.use(
  cors({
    origin: (origin: string | undefined, cb: (err: Error | null, allow?: boolean) => void) => {
      // allow requests from known frontend origin or when origin is undefined (tools)
      if (!origin || origin === FRONTEND_ORIGIN) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
  })
);

app.get("/", (req, res) =>
  res.send(`OctoFit Tracker API running. Frontend dev server: ${FRONTEND_ORIGIN}`)
);

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Mount API routers under /api
app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log(`Frontend origin allowed: ${FRONTEND_ORIGIN}`);
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
