const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        // Determine the resource type and folder based on file type
        const isImage = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype);
        const resourceType = isImage ? 'image' : 'raw'; // 'raw' for PDFs, docs, etc.
        const folder = isImage ? 'lss-unilorin-images' : 'lss-unilorin-documents';
        
        return {
            folder: folder,
            resource_type: resourceType,
            // For raw files, you might want to preserve the original filename
            public_id: file.originalname.split('.').slice(0, -1).join('_'),
        };
    },
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Define allowed file types
        const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
        const mimetype = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(file.originalname.toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: File type not allowed!');
    }
});

module.exports = upload;