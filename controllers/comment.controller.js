import { Blog } from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id; // from isAuthenticated middleware
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: 'Text is required', success: false });
    }

    const blog = await Blog.findById(postId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found', success: false });
    }

    const comment = await Comment.create({
      content,
      userId,
      postId
    });

    await comment.populate({
      path: 'userId',
      select: 'firstName lastName photoUrl'
    });

    blog.comments.push(comment._id);
    await blog.save();

    return res.status(201).json({
      message: 'Comment added successfully',
      comment,
      success: true
    });
  } catch (error) {
    console.error("Create Comment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
      error: error.message
    });
  }
};

// Get all comments of a blog post
export const getCommentsOfPost = async (req, res) => {
  try {
    const blogId = req.params.id;
    const comments = await Comment.find({ postId: blogId })
      .populate({ path: 'userId', select: 'firstName lastName photoUrl' })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      comments
    });
  } catch (error) {
    console.error("Get Comments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
      error: error.message
    });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);
    await Blog.findByIdAndUpdate(comment.postId, { $pull: { comments: commentId } });

    return res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete Comment Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete comment", error: error.message });
  }
};

// Edit a comment
export const editComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.id;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found', success: false });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this comment' });
    }

    comment.content = content;
    comment.editedAt = new Date();
    await comment.save();

    return res.status(200).json({ success: true, message: 'Comment updated successfully', comment });
  } catch (error) {
    console.error("Edit Comment Error:", error);
    return res.status(500).json({ success: false, message: "Failed to edit comment", error: error.message });
  }
};

// Like or unlike a comment
export const likeComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.id;

    const comment = await Comment.findById(commentId).populate("userId");
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    const alreadyLiked = comment.likes.includes(userId);

    if (alreadyLiked) {
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
      comment.numberOfLikes = Math.max(0, comment.numberOfLikes - 1);
    } else {
      comment.likes.push(userId);
      comment.numberOfLikes += 1;
    }

    await comment.save();

    return res.status(200).json({
      success: true,
      message: alreadyLiked ? "Comment unliked" : "Comment liked",
      updatedComment: comment
    });
  } catch (error) {
    console.error("Like Comment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to like/unlike comment",
      error: error.message
    });
  }
};

// Get all comments on the logged-in user's blogs
export const getAllCommentsOnMyBlogs = async (req, res) => {
  try {
    const userId = req.id;

    const myBlogs = await Blog.find({ author: userId }).select("_id");
    const blogIds = myBlogs.map(blog => blog._id);

    if (blogIds.length === 0) {
      return res.status(200).json({ success: true, totalComments: 0, comments: [], message: "No blogs found for this user" });
    }

    const comments = await Comment.find({ postId: { $in: blogIds } })
      .populate("userId", "firstName lastName email")
      .populate("postId", "title");

    return res.status(200).json({ success: true, totalComments: comments.length, comments });
  } catch (error) {
    console.error("Get All Comments on My Blogs Error:", error);
    return res.status(500).json({ success: false, message: "Failed to get comments", error: error.message });
  }
};
