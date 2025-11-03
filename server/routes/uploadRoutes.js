const express = require("express");
const upload = require("../config/cloudinaryConfig"); // Our single, smart uploader
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// --- 1. Middleware for PUBLIC image submissions ---
// This specifically looks for a field named 'image'.
const publicImageUploader = (req, res, next) => {
  const uploader = upload.single("image");

  uploader(req, res, function (err) {
    if (err) {
      console.error("Public Upload Multer Error:", err);
      return res
        .status(400)
        .json({ message: err.message || "File upload error." });
    }
    next();
  });
};

// --- 2. Middleware for ADMIN file uploads ---
// This looks for a more generic field named 'file'.
const adminFileUploader = (req, res, next) => {
  const uploader = upload.single("file");

  uploader(req, res, function (err) {
    if (err) {
      console.error("Admin Upload Multer Error:", err);
      return res
        .status(400)
        .json({ message: err.message || "File upload error." });
    }
    next();
  });
};

// --- 3. The New PUBLIC Route ---
// This endpoint is NOT protected by the 'protect' middleware.
// It uses the public uploader.
router.post("/public", publicImageUploader, (req, res) => {
  if (req.file) {
    // For public uploads, we just return the URL.
    res.status(200).json({ imageUrl: req.file.path });
  } else {
    res.status(400).json({ message: "No file was uploaded." });
  }
});

// --- 4. The Existing ADMIN Route (Now Updated) ---
// This endpoint IS protected and uses the admin uploader.
router.post("/", protect, adminFileUploader, (req, res) => {
  if (req.file) {
    res.status(200).json({
      message: "File uploaded successfully",
      imageUrl: req.file.path,
    });
  } else {
    res.status(400).json({ message: "No file was uploaded." });
  }
});

module.exports = router;
