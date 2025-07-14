import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  return (
    <motion.header
      className="app-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-content">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            className="logo-icon"
            animate={{
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ⚡
          </motion.span>
          <span className="logo-text">TypeSpeed</span>
        </motion.div>
        
        <nav className="nav-links">
          <motion.a
            href="#"
            className="nav-link"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.a>
          <motion.a
            href="#"
            className="nav-link"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Leaderboard
          </motion.a>
          <motion.a
            href="#"
            className="nav-link"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Settings
          </motion.a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;