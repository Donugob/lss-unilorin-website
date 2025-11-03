const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    level: {
        type: String,
        required: true,
        enum: ['100L', '200L', '300L', '400L', '500L'] // Enforces valid levels
    },
    materialType: {
        type: String,
        required: true,
        enum: ['Lecture Note', 'Past Question', 'Handout', 'Textbook'] // Scalable for the future
    },
    courseName: { type: String }, // For future filtering
    fileUrl: { type: String, required: true }, // The URL from Cloudinary
    fileType: { // e.g., 'PDF', 'Image', 'Document'
        type: String,
        required: true,
    },
    author: { type: String }, // e.g., a lecturer's name
    principles: [String], // An array of strings for legal principles
}, { timestamps: true });

const Material = mongoose.model('Material', materialSchema);
module.exports = Material;