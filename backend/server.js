import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Quickblog API is running"
  });
});

//note ROUTES...................

app.use("/api/auth", authRoutes);

app.get("/api/test-protected", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin!",
    admin: req.admin
  });
});

app.use("/uploads", express.static("uploads"));

app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();