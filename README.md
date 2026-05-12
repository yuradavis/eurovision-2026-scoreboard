# Eurovision 2026 · Friends Scoreboard

A private multiplayer Eurovision voting game for friends. Built with React + Vite + Tailwind CSS.

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — build tool
- **Tailwind CSS 3** — utility-first styling
- **React Router DOM 6** — client-side routing
- **GitHub Pages** — hosting

---

## Project Structure

```
src/
├── App.jsx                     # Root router
├── main.jsx                    # Entry point
├── components/
│   ├── layout/
│   │   ├── AppLayout.jsx       # Root layout wrapper
│   │   ├── Navbar.jsx          # Sticky top navigation
│   │   ├── MobileMenu.jsx      # Mobile slide-in menu
│   │   ├── Footer.jsx          # Site footer
│   │   └── PageContainer.jsx   # Page wrapper with hero
│   └── ui/
│       ├── GlowButton.jsx      # Button with neon variants
│       ├── SectionCard.jsx     # Glassmorphic card container
│       ├── CountryCardPlaceholder.jsx  # Country row (3 variants)
│       └── LeaderboardPlaceholder.jsx  # Ranked leaderboard
├── context/
│   └── AppContext.jsx          # Global state (useReducer)
├── data/
│   └── eurovision2026.js       # All country/song mock data
├── hooks/
│   ├── useEurovisionData.js    # Typed data access hook
│   └── useLocalStorage.js      # Persistent local storage hook
├── pages/
│   ├── Home.jsx                # Home page with hero + leaderboard
│   ├── SemiFinal1.jsx          # Semi Final 1 (Running Order + Voting Cards)
│   ├── SemiFinal2.jsx          # Semi Final 2 (Running Order + Voting Cards)
│   ├── GrandFinal.jsx          # Grand Final (Jury + Public Vote + Leaderboard)
│   ├── Rules.jsx               # Rules page (Ukrainian)
│   ├── Login.jsx               # Login placeholder (Google)
│   └── NotFound.jsx            # 404 page
├── services/
│   ├── auth.js                 # Firebase Auth placeholder
│   └── db.js                   # Firestore placeholder
├── styles/
│   └── globals.css             # Tailwind + custom CSS layers
└── utils/
    ├── cn.js                   # className utility
    └── scoring.js              # Eurovision scoring logic
```

---

## Routes

| Path            | Page           |
|-----------------|----------------|
| `/`             | Home           |
| `/semi-final-1` | Semi Final 1   |
| `/semi-final-2` | Semi Final 2   |
| `/grand-final`  | Grand Final    |
| `/rules`        | Rules          |
| `/login`        | Login          |

---

## Setup & Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start dev server

```bash
npm run dev
```

Opens at `http://localhost:5173/eurovision-2026-scoreboard/`

### 3. Build for production

```bash
npm run build
```

Output goes to `dist/`

### 4. Preview production build

```bash
npm run preview
```

---

## GitHub Pages Deployment

### First-time setup

```bash
# Install gh-pages CLI tool (already in devDependencies)
npm install

# Deploy
npm run deploy
```

This runs `vite build` then publishes `dist/` to the `gh-pages` branch.

### GitHub repository settings

1. Go to your repo → **Settings → Pages**
2. Set source: **Deploy from a branch**
3. Branch: **gh-pages** / root
4. Save

Your app will be live at:
`https://<your-username>.github.io/eurovision-2026-scoreboard/`

### Routing on GitHub Pages

SPA routing is handled via the `public/404.html` redirect trick — all 404s redirect back to `index.html` with the path preserved in the query string, which `main.jsx` handles on load.

---

## Language Rules

| Content type                    | Language         |
|---------------------------------|------------------|
| Eurovision terminology          | **English**      |
| UI labels (nav, badges)         | **English**      |
| Descriptions, explanations      | **Ukrainian**    |
| Rules, helper text              | **Ukrainian**    |
| Error messages, status text     | **Ukrainian**    |

---

## Future Stages (Architecture Prepared)

### Stage 2 — Firebase Auth
- Replace `src/services/auth.js` stubs with real Firebase implementation
- Add `<ProtectedRoute>` component in `App.jsx` (slot already exists)
- Connect `AppContext` user state to `onAuthStateChanged`

### Stage 3 — Firestore + Realtime Voting
- Replace `src/services/db.js` stubs with Firestore reads/writes
- Implement `onLeaderboardUpdate` realtime listener
- Wire scoring logic from `src/utils/scoring.js`

### Stage 4 — Voting Logic
- Enable point-selector buttons in SemiFinal/GrandFinal pages
- Validate votes with `validateVotes()` from utils
- Submit via `dbService.submitVotes()`

---

## Design System

### Color Palette

| Token            | Value     | Usage                  |
|------------------|-----------|------------------------|
| `neon-pink`      | `#f72585` | Primary accent, CTA    |
| `neon-purple`    | `#7209b7` | Secondary accent       |
| `neon-violet`    | `#a855f7` | Grand Final accent     |
| `neon-cyan`      | `#4cc9f0` | Secondary highlights   |
| `neon-blue`      | `#4361ee` | Info/links             |
| `night-950`      | `#06040f` | Page background        |
| `night-900`      | `#0d0820` | Card backgrounds       |

### Fonts

| Role     | Family       | Weights     |
|----------|--------------|-------------|
| Display  | Syne         | 400–800     |
| Body     | DM Sans      | 300–600     |
| Mono     | JetBrains Mono | 400–500  |

### CSS Classes (custom)

```css
.glass-card          /* Glassmorphic card base */
.glass-card-hover    /* Card with hover transition */
.gradient-text       /* Neon rainbow gradient text */
.gradient-text-pink  /* Pink→purple gradient text */
.text-glow-pink      /* Pink neon text shadow */
.neon-divider        /* Horizontal gradient line */
.skeleton            /* Loading shimmer animation */
```
