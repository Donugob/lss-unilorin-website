const express = require('express');
const router = express.Router();
const {
    getExecutives,
    getExecutiveById, // <-- THE MISSING IMPORT
    getFeaturedExecutive,
    createExecutive,
    updateExecutive,
    deleteExecutive
} = require('../controllers/executiveController');
const { protect } = require('../middleware/authMiddleware');

// --- Public Routes ---
// NOTE: More specific routes must come BEFORE dynamic routes
router.get('/', getExecutives);
router.get('/featured', getFeaturedExecutive);

// This dynamic route must be last among the GET routes
router.get('/:id', getExecutiveById); 


// --- Admin Routes ---
router.post('/', protect, createExecutive);
router.put('/:id', protect, updateExecutive);
router.delete('/:id', protect, deleteExecutive);

module.exports = router;