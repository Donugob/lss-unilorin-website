const express = require('express');
const router = express.Router();
const {
    getUpcomingEpisode,
    getArchivedEpisodes,
    getAllEpisodesAdmin,
    getEpisodeById,
    createEpisode,
    updateEpisode,
    deleteEpisode
} = require('../controllers/podcastEpisodeController');
const { protect } = require('../middleware/authMiddleware');

// --- Public Routes ---
router.get('/upcoming', getUpcomingEpisode);
router.get('/archived', getArchivedEpisodes);

// --- Admin Routes ---
router.get('/all', protect, getAllEpisodesAdmin);
router.route('/:id')
    .get(getEpisodeById) // Re-using for admin edit page
    .put(protect, updateEpisode)
    .delete(protect, deleteEpisode);
router.post('/', protect, createEpisode);

module.exports = router;