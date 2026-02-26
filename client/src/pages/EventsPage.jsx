import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../services/api'; // We need this in api.js
import { toast } from 'react-toastify';
// Reuse NewsPage.css for similar card styles
import './NewsPage.css';
import SEO from '../components/SEO';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await getAllEvents(); // Assumes getAllEvents exists
                setEvents(data);
            } catch (error) {
                toast.error('Could not fetch events.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) return <div className="container page-container"><h1>Loading Events...</h1></div>;

    return (
        <div className="container page-container">
            <SEO
                title="Events"
                description="Discover upcoming and past events hosted by the Law Students' Society, University of Ilorin."
            />
            <h1 className="page-title">Upcoming & Past Events</h1>
            <div className="post-grid">
                {events.map(event => (
                    <div key={event._id} className="post-card">
                        <Link to={`/events/${event._id}`}>
                            <img src={event.imageUrl} alt={event.title} className="post-card-image" />
                        </Link>
                        <div className="post-card-content">
                            <h2 className="post-card-title">
                                <Link to={`/events/${event._id}`}>{event.title}</Link>
                            </h2>
                            <p className="post-card-meta">
                                {new Date(event.eventDate).toLocaleDateString()} at {event.venue}
                            </p>
                            <Link to={`/events/${event._id}`} className="btn btn-outline">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsPage;