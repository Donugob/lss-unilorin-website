import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getEpisodeById, createEpisode, updateEpisode } from '../services/api';
import './Admin.css';

const AdminPodcastEditPage = () => {
    const { id: episodeId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [episodeDate, setEpisodeDate] = useState('');
    const [xSpaceUrl, setXSpaceUrl] = useState('');
    const [guestName, setGuestName] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (episodeId) {
            const fetchEpisode = async () => {
                try {
                    const { data } = await getEpisodeById(episodeId);
                    setTitle(data.title);
                    setDescription(data.description);
                    setEpisodeDate(new Date(data.episodeDate).toISOString().slice(0, 16));
                    setXSpaceUrl(data.xSpaceUrl);
                    setGuestName(data.guestName || '');
                } catch (error) { toast.error('Could not fetch episode data.'); }
            };
            fetchEpisode();
        }
    }, [episodeId]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const episodeData = { title, description, episodeDate, xSpaceUrl, guestName };
            // Auto-set status based on date
            episodeData.status = new Date(episodeDate) > new Date() ? 'Upcoming' : 'Archived';

            if (episodeId) {
                await updateEpisode(episodeId, episodeData);
                toast.success('Episode updated');
            } else {
                await createEpisode(episodeData);
                toast.success('Episode scheduled');
            }
            navigate('/admin/podcast');
        } catch (error) {
            toast.error('Failed to save episode.');
        } finally { setLoading(false); }
    };

    return (
        <div className="container admin-container">
            <h1>{episodeId ? 'Edit Episode' : 'Schedule New Episode'}</h1>
            <form onSubmit={submitHandler} className="admin-form">
                <div className="form-group"><label>Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
                <div className="form-group"><label>Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required /></div>
                <div className="form-group"><label>Guest Name (Optional)</label><input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} /></div>
                <div className="form-group"><label>Date & Time</label><input type="datetime-local" value={episodeDate} onChange={(e) => setEpisodeDate(e.target.value)} required /></div>
                <div className="form-group"><label>X Space Link</label><input type="url" value={xSpaceUrl} onChange={(e) => setXSpaceUrl(e.target.value)} placeholder="https://x.com/i/spaces/..." required /></div>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save Episode'}</button>
            </form>
        </div>
    );
};
export default AdminPodcastEditPage;