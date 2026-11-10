import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      category,
      status
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Blog image is required"
      });
    }

    const blog = await Blog.create({
      image: `/uploads/blogs/${req.file.filename}`,
      title,
      subtitle,
      description,
      category,
      status
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// GET ALL PUBLISHED BLOGS

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "Published" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET A SPECIFIC BLOG

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOne({
      _id: id,
      status: "Published"
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.status(200).json({
      success: true,
      blog
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};