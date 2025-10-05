const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure the Cloudinary SDK with your credentials from .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'lss-unilorin-events', // The name of the folder in Cloudinary where images will be stored
        allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed image formats
    },
});

// Create the multer upload instance
const upload = multer({ storage: storage });

module.exports = upload;