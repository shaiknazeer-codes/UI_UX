# Kestrel — Keyboard-First Command Center for Product Teams

A production-quality marketing website for **Kestrel**, an ultra-fast, keyboard-driven command center for high-velocity product teams to plan, build, and ship without mouse friction.

Designed with inspiration from **Linear** (minimalist structure, real code mockups, changelog, dense footer), **Raycast** (interactive ⌘K command palette, on-screen keyboard feedback, ambient glows), and **Framer** (cursor-following spotlight, sliding tab indicators, micro-interactions).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, JavaScript only)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 with `@theme inline` tokens
- **Animations**: `framer-motion` (v12)
- **Icons**: `lucide-react`
- **Data**: Static mock datasets in `/data` (no backend, database, or external auth required)

---

## 📐 Architecture & Key Implementation Decisions

### 1. State Handling & Data Flow
- **Data in `/data`**: All domain models (commands, features, workflows, key bindings, integrations, changelog, testimonials, pricing, and navigation) are colocated in pure JavaScript files.
- **Client-Side State**: Kept local and minimal with React standard hooks (`useState`, `useEffect`, `useRef`).
- **Interactive ⌘K Engine**: Listens globally for `⌘K` or `Ctrl+K` key chords to scroll and focus the palette. Supports live query filtering, category filters, keyboard arrow-key navigation (`ArrowUp`/`ArrowDown`), and `Enter` execution feedback with an animated toast banner.
- **Workflow State Machine**: Plan / Build / Ship views with `AnimatePresence mode="wait"`, interactive issue selection, and a simulated one-click canary rollout trigger.
- **Real-Time Keyboard Matrix**: Global keyup/keydown listeners capture physical key presses, highlight on-screen keycaps with hardware-style glowing rings, and display their mapped actions in real time.

### 2. Theming Architecture
- **Zero Flash of Unstyled Content (FOUC)**: An inline script in `<head>` immediately inspects `localStorage.getItem('kestrel-theme')` and falls back to `window.matchMedia('(prefers-color-scheme: dark)')` before the initial DOM paint.
- **CSS Variables + Tailwind v4**: Defined via standard CSS variables (`--bg`, `--fg`, `--muted`, `--line`, `--card`, `--accent`, `--glow`) and exposed directly to Tailwind via `@theme inline`.
  - **Dark Mode**: Near-black OLED-friendly background (`#090a0f`) with soft indigo ambient glows.
  - **Light Mode**: Off-white canvas (`#f8f9fa`) with crisp high-contrast slate typography (`#090a0f`).
  - **Indigo Accent**: `#6366f1` throughout both themes for unified brand identity.
- **Theme Persistence**: Synced to `localStorage` and toggled via the persistent navbar button.

### 3. Motion & Micro-Interactions
- **Cursor Spotlight**: Bento grid cards calculate dynamic radial gradients based on real-time mouse coordinates `(mouseX, mouseY)` for a glowing spotlight effect.
- **Sliding Tab Indicators**: Framer-style `layoutId="activeWorkflowIndicator"` seamlessly animates pill transitions across Plan, Build, and Ship tabs.
- **Reduced Motion Friendly**: Motion components respect user accessibility preferences (`prefers-reduced-motion`).

### 4. Responsive & Accessible (A11y)
- **Mobile-First Breakpoints**: Tested and verified across 375px (Mobile), 768px (Tablet), 1024px (Laptop), and 1440px (Desktop) with zero horizontal overflow.
- **Keyboard Navigation**:
  - Full keyboard control across dropdowns (Arrow keys, Escape, Enter).
  - Modal focus trap cycling (`Tab` / `Shift+Tab`) and background scroll lock (`document.body.style.overflow = 'hidden'`).
  - Strict semantic HTML and ARIA attributes (`role="dialog"`, `role="tablist"`, `role="listbox"`, `aria-modal="true"`, `aria-selected`, `aria-expanded`).
  - High-visibility focus indicators via `:focus-visible` styling.

---

## 🤖 How AI Was Used

1. **Architecture Planning**: Synthesized design aesthetics from Linear, Raycast, and Framer into an original, unified component hierarchy and tokenized color system.
2. **Component Implementation**: Generated small, focused, single-responsibility components in `/components` following strict JavaScript guidelines (no TypeScript, no semicolons, `@/` imports).
3. **Automated Verification**: Created a headless browser verification script (`scripts/verify-and-screenshot.mjs`) using `puppeteer-core` to test 4 responsive viewports, ensure zero console errors, verify all anchor link targets, and generate screenshots.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.18+ (tested on Node.js v24.16.0)
- npm 9+

### Installation & Run

```bash
# 1. Clone repository
git clone <your-repo-url>
cd <repo-folder>

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
# Build the optimized production bundle
npm run build

# Start the production server
npm start
```

---

## 🌐 Deploy to Vercel

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for Kestrel marketing website"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com).
3. Click **Add New Project** and import your GitHub repository.
4. Framework preset will automatically detect **Next.js**.
5. Click **Deploy**. No custom environment variables or build configurations required.

---

## 📸 Screenshots

- Desktop View: [`screenshots/desktop.png`](./screenshots/desktop.png)
- Desktop Light Mode: [`screenshots/desktop-light.png`](./screenshots/desktop-light.png)
- Mobile View: [`screenshots/mobile.png`](./screenshots/mobile.png)

---

## 📄 License
MIT © Kestrel Technologies Inc.

