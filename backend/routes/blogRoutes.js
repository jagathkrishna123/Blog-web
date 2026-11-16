import express from "express";

import {
  createBlog,
  getAllBlogs,
  getBlogById
} from "../controllers/blogController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Admin routes
router.post("/", protect, upload.single("image"), createBlog);

export default router;