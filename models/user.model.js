// backend/models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    bio:       { type: String, default: "" },
    occupation:{ type: String, default: "" },
    photoUrl:  { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin:  { type: String, default: "" },
    github:    { type: String, default: "" },
    facebook:  { type: String, default: "" },
    
    // Admin flag
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
