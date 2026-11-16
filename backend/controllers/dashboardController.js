import Blog from "../models/Blog.js";

export const getDashboardStats = async (req, res) => {
  try {

    // Total blogs
    const totalBlogs = await Blog.countDocuments();

    // Published blogs
    const publishedBlogs = await Blog.countDocuments({
      status: "Published"
    });

    // Unpublished blogs
    const unpublishedBlogs = await Blog.countDocuments({
      status: "Unpublished"
    });

    // Latest 5 blogs
    const latestBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title category status createdAt image");

    res.status(200).json({
      success: true,
      stats: {
        totalBlogs,
        publishedBlogs,
        unpublishedBlogs
      },
      latestBlogs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


