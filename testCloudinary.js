// testCloudinary.js
import cloudinary from "./utils/cloudinary.js"; // Make sure the path matches your cloudinary.js
import dotenv from "dotenv";
dotenv.config(); // ensure env variables are loaded

async function testUpload() {
  try {
    // Use any public image URL for testing
    const res = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/w_100/lady.jpg"
    );
    console.log("Cloudinary test success!");
    console.log("Uploaded image URL:", res.secure_url);
  } catch (err) {
    console.error("Cloudinary test error:", err);
  }
}

testUpload();
