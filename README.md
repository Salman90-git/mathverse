# MathVerse · Interactive Math Learning Hub

A complete, polished, multi-page math learning website built as a **University Web Engineering Project**.  
**Developer:** Salman Hassan

---

## 🚀 Features

| Page | Tool | Description |
|------|------|-------------|
| `index.html` | Home | Hero, Math Fact of the Day, tool cards, progress summary |
| `pages/graph.html` | Graph Plotter | Plot multiple functions with zoom/pan on HTML canvas |
| `pages/matrix.html` | Matrix Calculator | 2×2–4×4 ops: add, subtract, multiply, transpose, determinant, inverse (step-by-step) |
| `pages/probability.html` | Probability Simulator | Dice/coin/card simulations with Chart.js Law of Large Numbers demo |
| `pages/number-theory.html` | Number Theory | Prime checker, animated Sieve of Eratosthenes, GCD/LCM, Fibonacci, Collatz |
| `pages/equations.html` | Equation Solver | Linear & quadratic solver with discriminant steps and parabola preview |
| `pages/converter.html` | Unit Converter | Length, weight, temperature, area, speed, data — live conversion |
| `pages/formulas.html` | Formula Library | 35+ KaTeX formulas with search, category filter, and favorites |
| `pages/quiz.html` | Quiz Arena | Timed MCQ quiz with topic selector, explanations, streak tracking |
| `pages/dashboard.html` | Progress Dashboard | Charts for score trends, topic breakdown, weakest area |
| `pages/about.html` | About | Project info, tech stack, developer bio |
| `pages/contact.html` | Contact | Validated form with inline errors and success state |
| `pages/fractals.html` | Fractals *(Bonus)* | Mandelbrot set (click-to-zoom) & Sierpiński triangle with sliders |

---

## 🗂 Folder Structure

```
mathverse/
├── index.html                  # Homepage
├── pages/
│   ├── graph.html              # Graph Plotter
│   ├── matrix.html             # Matrix Calculator
│   ├── probability.html        # Probability Simulator
│   ├── number-theory.html      # Number Theory
│   ├── equations.html          # Equation Solver
│   ├── converter.html          # Unit Converter
│   ├── formulas.html           # Formula Library
│   ├── quiz.html               # Quiz Arena
│   ├── dashboard.html          # Progress Dashboard
│   ├── about.html              # About
│   ├── contact.html            # Contact
│   └── fractals.html           # Fractals (Bonus)
├── js/
│   ├── main.js                 # Shared: navbar, footer, theme toggle
│   ├── storage.js              # localStorage helper (get/set/remove)
│   ├── graph.js                # (stub — logic inline in graph.html)
│   ├── matrix.js               # (stub)
│   ├── probability.js          # (stub)
│   ├── numberTheory.js         # (stub)
│   ├── equations.js            # (stub)
│   ├── converter.js            # (stub)
│   ├── quiz.js                 # (stub)
│   ├── dashboard.js            # (stub)
│   └── fractals.js             # (stub)
├── data/
│   ├── formulas.json           # 35+ math formulas (KaTeX)
│   └── questions.json          # 44 MCQ questions across 4 topics
└── css/
    └── style.css               # Global styles (dark/light theme, glassmorphism)
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **HTML5** | — | Semantic markup, canvas |
| **Tailwind CSS** | CDN | Utility-first layout classes |
| **Vanilla JS** | ES Modules | All interactivity, no frameworks |
| **KaTeX** | 0.16.9 | LaTeX formula rendering |
| **math.js** | 12.4.2 | Safe expression parsing in Graph Plotter |
| **Chart.js** | Latest | Charts in Probability, Number Theory, Dashboard |
| **Google Fonts** | — | Inter (text) + JetBrains Mono (numbers) |

> **No build step required.** No Node.js, no npm, no bundler.

---

## ▶️ How to Run

### Option 1 — VS Code Live Server (Recommended)
1. Open the `mathverse/` folder in VS Code.
2. Install the **Live Server** extension (if not already installed).
3. Right-click `index.html` → **Open with Live Server**.
4. The site opens at `http://127.0.0.1:5500/`.

### Option 2 — Any HTTP server
```bash
# Python 3
python -m http.server 8080
# then open http://localhost:8080

# Node.js (npx)
npx serve .
```

### Option 3 — Direct file open *(limited)*
Open `index.html` directly in a browser.  
> ⚠️ Some features that use `fetch()` (Formula Library, Quiz) require a local server due to CORS restrictions on `file://` URLs. Use Live Server for full functionality.

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0f172a` (dark navy) |
| Card background | `rgba(15, 23, 42, 0.6)` glassmorphism |
| Accent Purple | `#a855f7` |
| Accent Cyan | `#06b6d4` |
| Accent Indigo | `#6366f1` |
| Text primary | `#f1f5f9` |
| Text secondary | `#94a3b8` |

- **Dark / Light theme toggle** — saved in `localStorage`
- **Glassmorphism cards** with `backdrop-filter: blur(12px)`
- **Responsive** — mobile hamburger menu, fluid grid layouts
- **Accessible** — ARIA labels, focus rings, semantic HTML, sufficient contrast

---

## 📦 Data Files

### `data/formulas.json`
- 35 formulas across 5 categories: Algebra, Geometry, Trigonometry, Calculus, Statistics
- Each formula has: `id`, `category`, `title`, `latex` (KaTeX), `description`

### `data/questions.json`
- 44 MCQs across 4 topics: Algebra, Calculus, Geometry, Statistics
- Each question has: `id`, `topic`, `question`, `options[]`, `answer` (0-indexed), `explanation`

---

## 💾 localStorage Keys

| Key | Purpose |
|-----|---------|
| `mv_theme` | `'dark'` or `'light'` |
| `mv_quiz_scores` | Array of `{date, topic, score, total, pct}` |
| `mv_quiz_streak` | Current daily streak (integer) |
| `mv_quiz_last_date` | Last quiz date string for streak calc |
| `mv_favorites` | Array of favorite formula IDs |
| `mv_progress` | Miscellaneous progress data |

---

## 📐 Development Phases

| Phase | Scope |
|-------|-------|
| **A** | Shared layout, navbar, footer, theme, storage helper, homepage |
| **B** | Graph Plotter, Equation Solver, Matrix Calculator |
| **C** | Number Theory, Probability Simulator, Unit Converter, Formula Library |
| **D** | Quiz Arena, Progress Dashboard |
| **E** | About, Contact, Fractals (Bonus) |

---

## 📄 License

MIT — Free to use and modify for educational purposes.

---

*MathVerse · Built with ❤️ using HTML5, Tailwind CSS & Vanilla JavaScript*
