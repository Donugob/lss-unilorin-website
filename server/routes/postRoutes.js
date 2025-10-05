const express = require('express');
const router = express.Router();

const {
    getPublishedPosts,
    getPostBySlug,
    getAllPostsAdmin,
    getPostByIdAdmin,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// --- Public Routes ---
router.get('/', getPublishedPosts);

// --- Admin-Only Routes ---
// Note: We place more specific routes before dynamic ones
router.get('/all', protect, getAllPostsAdmin); // For the admin to see all posts

// --- Public Route for a single post ---
router.get('/admin/:id', protect, getPostByIdAdmin);
// Must be last among GET routes with similar structure
router.get('/:slug', getPostBySlug);

// --- Protected Admin CRUD Routes ---
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;