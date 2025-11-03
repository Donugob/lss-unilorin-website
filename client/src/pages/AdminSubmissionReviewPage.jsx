import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getSubmissionById,
  approveSubmission,
  uploadFile,
} from "../services/api";
import { Editor } from "@tinymce/tinymce-react";
import "./Admin.css";

const AdminSubmissionReviewPage = () => {
  const { id: submissionId } = useParams();
  const navigate = useNavigate();

  // Form state for the new Post
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [contentBody, setContentBody] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [status, setStatus] = useState("published");
  const [originalAuthor, setOriginalAuthor] = useState("");
  const [suggestedImageUrl, setSuggestedImageUrl] = useState(""); // Still useful for the info box

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const { data } = await getSubmissionById(submissionId);
        setTitle(data.title);
        setContentBody(data.contentBody);
        setOriginalAuthor(data.authorName);
        setSuggestedImageUrl(data.suggestedImageUrl || "");

        // --- THE FIX: Auto-fill the final cover image URL ---
        setCoverImageUrl(data.suggestedImageUrl || "");

        setSlug(
          data.title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
        );
      } catch (error) {
        toast.error("Failed to load submission.");
      } finally {
        setPageLoading(false);
      }
    };
    fetchSubmission();
  }, [submissionId]);

  // --- We need to fill in these missing functions ---
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file); // Use 'file' for admin uploads
    setUploading(true);
    try {
      const { data } = await uploadFile(formData);
      setCoverImageUrl(data.imageUrl); // This updates the final cover image
      toast.success("Admin image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const newSlug = newTitle
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(newSlug);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const postData = { title, slug, contentBody, coverImageUrl, status };
      await approveSubmission(submissionId, postData);
      toast.success("Article has been approved and published!");
      navigate("/admin/posts");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to approve article."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading)
    return (
      <div className="container admin-container">
        <h1>Loading Submission...</h1>
      </div>
    );

  return (
    <div className="container admin-container">
      <h1>Review & Approve Article</h1>
      <div className="review-info-box">
        <p>
          <strong>Original Author:</strong> {originalAuthor}
        </p>
        {suggestedImageUrl && (
          <div>
            <strong>Suggested Image Preview:</strong>
            <img
              src={suggestedImageUrl}
              alt="User submission preview"
              style={{
                maxWidth: "300px",
                height: "auto",
                display: "block",
                marginTop: "1rem",
                borderRadius: "5px",
              }}
            />
          </div>
        )}
      </div>

      <form onSubmit={submitHandler} className="admin-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <Editor
            apiKey="0ky5j4ozaqtsmxwjven8srmepr2rg959impsx0er0psx5d1b"
            value={contentBody}
            init={{ height: 500 }}
            onEditorChange={(c) => setContentBody(c)}
          />
        </div>

        <div className="form-group">
          <label>Final Cover Image</label>
          <p className="form-hint">
            The suggested image is pre-filled. You can keep it or upload a
            different one.
          </p>
          <input
            type="text"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="Image URL will appear here"
          />
          <input
            type="file"
            onChange={uploadFileHandler}
            style={{ marginTop: "10px" }}
          />
          {uploading && <p>Uploading...</p>}
        </div>

        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="published">Publish Immediately</option>
            <option value="draft">Save as Draft</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || uploading}
        >
          {loading ? "Publishing..." : "Approve & Publish Post"}
        </button>
      </form>
    </div>
  );
};
export default AdminSubmissionReviewPage;
