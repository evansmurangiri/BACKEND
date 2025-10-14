import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import path from "path";

// Load environment variables first
dotenv.config({ path: path.resolve("./backend/.env") }); // adjust path if needed

// Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Optional: simple log to verify config (remove in production)
console.log(
  "Cloudinary Config Loaded:",
  process.env.CLOUD_NAME,
  process.env.API_KEY ? "API key loaded ✅" : "API key missing ❌"
);

export default cloudinary;
