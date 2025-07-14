import React from 'react';
import { motion } from 'framer-motion';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  const getProgressColor = (progress) => {
    if (progress < 25) return '#ff6b6b';
    if (progress < 50) return '#ffa726';
    if (progress < 75) return '#42a5f5';
    return '#66bb6a';
  };

  const getProgressMessage = (progress) => {
    if (progress < 10) return 'Just getting started...';
    if (progress < 25) return 'Keep going!';
    if (progress < 50) return 'You\'re doing great!';
    if (progress < 75) return 'More than halfway there!';
    if (progress < 90) return 'Almost finished!';
    if (progress < 100) return 'So close!';
    return 'Complete!';
  };

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="progress-label">Progress</span>
        <span className="progress-percentage">{Math.round(progress)}%</span>
      </div>
      
      <div className="progress-bar-wrapper">
        <div className="progress-bar-background">
          <motion.div
            className="progress-bar-fill"
            style={{ backgroundColor: getProgressColor(progress) }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* Animated shine effect */}
          <motion.div
            className="progress-shine"
            animate={{
              x: progress > 0 ? ['0%', '100%'] : '0%',
            }}
            transition={{
              duration: 2,
              repeat: progress > 0 && progress < 100 ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
      
      <motion.div
        className="progress-message"
        key={getProgressMessage(progress)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {getProgressMessage(progress)}
      </motion.div>
      
      {/* Progress milestones */}
      <div className="progress-milestones">
        {[25, 50, 75, 100].map((milestone) => (
          <motion.div
            key={milestone}
            className={`milestone ${progress >= milestone ? 'reached' : ''}`}
            style={{ left: `${milestone}%` }}
            animate={{
              scale: progress >= milestone ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="milestone-marker" />
            <div className="milestone-label">{milestone}%</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;