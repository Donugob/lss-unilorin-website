import React, { useState } from 'react';
import { FiSearch, FiMic } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ArchivedEpisodes = ({ episodes, hasUpcoming }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredEpisodes = episodes.filter(e => 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.guestName && e.guestName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <section className={`archive-section ${hasUpcoming ? '' : 'no-upcoming'}`}>
            <div className="container">
                <h2 className="section-title text-center">Episode Library</h2>
                <div className="search-bar">
                    <FiSearch className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search by title or guest..." 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
                
                <motion.div layout className="episode-grid">
                    <AnimatePresence>
                        {filteredEpisodes.length > 0 ? filteredEpisodes.map(ep => (
                            <motion.div 
                                key={ep._id} 
                                className="episode-card"
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="episode-card-header">
                                    <span className="episode-date">{new Date(ep.episodeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    {ep.guestName && <span className="episode-guest">w/ {ep.guestName}</span>}
                                </div>
                                <h3 className="episode-title">{ep.title}</h3>
                                <p className="episode-description">{ep.description}</p>
                                <a href={ep.xSpaceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                    <FiMic /> Listen to Recording
                                </a>
                            </motion.div>
                        )) : (
                            <p>No episodes found matching your search.</p>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ArchivedEpisodes;