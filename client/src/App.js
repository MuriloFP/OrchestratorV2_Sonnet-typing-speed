import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingTest from './components/TypingTest';
import Results from './components/Results';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import axios from 'axios';
import './App.css';

function App() {
  const [currentPassage, setCurrentPassage] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gameState, setGameState] = useState('menu'); // menu, testing, results
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('');

  const fetchRandomPassage = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (difficulty) params.difficulty = difficulty;
      if (category) params.category = category;

      const response = await axios.get('/api/passages/random', { params });
      setCurrentPassage(response.data);
      setGameState('testing');
    } catch (error) {
      console.error('Error fetching passage:', error);
      // Fallback passage if API fails
      setCurrentPassage({
        id: 0,
        text: "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
        difficulty: "easy",
        category: "classic"
      });
      setGameState('testing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestComplete = async (typedText, timeInSeconds) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/calculate-score', {
        originalText: currentPassage.text,
        typedText,
        timeInSeconds
      });
      
      setTestResults({
        ...response.data,
        passage: currentPassage
      });
      setGameState('results');
    } catch (error) {
      console.error('Error calculating score:', error);
      // Fallback calculation
      const wordsTyped = typedText.trim().split(/\s+/).length;
      const wpm = Math.round((wordsTyped / timeInSeconds) * 60);
      const accuracy = Math.round((typedText.length / currentPassage.text.length) * 100);
      
      setTestResults({
        wpm,
        accuracy,
        rating: 'Calculated offline',
        wordsTyped,
        timeInSeconds,
        passage: currentPassage
      });
      setGameState('results');
    } finally {
      setIsLoading(false);
    }
  };

  const resetTest = () => {
    setCurrentPassage(null);
    setTestResults(null);
    setGameState('menu');
  };

  const startNewTest = () => {
    setTestResults(null);
    fetchRandomPassage();
  };

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loading-container"
            >
              <LoadingSpinner />
            </motion.div>
          )}

          {!isLoading && gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="menu-container"
            >
              <div className="menu-content">
                <h1>Typing Speed Test</h1>
                <p>Test your typing speed and accuracy with our interactive typing test!</p>
                
                <div className="settings">
                  <div className="setting-group">
                    <label htmlFor="difficulty">Difficulty:</label>
                    <select
                      id="difficulty"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  
                  <div className="setting-group">
                    <label htmlFor="category">Category:</label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      <option value="classic">Classic</option>
                      <option value="technology">Technology</option>
                      <option value="science">Science</option>
                      <option value="programming">Programming</option>
                      <option value="business">Business</option>
                      <option value="arts">Arts</option>
                      <option value="environment">Environment</option>
                      <option value="philosophy">Philosophy</option>
                    </select>
                  </div>
                </div>
                
                <motion.button
                  className="start-button"
                  onClick={fetchRandomPassage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Typing Test
                </motion.button>
              </div>
            </motion.div>
          )}

          {!isLoading && gameState === 'testing' && currentPassage && (
            <motion.div
              key="testing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <TypingTest
                passage={currentPassage}
                onComplete={handleTestComplete}
                onReset={resetTest}
              />
            </motion.div>
          )}

          {!isLoading && gameState === 'results' && testResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Results
                results={testResults}
                onNewTest={startNewTest}
                onBackToMenu={resetTest}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;