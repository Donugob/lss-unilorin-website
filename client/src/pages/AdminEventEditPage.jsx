import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getEventById, createEvent, updateEvent, uploadFile } from '../services/api';
import './Admin.css';

const AdminEventEditPage = () => {
    const { id: eventId } = useParams();
    const navigate = useNavigate();

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [venue, setVenue] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    // Page state
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(!!eventId);

    useEffect(() => {
        if (eventId) {
            const fetchEvent = async () => {
                try {
                    const { data } = await getEventById(eventId);
                    
                    // --- ROBUST DATA SETTING ---
                    setTitle(data.title || '');
                    setDescription(data.description || '');
                    setVenue(data.venue || '');
                    setIsFeatured(data.isFeatured || false);
                    setImageUrl(data.imageUrl || '');

                    // Safely format the date for the input field
                    if (data.eventDate) {
                        // Create a date object, then slice the ISO string to the required format YYYY-MM-DDTHH:MM
                        const formattedDate = new Date(data.eventDate).toISOString().slice(0, 16);
                        setEventDate(formattedDate);
                    }

                } catch (error) {
                    toast.error('Could not fetch event data.');
                } finally {
                    setPageLoading(false);
                }
            };
            fetchEvent();
        }
    }, [eventId]);

    const uploadFileHandler = async (e) => {
        // ... (this function remains the same as before)
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const { data } = await uploadFile(formData);
            setImageUrl(data.imageUrl);
            toast.success('Image uploaded successfully!');
        } catch (error) {
            toast.error('Image upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // --- SIMPLE FRONTEND VALIDATION ---
        if (!title || !description || !eventDate || !venue) {
            toast.error('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            const eventData = { title, description, eventDate, venue, isFeatured, imageUrl };
            if (eventId) {
                await updateEvent(eventId, eventData);
                toast.success('Event updated successfully');
            } else {
                await createEvent(eventData);
                toast.success('Event created successfully');
            }
            navigate('/admin/events');
        } catch (error) {
            // Now this will catch our more specific backend error messages
            const message = error.response?.data?.message || 'Failed to save event.';
            toast.error(message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) return <div className="container admin-container"><h1>Loading Event Data...</h1></div>;

    return (
        <div className="container admin-container">
            <h1>{eventId ? 'Edit Event' : 'Create New Event'}</h1>
            <form onSubmit={submitHandler}>
                {/* ... (The JSX for the form remains exactly the same as before) ... */}
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{width: '100%', padding: '10px', fontFamily: 'var(--font-body)', fontSize: '1rem'}} rows="5" />
                </div>
                <div className="form-group">
                    <label>Date and Time</label>
                    <input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Venue</label>
                    <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Event Image</label>
                    <input type="text" placeholder="Upload an image to get a URL" value={imageUrl} readOnly style={{ marginBottom: '10px' }}/>
                    <input type="file" id="image-file" label="Choose File" onChange={uploadFileHandler} />
                    {uploading && <p>Uploading...</p>}
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} style={{width: 'auto'}} />
                    <label htmlFor="isFeatured" style={{ marginBottom: 0, fontWeight: 'normal' }}>Feature this event on the homepage?</label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading || uploading}>
                    {loading ? 'Saving...' : (eventId ? 'Update Event' : 'Create Event')}
                </button>
            </form>
        </div>
    );
};

export default AdminEventEditPage;