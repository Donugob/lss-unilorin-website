import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// 1. Import the CORRECT API function
import { getEventById } from '../services/api';
import { toast } from 'react-toastify';
// We can still reuse the SinglePostPage.css styles as they are very similar
import './SinglePostPage.css';
import SEO from '../components/SEO';

const SingleEventPage = () => {
    // 2. Destructure 'id' from the URL, not 'slug'
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 3. Rename the function for clarity
        const fetchEvent = async () => {
            if (!id) return; // Guard clause in case id is missing
            window.scrollTo(0, 0);
            try {
                // 4. Call the CORRECT API function with the 'id'
                const { data } = await getEventById(id);
                setEvent(data);
            } catch (error) {
                toast.error('Could not find the requested event.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]); // 5. The dependency is now 'id'

    if (loading) return <div className="container page-container"><h1>Loading Event...</h1></div>;
    if (!event) return <div className="container page-container"><h1>Event Not Found.</h1><Link to="/events">Back to Events</Link></div>;

    // 6. Update the JSX to use the 'event' object's properties
    return (
        <article className="single-post-page">
            <SEO
                title={event.title}
                description={event.description}
                type="article"
                image={event.imageUrl}
            />
            <header className="post-header-full-bleed" style={{ backgroundImage: `url(${event.imageUrl})` }}>
                <div className="container">
                    <h1 className="post-title-hero">{event.title}</h1>
                    <div className="post-meta-hero">
                        <span>{new Date(event.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>•</span>
                        <span>{event.venue}</span>
                    </div>
                </div>
            </header>

            <div className="post-content-body">
                {/* For events, a simple paragraph for the description is often enough */}
                <p>{event.description}</p>
            </div>
        </article>
    );
};

export default SingleEventPage;