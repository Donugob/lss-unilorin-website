const mongoose = require('mongoose');

const podcastEpisodeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    episodeDate: { type: Date, required: true },
    xSpaceUrl: { type: String, required: true }, // The single link for live & recording
    guestName: { type: String },
    // A status to easily query for upcoming vs. archived
    status: { type: String, enum: ['Upcoming', 'Archived'], default: 'Upcoming' } 
}, { timestamps: true });

const PodcastEpisode = mongoose.model('PodcastEpisode', podcastEpisodeSchema);
module.exports = PodcastEpisode;