# PM Procrastinator Game

> **Disclaimer**: This game is created purely for fun and entertainment purposes. It's a lighthearted, satirical take on project management work life and is not intended to offend anyone. All characters, events, and situations are fictional and meant to be humorous. If you're a PM, developer, or anyone in tech - we love you! This is just a fun way to poke gentle fun at the daily grind we all experience. 😊

## 🎮 About

PM Procrastinator is a satirical browser-based game where you play as a Project Manager trying to survive a typical workday (9 AM to 6 PM). Your goal is to manage your stress levels, keep suspicion low, maintain your coffee/energy levels, and make it through the day without losing your sanity.

## 🎯 How to Play

- **Objective**: Survive the workday from 9:00 AM to 6:00 PM while managing three key metrics:
  - **Stress** (0-100): Keep it low or face consequences
  - **Suspicion** (0-100): Don't let people catch on to your... creative work methods
  - **Coffee/Energy** (0-100): Stay caffeinated to keep going

- **Actions Available**:
  - 🎫 **Move Ticket**: Shift tasks around in Jira (reduces stress and suspicion)
  - ☕ **Coffee**: Grab a latte to boost energy (but might raise suspicion)
  - 📞 **Call Meeting**: Organize a "sync about sync" (reduces suspicion but increases stress)
  - 💼 **LinkedIn**: Post about your "successful success" (reduces stress but raises suspicion)
  - 🗣️ **Buzzwords**: Use PM jargon to sound productive
  - 🐛 **Blame Dev**: The classic "it's a backend issue" move

- **Random Events**: Unexpected situations will occur throughout the day that can affect your stats.

- **Win/Lose Conditions**: 
  - Make it to 6:00 PM without your stress or suspicion hitting critical levels
  - Or... face the consequences of poor management!

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pm-procastinator-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Additional Scripts

```bash
# Clean build directory
npm run clean

# Build with verification
npm run build:check
```

## 🚀 Deployment

The app is ready for deployment. Configuration files are included for easy setup.

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect the `vercel.json` configuration
4. Deploy with one click!

The `vercel.json` file is already configured with:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing support
- Asset caching headers

**Alternative: Via Vercel CLI:**
```bash
npm i -g vercel
vercel
```

### GitHub Pages

1. Enable GitHub Pages in your repository settings
2. Select the `gh-pages` branch as the source
3. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy on push to `master` or `main`

**Note**: Make sure to enable GitHub Actions in your repository settings and grant write permissions for the workflow.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist` directory contains all static files ready for deployment
3. Upload the contents of `dist` to any static hosting service:
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Azure Static Web Apps
   - Any web server (nginx, Apache, etc.)

### Environment Variables

Currently, no environment variables are required. If you need to add them in the future:

1. Create a `.env` file for local development
2. Create a `.env.example` file with placeholder values
3. Configure environment variables in your hosting platform's dashboard

### Build Optimization

The production build includes:
- Code minification and tree-shaking
- Asset optimization
- Code splitting for better performance
- Vendor chunk separation (React, icons)

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── app-types/        # TypeScript type definitions
├── components/       # React components
│   ├── actions/     # Action buttons and grid
│   ├── game/        # Game UI components
│   ├── overlays/    # Start/victory/game over screens
│   └── ui/          # Reusable UI components
├── constants/       # Game constants and configuration
├── hooks/           # Custom React hooks
├── reducers/        # Game state management
└── utils/           # Utility functions
```

## 🎨 Features

- Real-time game loop with tick-based progression
- Dynamic event system with random occurrences
- Multiple action types with different effects
- Log system tracking your actions and events
- Victory and game over conditions
- Responsive design with dark mode support
- Ukrainian language interface

## 🐛 Development

### Linting

```bash
npm run lint
```

### CI/CD

The project includes GitHub Actions workflows:
- **CI** (`.github/workflows/ci.yml`): Runs on every push/PR to validate code quality
- **Deploy** (`.github/workflows/deploy.yml`): Automatically deploys to GitHub Pages on main branch

### Contributing

Feel free to submit issues, fork the repository, and create pull requests. Any contributions are welcome!

## 📝 License

This project is open source and available for educational and entertainment purposes.

## 🙏 Acknowledgments

Created with humor and respect for everyone in the tech industry. Remember: it's just a game, and we're all in this together! 💙

---

**Note**: The game interface is in Ukrainian, but the codebase is well-structured and documented in English for easy contribution.

