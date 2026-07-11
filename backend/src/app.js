const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const notesRoutes = require("./routes/notes.route");
const tasksRoutes = require("./routes/tasks.route");
const aiRoutes = require("./routes/ai.route");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://studymate-umber-eta.vercel.app/",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;
