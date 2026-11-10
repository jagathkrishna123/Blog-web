import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload directory if it doesn't exist
const uploadPath = "uploads/blogs";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

// File type validation
const fileFilter = (req, file, cb) => {

  console.log("File Name:", file.originalname);
  console.log("MIME Type:", file.mimetype);

  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  const ext = path.extname(file.originalname).toLowerCase();

  const isValid = allowedExtensions.includes(ext);

  console.log("Extension:", ext);
  console.log("Valid Extension:", isValid);

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"));
  }
};

// Initialize multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export default upload;