import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAllBlogs,
  getMyTotalBlogLikes,
  getOwnBlogs,
  getPublishedBlog,
  likeBlog,
  togglePublishBlog,
  updateBlog,
  getBlogById,   // ✅ new controller
} from "../controllers/blog.controller.js";

const router = express.Router();

// ✅ Create blog
router.route("/").post(isAuthenticated, createBlog);

// ✅ Update blog
router.route("/:blogId").put(isAuthenticated, singleUpload, updateBlog);

// ✅ Toggle publish
router.route("/:blogId").patch(togglePublishBlog);

// ✅ Get all blogs
router.route("/get-all-blogs").get(getAllBlogs);

// ✅ Get published blogs
router.route("/get-published-blogs").get(getPublishedBlog);

// ✅ Get own blogs
router.route("/get-own-blogs").get(isAuthenticated, getOwnBlogs);

// ✅ Get single blog by ID (new route)
router.route("/blog/:id").get(getBlogById);

// ✅ Delete blog
router.route("/delete/:id").delete(isAuthenticated, deleteBlog);

// ✅ Like / Dislike
router.get("/:id/like", isAuthenticated, likeBlog);
router.get("/:id/dislike", isAuthenticated, dislikeBlog);

// ✅ Get my blogs likes
router.get("/my-blogs/likes", isAuthenticated, getMyTotalBlogLikes);

export default router;
