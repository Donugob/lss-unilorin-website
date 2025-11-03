const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    // --- THIS IS THE KEY LOGIC ---
    // Check if the request path includes '/public'.
    const isPublicUpload = req.originalUrl.includes("/public");

    const isImage = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
    ].includes(file.mimetype);
    let folder;

    if (isPublicUpload) {
      folder = "lss-unilorin-submissions"; // Public uploads go here
    } else {
      folder = isImage ? "lss-unilorin-assets" : "lss-unilorin-documents"; // Admin uploads go here
    }

    return {
      folder: folder,
      resource_type: isImage ? "image" : "raw",
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB file size limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb(new Error("This file type is not allowed."));
  },
});

module.exports = upload; // We only need to export one uploader
