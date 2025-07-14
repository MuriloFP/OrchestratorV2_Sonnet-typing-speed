import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import './Results.css';

const Results = ({ results, onNewTest, onBackToMenu }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // Show confetti for good performance
    if (results.wpm >= 60 && results.accuracy >= 90) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [results]);

  const getPerformanceMessage = () => {
    const { wpm, accuracy } = results;
    
    if (wpm >= 80 && accuracy >= 95) {
      return {
        title: "🏆 Outstanding Performance!",
        message: "You're a typing master! Your speed and accuracy are exceptional.",
        emoji: "🎉"
      };
    } else if (wpm >= 60 && accuracy >= 90) {
      return {
        title: "🌟 Excellent Work!",
        message: "Great job! You have impressive typing skills.",
        emoji: "👏"
      };
    } else if (wpm >= 40 && accuracy >= 85) {
      return {
        title: "👍 Good Job!",
        message: "You're doing well! Keep practicing to improve further.",
        emoji: "💪"
      };
    } else if (wpm >= 20 && accuracy >= 70) {
      return {
        title: "📈 Keep Improving!",
        message: "You're on the right track! Practice makes perfect.",
        emoji: "🎯"
      };
    } else {
      return {
        title: "🌱 Great Start!",
        message: "Everyone starts somewhere! Keep practicing and you'll improve.",
        emoji: "🚀"
      };
    }
  };

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

  const performance = getPerformanceMessage();

  return (
    <div className="results-container">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      <motion.div
        className="results-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="performance-header"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="performance-emoji"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {performance.emoji}
          </motion.div>
          <h2 className="performance-title">{performance.title}</h2>
          <p className="performance-message">{performance.message}</p>
        </motion.div>

        <div className="results-grid">
          <motion.div
            className="result-card wpm-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="result-icon">⚡</div>
            <div className="result-label">Words Per Minute</div>
            <motion.div
              className="result-value"
              style={{ color: getWpmColor(results.wpm) }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
            >
              {results.wpm}
            </motion.div>
            <div className="result-rating">{results.rating}</div>
          </motion.div>

          <motion.div
            className="result-card accuracy-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="result-icon">🎯</div>
            <div className="result-label">Accuracy</div>
            <motion.div
              className="result-value"
              style={{ color: getAccuracyColor(results.accuracy) }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
            >
              {results.accuracy}%
            </motion.div>
            <div className="result-rating">
              {results.accuracy >= 95 ? 'Excellent' : 
               results.accuracy >= 85 ? 'Good' : 
               results.accuracy >= 70 ? 'Fair' : 'Needs Work'}
            </div>
          </motion.div>

          <motion.div
            className="result-card time-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="result-icon">⏱️</div>
            <div className="result-label">Time Taken</div>
            <div className="result-value">
              {Math.floor(results.timeInSeconds / 60)}:
              {(results.timeInSeconds % 60).toFixed(1).padStart(4, '0')}
            </div>
            <div className="result-rating">
              {results.wordsTyped} words typed
            </div>
          </motion.div>

          <motion.div
            className="result-card chars-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="result-icon">📝</div>
            <div className="result-label">Characters</div>
            <div className="result-value">
              {results.correctChars || 0}/{results.totalChars || 0}
            </div>
            <div className="result-rating">Correct/Total</div>
          </motion.div>
        </div>

        <motion.div
          className="passage-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3>Test Details</h3>
          <div className="passage-meta">
            <span className="difficulty-badge">{results.passage.difficulty}</span>
            <span className="category-badge">{results.passage.category}</span>
          </div>
        </motion.div>

        <motion.div
          className="results-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <motion.button
            className="action-button primary"
            onClick={onNewTest}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Take Another Test
          </motion.button>
          <motion.button
            className="action-button secondary"
            onClick={onBackToMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Menu
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Results;