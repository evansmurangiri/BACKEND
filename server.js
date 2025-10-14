// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import adminRoute from "./routes/admin.route.js"; // NEW
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS: allow frontend dev origin and deployed origin
app.use(cors({
  origin: ["http://localhost:5173", "https://mern-blog-ha28.onrender.com"],
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.options("*", (req, res) => res.sendStatus(204));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/admin", adminRoute); // admin routes mounted here

// Production static serving (unchanged)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_, res) => res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html")));
}

app.listen(PORT, () => {
  console.log(`✅ Server listening at port ${PORT}`);
  connectDB();
});
