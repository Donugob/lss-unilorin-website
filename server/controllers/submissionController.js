const Submission = require("../models/submissionModel");
const Post = require("../models/postModel");

// @desc    Create a new submission from the public form
// @route   POST /api/submissions
// @access  Public
const createSubmission = async (req, res) => {
  try {
    const { authorName, authorEmail, title, contentBody, suggestedImageUrl } =
      req.body;
    if (!authorName || !authorEmail || !title || !contentBody) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const submission = await Submission.create({
      authorName,
      authorEmail,
      title,
      contentBody,
      suggestedImageUrl,
    });
    res.status(201).json(submission);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create submission", error: error.message });
  }
};

// --- ADMIN CONTROLLERS ---

// @desc    Get all submissions for the admin
// @route   GET /api/submissions/all
// @access  Private/Admin
const getAllSubmissionsAdmin = async (req, res) => {
  try {
    const submissions = await Submission.find({}).sort({ createdAt: "desc" });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get a single submission by ID for review
// @route   GET /api/submissions/:id
// @access  Private/Admin
const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (submission) {
      res.json(submission);
    } else {
      res.status(404).json({ message: "Submission not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Approve a submission and promote it to a Post
// @route   POST /api/submissions/:id/approve
// @access  Private/Admin
const approveSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });
    if (submission.status !== "pending")
      return res
        .status(400)
        .json({ message: "Submission has already been reviewed." });

    const { title, slug, contentBody, coverImageUrl, status } = req.body;

    const postExists = await Post.findOne({ slug });
    if (postExists) {
      return res.status(400).json({
        message:
          "A post with this slug already exists. Please create a unique slug.",
      });
    }

    // Prepend the original author's name to the content for attribution
    const finalContent = `<blockquote><em>An article by ${submission.authorName}.</em></blockquote><hr>${contentBody}`;

    const newPost = await Post.create({
      title,
      slug,
      contentBody: finalContent,
      coverImageUrl,
      status,
      author: req.user._id, // The logged-in admin is the official publisher
      publishedAt: status === "published" ? new Date() : null,
    });

    submission.status = "approved";
    await submission.save();

    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to approve submission", error: error.message });
  }
};

// @desc    Delete (or reject) a submission
// @route   DELETE /api/submissions/:id
// @access  Private/Admin
const deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (submission) {
      await submission.deleteOne();
      res.json({ message: "Submission removed" });
    } else {
      res.status(404).json({ message: "Submission not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createSubmission,
  getAllSubmissionsAdmin,
  getSubmissionById,
  approveSubmission,
  deleteSubmission,
};
