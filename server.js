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

// ✅ Connect to DB
connectDB();

// ✅ Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-pi-nine-ohpz8qglqg.vercel.app", // your Vercel frontend
];

// ✅ Force custom CORS middleware FIRST
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ✅ Then also use cors() to handle origin arrays cleanly
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running fine 😎",
  });
});

// ✅ API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/admin", adminRoute);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
