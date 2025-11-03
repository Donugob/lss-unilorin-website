import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedEvent.css';

// --- 1. Import our API function ---
import { getFeaturedEvent } from '../services/api';

const FeaturedEvent = () => {
  // --- 2. Set up state to hold our event data ---
  // The state will initially be null until the data is fetched.
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- 3. Fetch data using useEffect ---
  // useEffect runs once after the component first renders.
  useEffect(() => {
    // Define an async function inside useEffect to fetch the data
    const fetchEvent = async () => {
      try {
        const response = await getFeaturedEvent();
        setEvent(response.data); // Store the fetched event data in state
      } catch (err) {
        // If the API returns an error (like a 404), we can catch it
        setError('No featured event is scheduled at this time. Please check back soon.');
        console.error(err);
      } finally {
        // This runs whether the fetch was successful or not
        setLoading(false);
      }
    };

    fetchEvent(); // Call the function
  }, []); // The empty array [] means this effect runs only once.

  // --- 4. Render different UI based on the state ---
  if (loading) {
    // You could replace this with a fancy spinner component
    return <section className="section-featured-event"><div className="container">Loading...</div></section>;
  }

  return (
    <section className="section-featured-event">
      <div className="container">
        {error ? (
          <div className="text-center"><p>{error}</p></div>
        ) : event && ( // Only render if we have an event and no error
          <div className="featured-event-content">
            <div className="event-image-container">
      <img src={event.imageUrl} alt={event.title} className="event-image" />
            </div>
            <div className="event-details">
              <span className="eyebrow-text">NEXT UP</span>
              <h2 className="section-title">{event.title}</h2>
              {/* <p>{event.description}</p> */}
              <p>
                <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br />
                <strong>Venue:</strong> {event.venue}
              </p> <br /> <br />
              <Link to="/events" className="btn btn-secondary">View All Events</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvent;