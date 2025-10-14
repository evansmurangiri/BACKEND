// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import adminRoute from "./routes/admin.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Use your actual frontend URLs
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local dev
      "https://frontend-pi-nine-ohpz8qglqg.vercel.app", // your deployed frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", (req, res) => res.sendStatus(204));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/admin", adminRoute);

// ❌ Removed static file serving for Render (Vercel handles frontend)

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening at port ${PORT}`);
  connectDB();
});
