# Typing Speed Test Application

A complete interactive typing test application built with Node.js backend and React frontend. Test your typing speed and accuracy with real-time feedback, animated celebrations, and detailed performance analytics.

## Features

### 🚀 Core Features
- **Real-time WPM and accuracy tracking** - See your performance update as you type
- **Interactive typing test interface** - Clean, intuitive design with visual feedback
- **Multiple difficulty levels** - Easy, Medium, and Hard passages
- **Category selection** - Choose from Technology, Science, Programming, Arts, and more
- **Animated progress indicators** - Visual progress bar with milestones
- **Celebratory effects** - Confetti and animations for high scores
- **Responsive design** - Works perfectly on desktop, tablet, and mobile

### 📊 Performance Analytics
- Words per minute (WPM) calculation
- Real-time accuracy percentage
- Performance rating system
- Detailed results breakdown
- Character-by-character feedback

### 🎨 User Experience
- Modern, sleek interface
- Smooth animations and transitions
- Real-time visual feedback
- Intuitive controls and navigation
- Mobile-responsive design

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **RESTful API** - Clean API endpoints

### Frontend
- **React 18** - UI framework
- **Framer Motion** - Animations and transitions
- **React Confetti** - Celebration effects
- **Axios** - HTTP client
- **Modern CSS** - Responsive styling

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone or download the project**
   ```bash
   # If you have the project files, navigate to the project directory
   cd typing-speed-test
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   This command will install dependencies for the root, server, and client directories.

3. **Start the application**
   ```bash
   npm run dev
   ```
   This will start both the backend server (port 5000) and React frontend (port 3000) concurrently.

4. **Open your browser**
   Navigate to `http://localhost:3000` to use the application.

### Manual Setup (Alternative)

If you prefer to set up each part manually:

1. **Install root dependencies**
   ```bash
   npm install
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Set up the frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm start
   ```

## Available Scripts

### Root Directory
- `npm run dev` - Start both server and client in development mode
- `npm run install-all` - Install dependencies for all parts of the application
- `npm run build` - Build the React app for production
- `npm start` - Start the production server

### Server Directory (`cd server`)
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

### Client Directory (`cd client`)
- `npm start` - Start the React development server
- `npm run build` - Build the app for production
- `npm test` - Run the test suite

## API Endpoints

The backend provides the following REST API endpoints:

### Passages
- `GET /api/passages` - Get all typing passages
- `GET /api/passages/random` - Get a random passage
- `GET /api/passages/:id` - Get a specific passage by ID

### Query Parameters
- `difficulty` - Filter by difficulty (easy, medium, hard)
- `category` - Filter by category (technology, science, programming, etc.)

### Scoring
- `POST /api/calculate-score` - Calculate WPM, accuracy, and performance rating

### Health Check
- `GET /api/health` - Server health status

## Project Structure

```
typing-speed-test/
├── package.json                 # Root package.json with scripts
├── README.md                   # This file
├── server/                     # Backend Node.js application
│   ├── package.json           # Server dependencies
│   └── index.js              # Express server with API endpoints
└── client/                    # Frontend React application
    ├── package.json          # Client dependencies
    ├── public/
    │   └── index.html       # HTML template
    └── src/
        ├── App.js           # Main React component
        ├── App.css          # Main styles
        ├── index.js         # React entry point
        ├── index.css        # Global styles
        └── components/      # React components
            ├── TypingTest.js      # Core typing test logic
            ├── Timer.js           # Timer component
            ├── ProgressBar.js     # Progress indicator
            ├── StatsDisplay.js    # Real-time stats
            ├── Results.js         # Results screen
            ├── Header.js          # App header
            ├── LoadingSpinner.js  # Loading component
            └── *.css             # Component styles
```

## Usage Guide

### Starting a Test
1. Select your preferred difficulty level (Easy, Medium, Hard)
2. Choose a category or leave as "All Categories"
3. Click "Start Typing Test"

### During the Test
- Type the displayed passage in the text area
- Watch your WPM and accuracy update in real-time
- See your progress with the animated progress bar
- Characters are highlighted as correct (green) or incorrect (red)

### After Completion
- View detailed results including WPM, accuracy, and performance rating
- Enjoy celebratory animations for high scores
- Choose to take another test or return to the menu

## Performance Ratings

- **Beginner**: < 20 WPM
- **Average**: 20-39 WPM
- **Good**: 40-59 WPM
- **Very Good**: 60-79 WPM
- **Excellent**: 80+ WPM

Accuracy ratings:
- **Excellent**: 95%+
- **Good**: 85-94%
- **Fair**: 70-84%
- **Needs Work**: < 70%

## Customization

### Adding New Passages
Edit `server/index.js` and add new entries to the `typingPassages` array:

```javascript
{
  id: 9,
  text: "Your custom passage text here...",
  difficulty: "medium",
  category: "custom"
}
```

### Styling
- Modify CSS files in `client/src/components/` for component-specific styles
- Edit `client/src/App.css` for global application styles
- Customize colors, animations, and layout as needed

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change ports in `server/index.js` (backend) or `client/package.json` (frontend)

2. **Dependencies not installing**
   - Delete `node_modules` folders and `package-lock.json` files
   - Run `npm run install-all` again

3. **API connection issues**
   - Ensure backend server is running on port 5000
   - Check that `proxy` is set correctly in `client/package.json`

### Development Tips

- Use browser developer tools to debug React components
- Check the browser console for any JavaScript errors
- Monitor network requests to ensure API calls are working
- Use React Developer Tools extension for better debugging

## Contributing

Feel free to contribute to this project by:
- Adding new typing passages
- Improving the UI/UX design
- Adding new features (leaderboards, user accounts, etc.)
- Optimizing performance
- Fixing bugs

## License

This project is open source and available under the MIT License.

---

**Happy Typing!** 🎯⚡