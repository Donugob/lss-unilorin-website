const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    slug: { // For SEO-friendly URLs, e.g., /news/annual-law-dinner-summary
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    contentBody: { // The main content of the article
        type: String,
        required: [true, 'Please add content'],
    },
    coverImageUrl: {
        type: String,
        default: 'https://res.cloudinary.com/demo/image/upload/v1625141071/placeholder.jpg',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // Link to the User who wrote it
        required: true,
        ref: 'User', // This references our 'User' model
    },
    status: {
        type: String,
        enum: ['published', 'draft'], // A post can be a draft or live
        default: 'draft',
    },
    publishedAt: {
        type: Date,
    }
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;