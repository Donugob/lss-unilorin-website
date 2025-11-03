import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllSubmissionsAdmin, deleteSubmission } from "../services/api";
import "./Admin.css";

const AdminSubmissionsListPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const { data } = await getAllSubmissionsAdmin();
      setSubmissions(data);
    } catch (error) {
      toast.error("Failed to fetch submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const rejectHandler = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to reject and delete this submission?"
      )
    ) {
      try {
        await deleteSubmission(id);
        toast.warn("Submission has been rejected.");
        fetchSubmissions();
      } catch (error) {
        toast.error("Failed to reject submission.");
      }
    }
  };

  if (loading)
    return (
      <div className="container admin-container">
        <h1>Loading Submissions...</h1>
      </div>
    );

  return (
    <div className="container admin-container">
      <div className="admin-header">
        <h1>Review Article Submissions</h1>
      </div>
      {submissions.length === 0 ? (
        <p>No pending submissions.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>TITLE</th>
              <th>SUBMITTED BY</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub._id}>
                <td data-label="Title">{sub.title}</td>
                <td data-label="Author">{sub.authorName}</td>
                <td data-label="Date">
                  {new Date(sub.createdAt).toLocaleDateString()}
                </td>
                <td
                  data-label="Status"
                  style={{ textTransform: "capitalize", fontWeight: "bold" }}
                >
                  {sub.status}
                </td>
                <td data-label="Actions">
                  {sub.status === "pending" && (
                    <>
                      <Link
                        to={`/admin/submission/${sub._id}/review`}
                        className="btn btn-primary"
                        style={{ marginRight: "10px" }}
                      >
                        Review
                      </Link>
                      <button
                        onClick={() => rejectHandler(sub._id)}
                        className="btn btn-secondary"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {sub.status !== "pending" && <span>Reviewed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default AdminSubmissionsListPage;
