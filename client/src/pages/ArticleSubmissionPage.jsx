import React, { useState } from "react";
import { toast } from "react-toastify";
import { createSubmission, uploadSubmissionImage } from "../services/api";
import { Editor } from "@tinymce/tinymce-react";
import "./AuthPage.css";
import SEO from '../components/SEO';

const ArticleSubmissionPage = () => {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [title, setTitle] = useState("");
  const [contentBody, setContentBody] = useState("");
  const [suggestedImageUrl, setSuggestedImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await uploadSubmissionImage(formData);
      setSuggestedImageUrl(data.imageUrl);
      toast.success("Cover image uploaded!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSubmission({
        authorName,
        authorEmail,
        title,
        contentBody,
        suggestedImageUrl,
      });
      toast.success("Thank you! Your article has been submitted for review.");

      // --- THE FIX: Reset all form fields on success ---
      setAuthorName("");
      setAuthorEmail("");
      setTitle("");
      setContentBody("");
      setSuggestedImageUrl("");
      // Also reset the file input visually, though its state is read-only
      e.target.reset();
    } catch (error) {
      toast.error("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page-container" style={{ padding: "4rem 0" }}>
      <SEO
        title="Submit an Article"
        description="Submit your articles to be featured on the Law Students' Society platform."
      />
      <div className="auth-card" style={{ maxWidth: "900px" }}>
        <h1 className="auth-title">Submit an Article</h1>
        <form onSubmit={submitHandler}>
          {/* ... (The form JSX is correct, no changes needed here) ... */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Your Email</label>
              <input
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Article Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Cover Image (Optional)</label>
            <p className="form-hint" style={{ marginTop: "-0.75rem" }}>
              Suggest a cover image for your article.
            </p>
            {suggestedImageUrl && (
              <img
                src={suggestedImageUrl}
                alt="Preview"
                style={{
                  width: "200px",
                  height: "auto",
                  marginBottom: "1rem",
                  borderRadius: "5px",
                }}
              />
            )}
            <input
              type="file"
              onChange={uploadFileHandler}
              accept="image/png, image/jpeg, image/gif"
            />
            {uploading && <p>Uploading...</p>}
          </div>
          <div className="form-group">
            <label>Article Content</label>
            <Editor
              apiKey="0ky5j4ozaqtsmxwjven8srmepr2rg959impsx0er0psx5d1b"
              value={contentBody}
              init={{ height: 400 }}
              onEditorChange={(c) => setContentBody(c)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading || uploading}
          >
            {loading ? "Submitting..." : "Submit for Review"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ArticleSubmissionPage;
