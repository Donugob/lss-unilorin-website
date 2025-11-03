import React, { useState, useEffect } from 'react';
import { getPublicMaterials } from '../services/api';
import { toast } from 'react-toastify';
import { FiFileText, FiImage, FiDownload, FiXCircle, FiLoader } from 'react-icons/fi';
import './MaterialsPage.css'; // We will create this next

// A reusable card component for displaying a single material
const MaterialCard = ({ material }) => {
    // Function to determine the correct icon based on file type
    const getIcon = () => {
        const fileType = material.fileType?.toUpperCase();
        if (fileType === 'PDF') return <FiFileText />;
        if (fileType === 'IMAGE') return <FiImage />;
        return <FiFileText />; // Default icon
    };

    return (
        <div className="material-card">
            <div className="card-icon-wrapper">{getIcon()}</div>
            <div className="card-content">
                <span className="card-meta">{material.level} • {material.materialType}</span>
                <h3 className="card-title">{material.title}</h3>
                {material.description && <p className="card-description">{material.description}</p>}
            </div>
            <a href={material.fileUrl} target="_blank" rel="noopener noreferrer" className="download-link">
                <FiDownload /> {material.fileType === 'Image' ? 'View Image' : 'Download File'}
            </a>
        </div>
    );
};


// The main page component
const MaterialsPage = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State to manage the user's filter selections
    const [levelFilter, setLevelFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    // This useEffect hook is the core of our filtering logic.
    // It automatically re-runs whenever the 'levelFilter' or 'typeFilter' state changes.
    useEffect(() => {
        const fetchMaterials = async () => {
            setLoading(true);
            try {
                // Pass the current filter state to our API service
                const params = {
                    level: levelFilter,
                    materialType: typeFilter,
                };
                const { data } = await getPublicMaterials(params);
                setMaterials(data);
            } catch (error) {
                toast.error("Could not fetch materials. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMaterials();
    }, [levelFilter, typeFilter]);

    const clearFilters = () => {
        setLevelFilter('all');
        setTypeFilter('all');
    };

    return (
        <div className="materials-page-wrapper">
            <div className="container">
                <header className="materials-header">
                    <h1 className="page-title">Resource Hub</h1>
                    <p>Find lecture notes, past questions, and other essential academic materials organized by level and type.</p>
                </header>

                {/* --- Filter Bar --- */}
                <div className="filter-bar">
                    <div className="filter-group">
                        <label htmlFor="level-filter">Filter by Level</label>
                        <select id="level-filter" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
                            <option value="all">All Levels</option>
                            <option value="100L">100L</option>
                            <option value="200L">200L</option>
                            <option value="300L">300L</option>
                            <option value="400L">400L</option>
                            <option value="500L">500L</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="type-filter">Filter by Type</label>
                        <select id="type-filter" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                            <option value="all">All Types</option>
                            <option value="Lecture Note">Lecture Notes</option>
                            <option value="Past Question">Past Questions</option>
                            <option value="Handout">Handouts</option>
                        </select>
                    </div>
                     <button onClick={clearFilters} className="clear-filters-btn"><FiXCircle /> Clear</button>
                </div>

                {/* --- Results Grid --- */}
                {loading ? (
                    <div className="loading-container">
                        <FiLoader className="spinner" />
                        <p>Loading Resources...</p>
                    </div>
                ) : (
                    materials.length > 0 ? (
                        <div className="materials-grid">
                            {materials.map(material => (
                                <MaterialCard key={material._id} material={material} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results-container">
                            <p>No materials found matching your criteria. Try clearing the filters.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default MaterialsPage;