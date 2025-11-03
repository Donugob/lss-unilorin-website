import React from "react";
import { FiDownload, FiShield } from "react-icons/fi";
import "./DocumentSpotlight.css"; // We'll create this next

const DocumentSpotlight = ({ icon, title, description, fileUrl }) => {
  return (
    <div className="doc-spotlight-card">
      <div className="doc-icon">{icon}</div>
      <div className="doc-text">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        <FiDownload />
        &nbsp;Download
      </a>
    </div>
  );
};

export default DocumentSpotlight;
