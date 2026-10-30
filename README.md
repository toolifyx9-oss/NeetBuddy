# NEETBuddy Platform 🚀

NEETBuddy is an ultra-premium, dynamic web application engineered for serious NEET aspirants and top medical college candidates (AIIMS, JIPMER, MAMC). Built with **Next.js 15 App Router**, **React 19**, **Tailwind CSS**, **TypeScript**, **Framer Motion**, and **Lucide React**.

---

## 🎨 Refined Design System & Brand Identity

- **Studio Charcoal & Emerald/Indigo Glow Palette**:
  - Base Background: Deep Obsidian / Graphite Slate (`#0D1117`)
  - Elevated Glassmorphism: Translucent slate (`#161B22` / `bg-slate-900/60` with `backdrop-blur-md` and `border-white/[0.08]`)
  - Accent Primary: Electric Indigo (`#6366F1`)
  - Success & Consistency: Vivid Emerald (`#10B981`)
  - Negative Marking & Traps: Coral / Rose (`#F43F5E`)
- **Brand Logo**:
  - Horizontal high-resolution 4K brand identity preserving the exact original NB emblem on the left.
  - Wordmark on the right on one horizontal line: 3D silver/white lettering for "NEET" and vibrant royal blue to electric cyan gradient for "Buddy".
  - Vertically center-aligned with the emblem on a 100% transparent alpha channel.

---

## ⚡ Core Interactive Modules & Architecture

### 1. Global Client-Side State Store (`useStore`)
- **Local Storage Persistence**: Real-time hydration across sessions.
- **Dynamic Streak Tracker**: Live daily streak counter that increments upon completing practice sets and tests.
- **Mistake Ledger**: Automated capture of questions answered incorrectly with instant sync to the Improvement Book.
- **Bookmark Engine**: One-click question bookmarking from any test or practice card.
- **Study Plan Management**: Kanban task state transitions (`todo` ➔ `in_progress` ➔ `completed`) with custom task creator.

### 2. Live NTA Test Runner & Simulator
- **Exact NTA Scoring Engine**: Evaluates answers with strict $+4$ for correct and $-1$ for incorrect markings.
- **Real-Time Countdown Timer**: With color-coded critical alerts when under 5 minutes.
- **Multi-State Question Palette**: Color indicators for Answered, Marked for Review, Visited, and Not Visited.
- **Comprehensive Score Telemetry**: Post-test score report, percentile estimates, accuracy %, subject-by-subject breakdown, and confetti celebrations.

### 3. Practice & DPP Engine
- **Dynamic Subject Filtering**: Switch between Physics, Chemistry, and Biology to filter high-yield NCERT chapters.
- **Custom Test Configurator**: Select question volume ($10, 20, 30, 45$) and timer duration ($15m, 25m, 45m, 60m$) to mount instant custom tests.
- **Instant Practice Mode**: Click options directly with immediate green/red feedback and collapsible step-by-step NCERT solutions.

### 4. Trackprep-Style Improvement Book
- **Mistake Notebook**: Automatically stores every wrong answer, user choice vs. correct choice, and student mistake trap warnings.
- **Mastery Tracker**: Toggle questions as "Mastered" to track concept retention progress.
- **Mistake Drill Launcher**: Launch focused practice sets consisting strictly of unmastered mistakes.

### 5. AI Doubt Solver & Concept Deriver
- **Interactive Chat Interface**: Ask any Physics numerical derivation, Chemistry reaction mechanism, or Biology pathway.
- **Pre-Filled High-Yield Prompts**: Instant answers for Newton's laws & friction, Meiosis crossing-over stages, SN1 vs SN2 kinetics, and Carnot efficiency.
- **Structured Explanations**: Core NCERT concept, step-by-step mathematical derivation, formula boxes, and common trap alerts.

### 6. Study Planner & Revision Vault
- **Adaptive Study Planner**: Manage daily NCERT revision goals with priority tags and deadline dates.
- **High-Yield Revision Notes**: Formula sheets and NCERT summaries with one-click chapter flash quizzes.
- **Performance Analytics**: Real-time projected NEET 2026 score, accuracy tracking, and weak-area diagnostic triggers.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 App Router](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)
- **Confetti FX**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (tested on Node.js v24)
- npm 10+

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/toolifyx9-oss/NeetBuddy.git
   cd NeetBuddy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

5. Build for production:
   ```bash
   npm run build
   npm start
   ```

---

## 📄 License

ISC License.
