// ✅ Load environment variables
import dotenv from "dotenv";
dotenv.config();

// ✅ Imports
import express from "express";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import adminRoute from "./routes/admin.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// ✅ Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect MongoDB
connectDB();

// ✅ Allowed origins (frontend URLs)
const allowedOrigins = [
  "http://localhost:5173", // local dev (Vite)
  "https://frontend-pi-nine-ohpz8qglqg.vercel.app", // production frontend
];

// ✅ CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// ✅ Preflight support for all routes
app.options("*", cors());

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Backend is running perfectly on Render!",
  });
});

// ✅ API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/admin", adminRoute);

// ✅ Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err.message);
  if (err.message.includes("CORS")) {
    return res.status(403).json({ success: false, message: "CORS blocked." });
  }
  res.status(500).json({ success: false, message: "Server error." });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
