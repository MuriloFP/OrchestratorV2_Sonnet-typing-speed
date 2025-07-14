import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import StatsDisplay from './StatsDisplay';
import './TypingTest.css';

const TypingTest = ({ passage, onComplete, onReset }) => {
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState([]);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const textareaRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isActive && !isComplete) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;
        setTimeElapsed(elapsed);
        
        // Calculate real-time WPM
        if (elapsed > 0) {
          const wordsTyped = userInput.trim().split(/\s+/).filter(word => word.length > 0).length;
          const currentWpm = Math.round((wordsTyped / elapsed) * 60);
          setWpm(currentWpm);
        }
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isComplete, startTime, userInput]);

  useEffect(() => {
    // Calculate real-time accuracy
    if (userInput.length > 0) {
      let correctChars = 0;
      const newErrors = [];
      
      for (let i = 0; i < userInput.length; i++) {
        if (i < passage.text.length && userInput[i] === passage.text[i]) {
          correctChars++;
        } else {
          newErrors.push(i);
        }
      }
      
      const currentAccuracy = Math.round((correctChars / userInput.length) * 100);
      setAccuracy(currentAccuracy);
      setErrors(newErrors);
    } else {
      setAccuracy(100);
      setErrors([]);
    }
  }, [userInput, passage.text]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Start timer on first keystroke
    if (!isActive && value.length === 1) {
      setStartTime(Date.now());
      setIsActive(true);
    }

    // Prevent typing beyond the passage length
    if (value.length <= passage.text.length) {
      setUserInput(value);
      setCurrentIndex(value.length);

      // Check if test is complete
      if (value.length === passage.text.length) {
        setIsComplete(true);
        setIsActive(false);
        onComplete(value, timeElapsed);
      }
    }
  };

  const handleKeyDown = (e) => {
    // Prevent certain keys that might interfere
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  const resetTest = () => {
    setUserInput('');
    setCurrentIndex(0);
    setStartTime(null);
    setTimeElapsed(0);
    setIsActive(false);
    setIsComplete(false);
    setErrors([]);
    setWpm(0);
    setAccuracy(100);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const renderText = () => {
    return passage.text.split('').map((char, index) => {
      let className = 'char';
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          className += ' correct';
        } else {
          className += ' incorrect';
        }
      } else if (index === currentIndex) {
        className += ' current';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const progress = (userInput.length / passage.text.length) * 100;

  return (
    <div className="typing-test">
      <div className="test-header">
        <div className="test-info">
          <span className="difficulty-badge">{passage.difficulty}</span>
          <span className="category-badge">{passage.category}</span>
        </div>
        <button className="reset-button" onClick={onReset}>
          Back to Menu
        </button>
      </div>

      <div className="stats-container">
        <StatsDisplay wpm={wpm} accuracy={accuracy} />
        <Timer timeElapsed={timeElapsed} isActive={isActive} />
      </div>

      <ProgressBar progress={progress} />

      <motion.div
        className="text-display"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="passage-text">
          {renderText()}
        </div>
      </motion.div>

      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isComplete ? "Test completed!" : "Start typing here..."}
          disabled={isComplete}
          className="typing-input"
          rows={4}
        />
      </div>

      <div className="test-controls">
        <motion.button
          className="control-button"
          onClick={resetTest}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isComplete}
        >
          Reset Test
        </motion.button>
      </div>

      {isComplete && (
        <motion.div
          className="completion-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>Test Complete! 🎉</h3>
          <p>Calculating your results...</p>
        </motion.div>
      )}
    </div>
  );
};

export default TypingTest;