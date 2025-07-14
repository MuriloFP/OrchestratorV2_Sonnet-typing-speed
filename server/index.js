const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample typing passages
const typingPassages = [
  {
    id: 1,
    text: "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
    difficulty: "easy",
    category: "classic"
  },
  {
    id: 2,
    text: "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future.",
    difficulty: "medium",
    category: "technology"
  },
  {
    id: 3,
    text: "In the depths of winter, I finally learned that within me there lay an invincible summer. The human spirit possesses an extraordinary capacity for resilience and growth.",
    difficulty: "medium",
    category: "philosophy"
  },
  {
    id: 4,
    text: "Quantum mechanics describes the behavior of matter and energy at the molecular, atomic, nuclear, and even smaller microscopic levels. It challenges our classical understanding of physics.",
    difficulty: "hard",
    category: "science"
  },
  {
    id: 5,
    text: "The art of programming requires not only technical skills but also creativity, problem-solving abilities, and attention to detail. Code is poetry written for machines.",
    difficulty: "medium",
    category: "programming"
  },
  {
    id: 6,
    text: "Sustainable development meets the needs of the present without compromising the ability of future generations to meet their own needs. Environmental stewardship is crucial.",
    difficulty: "hard",
    category: "environment"
  },
  {
    id: 7,
    text: "Music is a universal language that transcends cultural boundaries. It has the power to evoke emotions, create memories, and bring people together.",
    difficulty: "easy",
    category: "arts"
  },
  {
    id: 8,
    text: "The entrepreneurial mindset involves identifying opportunities, taking calculated risks, and persevering through challenges to create value and drive innovation.",
    difficulty: "hard",
    category: "business"
  }
];

// Routes
app.get('/api/passages', (req, res) => {
  const { difficulty, category } = req.query;
  let filteredPassages = typingPassages;

  if (difficulty) {
    filteredPassages = filteredPassages.filter(p => p.difficulty === difficulty);
  }

  if (category) {
    filteredPassages = filteredPassages.filter(p => p.category === category);
  }

  res.json(filteredPassages);
});

app.get('/api/passages/random', (req, res) => {
  const { difficulty, category } = req.query;
  let filteredPassages = typingPassages;

  if (difficulty) {
    filteredPassages = filteredPassages.filter(p => p.difficulty === difficulty);
  }

  if (category) {
    filteredPassages = filteredPassages.filter(p => p.category === category);
  }

  if (filteredPassages.length === 0) {
    return res.status(404).json({ error: 'No passages found matching criteria' });
  }

  const randomIndex = Math.floor(Math.random() * filteredPassages.length);
  res.json(filteredPassages[randomIndex]);
});

app.get('/api/passages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const passage = typingPassages.find(p => p.id === id);

  if (!passage) {
    return res.status(404).json({ error: 'Passage not found' });
  }

  res.json(passage);
});

// Score calculation endpoint
app.post('/api/calculate-score', (req, res) => {
  const { originalText, typedText, timeInSeconds } = req.body;

  if (!originalText || !typedText || !timeInSeconds) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Calculate WPM (Words Per Minute)
  const wordsTyped = typedText.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / timeInSeconds) * 60);

  // Calculate accuracy
  const originalChars = originalText.split('');
  const typedChars = typedText.split('');
  let correctChars = 0;

  for (let i = 0; i < Math.min(originalChars.length, typedChars.length); i++) {
    if (originalChars[i] === typedChars[i]) {
      correctChars++;
    }
  }

  const accuracy = Math.round((correctChars / originalText.length) * 100);

  // Calculate performance rating
  let rating = 'Beginner';
  if (wpm >= 80 && accuracy >= 95) {
    rating = 'Expert';
  } else if (wpm >= 60 && accuracy >= 90) {
    rating = 'Advanced';
  } else if (wpm >= 40 && accuracy >= 85) {
    rating = 'Intermediate';
  }

  res.json({
    wpm,
    accuracy,
    rating,
    wordsTyped,
    timeInSeconds,
    correctChars,
    totalChars: originalText.length
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});