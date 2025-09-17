import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js"; // need to type connectDB.js instead of connectDB
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://auth-project-bynf.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const port = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(express.json());
app.use("/api/auth", authRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
}
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
