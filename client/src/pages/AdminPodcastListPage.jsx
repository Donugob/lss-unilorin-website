import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllEpisodesAdmin, deleteEpisode } from '../services/api';
import './Admin.css';

const AdminPodcastListPage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEpisodes = async () => {
        try {
            const { data } = await getAllEpisodesAdmin();
            setEpisodes(data);
        } catch (error) {
            toast.error('Failed to fetch episodes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchEpisodes() }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this episode?')) {
            try {
                await deleteEpisode(id);
                toast.success('Episode deleted');
                fetchEpisodes();
            } catch (error) {
                toast.error('Failed to delete episode.');
            }
        }
    };

    if (loading) return <div className="container admin-container"><h1>Loading Episodes...</h1></div>;

    return (
        <div className="container admin-container">
            <div className="admin-header">
                <h1>Manage Podcast Episodes</h1>
                <Link to="/admin/podcast/new" className="btn btn-primary">Schedule New Episode</Link>
            </div>
            <table className="admin-table">
                <thead><tr><th>TITLE</th><th>GUEST</th><th>DATE</th><th>STATUS</th><th>ACTIONS</th></tr></thead>
                <tbody>
                    {episodes.map(ep => (
                        <tr key={ep._id}>
                            <td data-label="Title">{ep.title}</td>
                            <td data-label="Guest">{ep.guestName || 'N/A'}</td>
                            <td data-label="Date">{new Date(ep.episodeDate).toLocaleString()}</td>
                            <td data-label="Status">{new Date(ep.episodeDate) > new Date() ? 'Upcoming' : 'Archived'}</td>
                            <td data-label="Actions">
                                <Link to={`/admin/podcast/${ep._id}/edit`} className="btn btn-outline" style={{marginRight: '10px'}}>Edit</Link>
                                <button onClick={() => deleteHandler(ep._id)} className="btn btn-secondary">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminPodcastListPage;