import React, { useState, useEffect } from 'react';
import { FiMic } from 'react-icons/fi';
import { motion } from 'framer-motion';

const CountdownItem = ({ value, label }) => (
    <div className="countdown-item">
        <span className="countdown-value">{value}</span>
        <span className="countdown-label">{label}</span>
    </div>
);

const UpcomingEpisode = ({ episode }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(episode.episodeDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const hasTimeLeft = Object.values(timeLeft).some(val => val > 0);

    return (
        <section className="upcoming-episode-hero">
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <span className="eyebrow-text">Next Episode: Law & Vibes</span>
                    <h1 className="upcoming-title">{episode.title}</h1>
                    <p className="upcoming-guest">
                        {episode.guestName ? `Featuring: ${episode.guestName}` : "Join the conversation on X Spaces"}
                    </p>
                    
                    {hasTimeLeft ? (
                        <div className="countdown-timer">
                            <CountdownItem value={String(timeLeft.days).padStart(2, '0')} label="Days" />
                            <CountdownItem value={String(timeLeft.hours).padStart(2, '0')} label="Hours" />
                            <CountdownItem value={String(timeLeft.minutes).padStart(2, '0')} label="Mins" />
                            <CountdownItem value={String(timeLeft.seconds).padStart(2, '0')} label="Secs" />
                        </div>
                    ) : (
                        <p className="live-now-text">Live Now!</p>
                    )}

                    <a href={episode.xSpaceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-join">
                        <FiMic /> {hasTimeLeft ? 'Set a Reminder' : 'Join Live Space'}
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default UpcomingEpisode;