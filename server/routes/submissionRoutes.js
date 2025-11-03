const express = require("express");
const router = express.Router();
const {
  createSubmission,
  getAllSubmissionsAdmin,
  getSubmissionById,
  approveSubmission,
  deleteSubmission,
} = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");

// Public route for creating a submission
router.post("/", createSubmission);

// Admin routes
router.get("/all", protect, getAllSubmissionsAdmin);
router.post("/:id/approve", protect, approveSubmission);
router
  .route("/:id")
  .get(protect, getSubmissionById)
  .delete(protect, deleteSubmission);

module.exports = router;
