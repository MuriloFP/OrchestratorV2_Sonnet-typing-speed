import React from 'react';
import { motion } from 'framer-motion';
import './StatsDisplay.css';

const StatsDisplay = ({ wpm, accuracy }) => {
  const getWpmColor = (wpm) => {
    if (wpm < 20) return '#ff6b6b';
    if (wpm < 40) return '#ffa726';
    if (wpm < 60) return '#42a5f5';
    return '#66bb6a';
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy < 70) return '#ff6b6b';
    if (accuracy < 85) return '#ffa726';
    if (accuracy < 95) return '#42a5f5';
    return '#66bb6a';
  };

  const getWpmRating = (wpm) => {
    if (wpm < 20) return 'Beginner';
    if (wpm < 40) return 'Average';
    if (wpm < 60) return 'Good';
    if (wpm < 80) return 'Very Good';
    return 'Excellent';
  };

  return (
    <div className="stats-display">
      <motion.div
        className="stat-item wpm-stat"
        animate={{
          scale: wpm > 0 ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        <div className="stat-label">WPM</div>
        <motion.div
          className="stat-value"
          style={{ color: getWpmColor(wpm) }}
          key={wpm}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {wpm}
        </motion.div>
        <div className="stat-rating">{getWpmRating(wpm)}</div>
        
        {/* WPM Progress Ring */}
        <div className="progress-ring">
          <svg width="60" height="60" className="progress-ring-svg">
            <circle
              cx="30"
              cy="30"
              r="25"
              fill="transparent"
              stroke="#e0e0e0"
              strokeWidth="4"
            />
            <motion.circle
              cx="30"
              cy="30"
              r="25"
              fill="transparent"
              stroke={getWpmColor(wpm)}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 25}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 25 }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * 25 - (Math.min(wpm, 100) / 100) * 2 * Math.PI * 25 
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }}
            />
          </svg>
        </div>
      </motion.div>

      <motion.div
        className="stat-item accuracy-stat"
        animate={{
          scale: accuracy < 100 ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        <div className="stat-label">Accuracy</div>
        <motion.div
          className="stat-value"
          style={{ color: getAccuracyColor(accuracy) }}
          key={accuracy}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {accuracy}%
        </motion.div>
        <div className="stat-rating">
          {accuracy >= 95 ? 'Excellent' : accuracy >= 85 ? 'Good' : accuracy >= 70 ? 'Fair' : 'Needs Work'}
        </div>
        
        {/* Accuracy Progress Ring */}
        <div className="progress-ring">
          <svg width="60" height="60" className="progress-ring-svg">
            <circle
              cx="30"
              cy="30"
              r="25"
              fill="transparent"
              stroke="#e0e0e0"
              strokeWidth="4"
            />
            <motion.circle
              cx="30"
              cy="30"
              r="25"
              fill="transparent"
              stroke={getAccuracyColor(accuracy)}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 25}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 25 }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * 25 - (accuracy / 100) * 2 * Math.PI * 25 
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }}
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsDisplay;