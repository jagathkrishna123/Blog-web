import express from "express";
import { createBlog } from "../controllers/blogController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

router.post("/", protect, upload.single("image"), createBlog);




export default router;