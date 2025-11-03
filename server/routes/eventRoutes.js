const express = require('express');
const router = express.Router();

const {
    getEvents,
    getFeaturedEvent,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// --- Public Routes ---
// These two can be combined into a single route definition
router.route('/')
    .get(getEvents)
    .post(protect, createEvent); // The 'protect' middleware guards this POST route

router.get('/featured', getFeaturedEvent);

// --- Public route to get a single event by its ID ---
// --- Protected routes to update and delete a single event ---
router.route('/:id')
    .get(getEventById)
    .put(protect, updateEvent)
    .delete(protect, deleteEvent);


module.exports = router;