import React from 'react';
import { Link } from 'react-router-dom';
import './CtaSection.css'; // This will be a complete replacement

const CtaSection = () => {
  return (
    <section className="cta-section-reimagined">
      <div className="container cta-container">
        <div className="cta-content">
          <div className="cta-text">
            <h2>Your Journey Starts Here.</h2>
            <p>
              Engage with our community, stay informed about pivotal events, and explore insightful articles from our brightest minds. Be part of the legacy.
            </p>
          </div>
          <div className="cta-actions">
            <Link to="/events" className="btn btn-primary">Explore Events</Link>
            <Link to="/news" className="btn btn-outline-light">Read Articles</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;