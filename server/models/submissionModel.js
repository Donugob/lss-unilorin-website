const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true },
    authorEmail: { type: String, required: true },
    title: { type: String, required: true },
    contentBody: { type: String, required: true },
    suggestedImageUrl: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
