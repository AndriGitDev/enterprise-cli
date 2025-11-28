# ANDRI.IS - Terminal Interface

> An interactive CLI portfolio with real-time WPM tracking, Matrix rain effects, and gamification

![Version](https://img.shields.io/badge/version-2.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

- **🖥️ Full Terminal Interface** - Built with xterm.js for authentic terminal experience
- **⚡ Real-time WPM Tracking** - Track your typing speed with live updates
- **🎮 Gamification System** - Unlock achievements and compete for ranks
- **🌊 Matrix Rain Background** - Animated cyberpunk aesthetic
- **📊 Live Metrics Dashboard** - Real-time system stats and performance
- **🎨 Cyberpunk Theme** - Neon green/cyan color scheme with glow effects
- **📱 Mobile Responsive** - Works seamlessly on all devices
- **🔒 Security Focus** - Highlights ISO 27001, ISO 42001, and TPN Gold certifications

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2 (App Router)
- **Runtime**: TypeScript
- **Terminal**: xterm.js 5.3.0
- **Styling**: Tailwind CSS + Custom CSS
- **Deployment**: Vercel Edge Network
- **Fonts**: Fira Code, JetBrains Mono

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/AndriGitDev/enterprise-cli.git
cd enterprise-cli

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Available Commands

### Portfolio Commands
- `about` - Learn about me
- `skills` - View technical skills
- `services` - What I can do for you
- `projects` - Portfolio projects
- `work` - Work experience
- `companies` - Companies I've worked with
- `certs` - Security certifications

### Contact & Social
- `contact` - Get in touch
- `social` - Social media links
- `linkedin` - Open LinkedIn profile
- `github` - Open GitHub profile

### System Commands
- `help` - Show help menu
- `clear` - Clear terminal
- `whoami` - Display current user
- `ls` - List files
- `cat <file>` - Read a file
- `date` - Show current date/time
- `neofetch` - System information

### Fun Commands
- `banner` - Display ASCII banner
- `matrix` - Toggle Matrix rain
- `hack` - Hacker mode
- `sudo <cmd>` - Run as superuser

## 🎨 Design Philosophy

The terminal interface combines cybersecurity aesthetics with modern web technologies:

- **Color Palette**:
  - Primary: `#00ff9d` (Cyber Green)
  - Secondary: `#00d4ff` (Cyber Cyan)
  - Background: `#0a0a0f` (Dark)
  - Accent: `#ff006e` (Pink)

- **Typography**: Monospace fonts (Fira Code, JetBrains Mono)
- **Effects**: Glitch animations, glow effects, glassmorphism
- **Background**: Animated Matrix rain with Japanese characters

## 🏆 WPM Tracking & Ranks

The terminal tracks your typing speed in real-time:

| WPM Range | Rank | Color |
|-----------|------|-------|
| 0-20 | NOVICE | Red |
| 21-40 | INTERMEDIATE | Yellow |
| 41-60 | ADVANCED | Cyan |
| 61-80 | EXPERT | Green |
| 81-99 | ELITE | Pink |
| 100+ | GODLIKE | Neon Pink |

## 🎖️ Achievements

Unlock achievements by:
- ⚡ **Speed Demon** - Type at >80 WPM for 1 minute
- 🏃 **Marathon Typer** - Type 1000 characters without stopping
- 🎯 **Perfect Accuracy** - 100 characters with no backspaces
- 🦉 **Night Owl** - Use terminal between 2-4 AM
- 📜 **Script Master** - Run all available commands
- 🔥 **Godlike** - Achieve 100+ WPM
- 💪 **Persistent** - Use terminal for 30 minutes straight

## 📁 Project Structure

```
enterprise-cli/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── metrics/
│   │   │   ├── wpm/
│   │   │   ├── signup/
│   │   │   └── demo/
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Main page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── Terminal.tsx      # Main terminal component
│   │   ├── WPMCounter.tsx    # WPM display
│   │   ├── MetricsPanel.tsx  # Live metrics
│   │   ├── MatrixRain.tsx    # Background effect
│   │   └── LoadingScreen.tsx # Boot sequence
│   ├── lib/
│   │   ├── terminal/
│   │   │   └── commands.ts   # Command handlers
│   │   └── wpm/
│   │       ├── tracker.ts    # WPM calculation
│   │       └── analytics.ts  # Achievement tracking
│   └── types/
│       └── terminal.ts       # TypeScript types
├── data/
│   └── portfolio.json        # Portfolio data
├── public/
│   └── assets/
└── package.json
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Set custom domain
vercel domains add cli.andri.is
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://cli.andri.is
KV_REST_API_URL=<vercel-kv-url>
KV_REST_API_TOKEN=<vercel-kv-token>
RESEND_API_KEY=<your-resend-key>
```

## 📊 Performance

- **Initial Load**: < 200KB
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Lighthouse Score**: 95+

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 📧 Contact

- **Email**: contact@andri.is
- **LinkedIn**: [linkedin.com/in/andripetur](https://www.linkedin.com/in/andripetur/)
- **GitHub**: [github.com/AndriGitDev](https://github.com/AndriGitDev)
- **Website**: [andri.is](https://andri.is)

---

Made with ❤️ by Andri | Simplify IT
