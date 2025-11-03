const Event = require("../models/eventModel");
const Post = require("../models/postModel");
const Executive = require("../models/executiveModel");
const Material = require("../models/materialModel");
const PodcastEpisode = require("../models/podcastEpisodeModel");
const Submission = require("../models/submissionModel");

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    // 2. Add Material.countDocuments() to the concurrent Promise.all call
    const [
      eventCount,
      postCount,
      executiveCount,
      materialCount,
      podcastCount,
      pendingSubmissions,
    ] = await Promise.all([
      Event.countDocuments(),
      Post.countDocuments({ status: "published" }),
      Executive.countDocuments(),
      Material.countDocuments(),
      PodcastEpisode.countDocuments(),
      Submission.countDocuments({ status: "pending" }),
    ]);

    // 3. Add the new materials count to the JSON response
    res.json({
      events: eventCount,
      posts: postCount,
      executives: executiveCount,
      materials: materialCount,
      podcasts: podcastCount,
      pendingSubmissions: pendingSubmissions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getStats };
