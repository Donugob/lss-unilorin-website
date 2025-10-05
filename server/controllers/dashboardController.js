const Event = require('../models/eventModel');
const Post = require('../models/postModel');
const Executive = require('../models/executiveModel');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getStats = async (req, res) => {
    try {
        // Use Promise.all to fetch all counts concurrently for better performance
        const [eventCount, postCount, executiveCount] = await Promise.all([
            Event.countDocuments(),
            Post.countDocuments({ status: 'published' }), // Or just Post.countDocuments() for all
            Executive.countDocuments()
        ]);

        res.json({
            events: eventCount,
            posts: postCount,
            executives: executiveCount,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getStats };