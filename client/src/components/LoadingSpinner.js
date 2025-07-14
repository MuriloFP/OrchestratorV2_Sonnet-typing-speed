import React from 'react';
import { motion } from 'framer-motion';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <motion.div
        className="loading-spinner"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </motion.div>
      
      <motion.div
        className="loading-text"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Loading...
      </motion.div>
      
      <motion.div
        className="loading-dots"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="loading-dot"
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;