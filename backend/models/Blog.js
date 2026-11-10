import mongoose from "mongoose";
import categories from "../constants/categories.js";

const blogSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    subtitle: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true,
      enum: categories
    },

    status: {
      type: String,
      enum: ["Published", "Unpublished"],
      default: "Unpublished"
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;