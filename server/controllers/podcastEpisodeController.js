const PodcastEpisode = require('../models/podcastEpisodeModel');

// @desc    Get the single next upcoming episode
// @route   GET /api/podcast/upcoming
// @access  Public
const getUpcomingEpisode = async (req, res) => {
    try {
        // Find one episode that is 'Upcoming' and is in the future, sorted by the soonest date
        const episode = await PodcastEpisode.findOne({
            status: 'Upcoming',
            episodeDate: { $gte: new Date() }
        }).sort({ episodeDate: 'asc' });
        res.json(episode); // Can be null if none are upcoming, which is fine
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all archived episodes
// @route   GET /api/podcast/archived
// @access  Public
const getArchivedEpisodes = async (req, res) => {
    try {
        // Find all episodes that are either 'Archived' or are 'Upcoming' but their date has passed
        const episodes = await PodcastEpisode.find({
            $or: [
                { status: 'Archived' },
                { episodeDate: { $lt: new Date() } }
            ]
        }).sort({ episodeDate: 'desc' });
        res.json(episodes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- ADMIN CONTROLLERS ---

// @desc    Get all episodes (for admin list)
// @route   GET /api/podcast/all
// @access  Private/Admin
const getAllEpisodesAdmin = async (req, res) => {
    try {
        const episodes = await PodcastEpisode.find({}).sort({ episodeDate: 'desc' });
        res.json(episodes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new episode
// @route   POST /api/podcast
// @access  Private/Admin
const createEpisode = async (req, res) => {
    try {
        const episode = await PodcastEpisode.create(req.body);
        res.status(201).json(episode);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create episode', error: error.message });
    }
};

// @desc    Update an episode
// @route   PUT /api/podcast/:id
// @access  Private/Admin
const updateEpisode = async (req, res) => {
    try {
        const episode = await PodcastEpisode.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!episode) return res.status(404).json({ message: 'Episode not found' });
        res.json(episode);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update episode', error: error.message });
    }
};

// @desc    Delete an episode
// @route   DELETE /api/podcast/:id
// @access  Private/Admin
const deleteEpisode = async (req, res) => {
    try {
        const episode = await PodcastEpisode.findById(req.params.id);
        if (episode) {
            await episode.deleteOne();
            res.json({ message: 'Episode removed' });
        } else {
            res.status(404).json({ message: 'Episode not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getUpcomingEpisode,
    getArchivedEpisodes,
    getAllEpisodesAdmin,
    createEpisode,
    updateEpisode,
    deleteEpisode
};