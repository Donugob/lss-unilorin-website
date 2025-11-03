import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// 1. Import the real API functions
import { getAllEvents, deleteEvent } from '../services/api';
import './Admin.css'; // Let's create a shared admin CSS file

const AdminEventsListPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 2. Create a function to fetch events that can be re-used
    const fetchEvents = async () => {
        try {
            const { data } = await getAllEvents();
            setEvents(data);
        } catch (error) {
            toast.error('Failed to fetch events.');
        } finally {
            setLoading(false);
        }
    };

    // 3. Call the fetch function on initial component load
    useEffect(() => {
        fetchEvents();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id);
                toast.success('Event deleted successfully');
                fetchEvents(); // 4. Refetch the events list after deletion
            } catch (error) {
                toast.error('Failed to delete event.');
            }
        }
    };

    const createEventHandler = () => {
        navigate('/admin/event/new');
    };

    if (loading) return <div className="container" style={{padding: '4rem 0'}}><h1>Loading Events...</h1></div>;

    return (
        <div className="container admin-container">
            <div className="admin-header">
                <h1>Manage Events</h1>
                <button onClick={createEventHandler} className="btn btn-primary">Create Event</button>
            </div>
            {events.length === 0 ? (
                <p>No events found. Click "Create Event" to add one.</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>TITLE</th>
                            <th>DATE</th>
                            <th>FEATURED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event._id}>
                                <td>{event.title}</td>
                                <td>{new Date(event.eventDate).toLocaleString()}</td>
                                <td>{event.isFeatured ? 'Yes' : 'No'}</td>
                                <td>
                                    <Link to={`/admin/event/${event._id}/edit`} className="btn btn-outline" style={{ marginRight: '10px' }}>Edit</Link>
                                    <button onClick={() => deleteHandler(event._id)} className="btn btn-secondary">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminEventsListPage;