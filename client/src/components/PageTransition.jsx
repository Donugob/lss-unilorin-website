import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }} // Start invisible and slightly down
      animate={{ opacity: 1, y: 0 }}   // Animate to fully visible and at its original position
      exit={{ opacity: 0, y: -15 }}  // Animate out by fading and moving slightly up
      transition={{ duration: 0.5, ease: 'easeInOut' }} // Control the speed and feel of the animation
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;