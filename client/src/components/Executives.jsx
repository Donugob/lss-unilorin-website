import React, { useState, useEffect } from 'react';
import { getExecutives } from '../services/api';
import './Executives.css';

const Executives = () => {
    const [executives, setExecutives] = useState([]);

    useEffect(() => {
        const fetchExecutives = async () => {
            try {
                const { data } = await getExecutives();
                setExecutives(data);
            } catch (error) {
                console.error("Failed to fetch executives");
            }
        };
        fetchExecutives();
    }, []);

    return (
        <section className="section-executives">
            <div className="container">
                <h2 className="section-title text-center">Custodians of Our Legacy</h2>
                <div className="executives-grid">
                    {executives.map(exe => (
                        <div key={exe._id} className="executive-card">
                            <img src={exe.imageUrl} alt={exe.name} className="executive-image" />
                            <h3 className="executive-name">{exe.name}</h3>
                            <p className="executive-position">{exe.position}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Executives;