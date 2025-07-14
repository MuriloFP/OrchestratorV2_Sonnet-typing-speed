import React from 'react';
import { motion } from 'framer-motion';
import './Timer.css';

const Timer = ({ timeElapsed, isActive }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <div className="timer-label">Time</div>
      <motion.div
        className={`timer-display ${isActive ? 'active' : ''}`}
        animate={{
          scale: isActive ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {formatTime(timeElapsed)}
      </motion.div>
      <div className="timer-status">
        <motion.div
          className={`status-indicator ${isActive ? 'running' : 'stopped'}`}
          animate={{
            opacity: isActive ? [0.5, 1, 0.5] : 0.5,
          }}
          transition={{
            duration: 1.5,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
        <span className="status-text">
          {isActive ? 'Running' : 'Stopped'}
        </span>
      </div>
    </div>
  );
};

export default Timer;