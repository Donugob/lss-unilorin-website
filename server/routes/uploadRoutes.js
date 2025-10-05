const express = require('express');
const upload = require('../config/cloudinaryConfig');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Here we create a custom middleware function to handle potential multer errors
const multerUpload = (req, res, next) => {
    // We use the 'upload.single' middleware inside this function
    const uploader = upload.single('image');

    uploader(req, res, function (err) {
        // This function will be called after multer tries to process the upload
        if (err) {
            // If multer returns an error (e.g., file type not allowed, file too large)
            console.error('Multer Error:', err);
            return res.status(400).json({ message: err.message });
        }
        // If everything is fine, move to the next function in the chain
        next();
    });
};

router.post('/', protect, multerUpload, (req, res) => {
    // By the time we get here, we know multer has succeeded.
    if (req.file) {
        res.status(200).json({
            message: 'Image uploaded successfully',
            imageUrl: req.file.path
        });
    } else {
        // This case might happen if no file was part of the request
        res.status(400).json({ message: 'No file was uploaded.' });
    }
});

module.exports = router;