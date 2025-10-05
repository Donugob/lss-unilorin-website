import React from 'react';
import { motion } from 'framer-motion'; // 1. Import motion
import './Pillars.css';

// 2. Define animation variants for the container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // This will make each child animate one after the other
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const Pillars = () => {
  return (
    <section className="section-pillars">
      <div className="container">
        {/* 3. Use the container variants on the grid */}
        <motion.div
          className="pillars-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animation triggers when this element enters the viewport
          viewport={{ once: true, amount: 0.2 }} // Animate once, when 20% of it is visible
        >
          {/* 4. Apply item variants and hover effect to each card */}
          <motion.div className="pillar-card" variants={itemVariants} whileHover={{ y: -8, boxShadow: "0px 10px 30px rgba(0,0,0,0.08)" }}>
            <h3 className="pillar-title">Academic Excellence</h3>
            <p>Providing essential resources, tutorials, and mentorship to ensure academic success for all our members.</p>
          </motion.div>

          <motion.div className="pillar-card" variants={itemVariants} whileHover={{ y: -8, boxShadow: "0px 10px 30px rgba(0,0,0,0.08)" }}>
            <h3 className="pillar-title">Professional Development</h3>
            <p>Connecting students with opportunities through moot courts, workshops, and networking with legal professionals.</p>
          </motion.div>

          <motion.div className="pillar-card" variants={itemVariants} whileHover={{ y: -8, boxShadow: "0px 10px 30px rgba(0,0,0,0.08)" }}>
            <h3 className="pillar-title">Community & Advocacy</h3>
            <p>Building a vibrant, supportive community and advocating for student interests within the faculty and beyond.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pillars;