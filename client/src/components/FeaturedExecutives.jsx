import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Import the Link component
import { getFeaturedExecutive } from '../services/api';
import './FeaturedExecutives.css';

const FeaturedExecutives = () => {
    const [featured, setFeatured] = useState([]);

useEffect(() => {
    const fetchFeatured = async () => {
        try {
            const { data } = await getFeaturedExecutive();
            setFeatured(data);
        } catch (error) {
            console.error("Failed to fetch featured executives:", error);
        }
    };
    fetchFeatured();
}, []);


    if (featured.length === 0) {
        return null;
    }

    return (
        <section className="featured-execs-section">
            <div className="container">
                <h2 className="section-title text-center">Our Leadership</h2>
                <div className="featured-execs-grid">
                    {featured.map(exec => (
                        <div key={exec._id} className="featured-exec-card">
                            <div className="featured-exec-image-wrapper">
                                <img src={exec.imageUrl} alt={exec.name} />
                            </div>
                            <div className="featured-exec-text">
                                <h3 className="featured-exec-name">{exec.name}</h3>
                                <p className="featured-exec-position">{exec.position}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- 2. Add the "See All" button --- */}
                <div className="see-all-container">
                    <Link to="/about" className="btn btn-secondary">
                        Meet All Executives
                    </Link>
                </div>
            </div>
        </section>
    );
};
export default FeaturedExecutives;