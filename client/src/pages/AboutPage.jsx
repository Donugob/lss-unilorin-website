import React, { useEffect } from 'react';
import Executives from '../components/Executives'; // This component will be our grand finale
import './AboutPage.css';
import facultyImage from '../assets/faculty-image.jpg'; // We'll add a placeholder image

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-page-wrapper">
            {/* --- ACT I: THE PHILOSOPHY (The Motto, Reimagined) --- */}
            <section className="about-hero-motto">
                <div className="container">
                    <h1 className="about-motto-latin">Salus Populi Suprema Lex.</h1>
                    <span className="decorative-line"></span>
                    <p className="about-motto-translation">The welfare of the people shall be the purpose of the law.</p>
                </div>
            </section>

            {/* --- ACT II: THE STORY (Mission & Legacy, Overlapping) --- */}
            <section className="about-story-section">
                <div className="container">
                    <div className="about-story-grid">
                        <div className="story-image-container">
                            <img src={facultyImage} alt="University of Ilorin Faculty of Law" />
                        </div>
                        <div className="story-text-content">
                            <h2 className="story-title">Our Mission & Legacy</h2>
                            <p>
                                <span className="drop-cap">E</span>stablished with a vision of fostering academic and professional excellence, the Law Students' Society (LSS) of the University of Ilorin stands as the foremost student body for all undergraduates in the Faculty of Law. Our core mission is to build a vibrant, supportive, and intellectually stimulating community for the legal leaders of tomorrow.
                            </p>
                            <blockquote>
                                We are more than an association; we are a legacy in motion, dedicated to upholding the principles of justice and equity.
                            </blockquote>
                            <p>
                                Throughout our history, we have been dedicated to championing student interests, providing invaluable academic resources, and creating unparalleled opportunities for professional development through rigorous moot court competitions, insightful workshops, and direct engagement with luminaries in the legal field.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* --- ACT III: THE PEOPLE (The Custodians of the Legacy) --- */}
            {/* The Executives component will be styled by its own updated CSS */}
            <Executives />
        </div>
    );
};

export default AboutPage;