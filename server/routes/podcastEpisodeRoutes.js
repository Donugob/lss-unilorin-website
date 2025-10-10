const express = require('express');
const router = express.Router();
const {
    getUpcomingEpisode,
    getArchivedEpisodes,
    getAllEpisodesAdmin,
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
router.post('/', protect, createEpisode);
router.put('/:id', protect, updateEpisode);
router.delete('/:id', protect, deleteEpisode);

module.exports = router;