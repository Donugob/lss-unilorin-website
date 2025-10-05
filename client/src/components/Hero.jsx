import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // 1. Import motion
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="container">
        <div className="hero-content">
          {/* 2. Wrap the title in a motion.h1 */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            A Legacy of Excellence, A Future in Justice.
          </motion.h1>

          {/* 3. Wrap the subtitle in a motion.p */}
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} // Staggered delay
          >
            The official digital home for the University of Ilorin's Law Students Society, championing the leaders of tomorrow.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
             <Link to="/about" className="btn btn-primary">Discover Our Mission</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;