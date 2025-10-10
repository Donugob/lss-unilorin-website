const PodcastEpisode = require('../models/podcastEpisodeModel');

// --- Public Controllers ---
const getUpcomingEpisode = async (req, res) => {
    try {
        const episode = await PodcastEpisode.findOne({ episodeDate: { $gte: new Date() } }).sort({ episodeDate: 'asc' });
        if (episode) {
            episode.status = 'Upcoming';
            await episode.save();
        }
        res.json(episode);
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const getArchivedEpisodes = async (req, res) => {
    try {
        await PodcastEpisode.updateMany({ episodeDate: { $lt: new Date() } }, { status: 'Archived' });
        const episodes = await PodcastEpisode.find({ status: 'Archived' }).sort({ episodeDate: 'desc' });
        res.json(episodes);
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// --- ADMIN CONTROLLERS ---
const getAllEpisodesAdmin = async (req, res) => {
    try {
        const episodes = await PodcastEpisode.find({}).sort({ episodeDate: 'desc' });
        res.json(episodes);
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const getEpisodeById = async (req, res) => {
    try {
        const episode = await PodcastEpisode.findById(req.params.id);
        if (episode) {
            res.json(episode);
        } else {
            res.status(404).json({ message: 'Episode not found' });
        }
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const createEpisode = async (req, res) => {
    try {
        const episode = await PodcastEpisode.create(req.body);
        res.status(201).json(episode);
    } catch (error) { res.status(400).json({ message: 'Failed to create episode', error: error.message }); }
};

const updateEpisode = async (req, res) => {
    try {
        const episode = await PodcastEpisode.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!episode) return res.status(404).json({ message: 'Episode not found' });
        res.json(episode);
    } catch (error) { res.status(400).json({ message: 'Failed to update episode', error: error.message }); }
};

const deleteEpisode = async (req, res) => {
    try {
        const episode = await PodcastEpisode.findById(req.params.id);
        if (episode) {
            await episode.deleteOne();
            res.json({ message: 'Episode removed' });
        } else {
            res.status(404).json({ message: 'Episode not found' });
        }
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

module.exports = {
    getUpcomingEpisode,
    getArchivedEpisodes,
    getAllEpisodesAdmin,
    getEpisodeById,
    createEpisode,
    updateEpisode,
    deleteEpisode
};