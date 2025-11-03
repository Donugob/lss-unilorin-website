import React, { useState, useEffect } from 'react';
import { getUpcomingEpisode, getArchivedEpisodes } from '../services/api';
import { toast } from 'react-toastify';
import UpcomingEpisode from '../components/UpcomingEpisode';
import ArchivedEpisodes from '../components/ArchivedEpisodes';
import './PodcastPage.css';

const PodcastPage = () => {
    const [upcoming, setUpcoming] = useState(null);
    const [archived, setArchived] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEpisodes = async () => {
            window.scrollTo(0, 0);
            try {
                const [upcomingRes, archivedRes] = await Promise.all([
                    getUpcomingEpisode(),
                    getArchivedEpisodes()
                ]);
                setUpcoming(upcomingRes.data);
                setArchived(archivedRes.data);
            } catch (error) {
                toast.error("Failed to load podcast episodes.");
            } finally {
                setLoading(false);
            }
        };
        fetchEpisodes();
    }, []);

    if (loading) return <div className="container page-container" style={{textAlign: 'center'}}><h1>Loading Law & Vibes Hub...</h1></div>;

    return (
        <div className="podcast-page">
            {upcoming && <UpcomingEpisode episode={upcoming} />}
            <ArchivedEpisodes episodes={archived} hasUpcoming={!!upcoming} />
        </div>
    );
};

export default PodcastPage;