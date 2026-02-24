# CSS Mastery

A comprehensive, interactive CSS tutorial built with **React + Vite**. Every concept is paired with a live rendered demo, syntax-highlighted code examples, and practical tips — all in a clean dark-themed interface.

## Preview

![CSS Mastery](https://raw.githubusercontent.com/ZHX4/CSS-Mastery/main/public/favicon.svg)

## Features

- **18 lessons** covering CSS from fundamentals to modern features
- **Live demos** — every concept has a rendered, interactive output alongside the code
- **Syntax-highlighted code blocks** with one-click copy (Prism + oneDark theme)
- **Collapsible sidebar** with progress tracking
- **Scroll-to-top** on every navigation
- **Responsive layout** with mobile sidebar support
- **Dark theme** with a consistent design system built on CSS custom properties

## Lessons

### Fundamentals
| # | Lesson | Topics |
|---|--------|--------|
| 1 | **CSS Selectors** | Basic selectors, combinators, specificity, pseudo-classes |
| 2 | **Box Model** | Content/padding/border/margin, box-sizing, margin collapse |
| 3 | **Colors** | Hex, RGB, HSL, gradients, opacity, currentColor |
| 4 | **Typography** | Font families, fluid sizing, line-height, weight, decoration |
| 5 | **Display & Flow** | Block, inline, inline-block, overflow, visibility |

### Layout
| # | Lesson | Topics |
|---|--------|--------|
| 6 | **Flexbox** | Container properties, alignment, flex items, common patterns |
| 7 | **CSS Grid** | Grid basics, line placement, template areas, alignment |
| 8 | **Positioning** | Static/relative/absolute/fixed/sticky, z-index |

### Visual Effects
| # | Lesson | Topics |
|---|--------|--------|
| 9  | **Backgrounds** | Background images, gradient text, box-shadow, backdrop-filter |
| 10 | **Transitions** | Transition property, easing functions, display/height tricks |
| 11 | **Transforms** | 2D/3D transforms, perspective, will-change |
| 12 | **Animations** | @keyframes, staggered animations, prefers-reduced-motion |
| 13 | **Filters & Effects** | CSS filters, mix-blend-mode, clip-path, masking |

### Advanced
| # | Lesson | Topics |
|---|--------|--------|
| 14 | **CSS Variables** | Custom properties, scope, dynamic theming, JavaScript interop |
| 15 | **Pseudo-classes** | Structural, state, pseudo-elements, :is()/:where()/:has() |
| 16 | **Responsive Design** | Media queries, clamp(), fluid layouts, container queries |
| 17 | **Modern CSS** | Nesting, @layer, :has(), logical properties, color-mix(), @property |

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev) | 18.3.1 | UI framework |
| [Vite](https://vitejs.dev) | 5.4.2 | Build tool & dev server |
| [React Router](https://reactrouter.com) | 6.x | Client-side routing |
| [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) | 15.x | Code block syntax highlighting |
| CSS Modules | — | Scoped component styles |

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repository
git clone https://github.com/ZHX4/CSS-Mastery.git
cd CSS-Mastery

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is placed in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
css-mastery/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CodeBlock.jsx        # Syntax-highlighted code block with copy button
│   │   ├── CodeBlock.module.css
│   │   ├── Layout.jsx           # Root layout (sidebar + topbar + content)
│   │   ├── Layout.module.css
│   │   ├── LessonPage.jsx       # Page header wrapper
│   │   ├── LessonPage.module.css
│   │   ├── LessonSection.jsx    # Reusable section (explanation + code + demo + tips)
│   │   ├── LessonSection.module.css
│   │   ├── Sidebar.jsx          # Collapsible nav with progress bar
│   │   └── Sidebar.module.css
│   ├── data/
│   │   └── lessons.js           # Navigation config (18 lessons in 4 groups)
│   ├── pages/
│   │   ├── Home.jsx             # Welcome / curriculum overview
│   │   ├── Selectors.jsx
│   │   ├── BoxModel.jsx
│   │   ├── Colors.jsx
│   │   ├── Typography.jsx
│   │   ├── Display.jsx
│   │   ├── Flexbox.jsx
│   │   ├── Grid.jsx
│   │   ├── Positioning.jsx
│   │   ├── Backgrounds.jsx
│   │   ├── Transitions.jsx
│   │   ├── Transforms.jsx
│   │   ├── Animations.jsx
│   │   ├── Filters.jsx
│   │   ├── Variables.jsx
│   │   ├── Pseudo.jsx
│   │   ├── Responsive.jsx
│   │   ├── Modern.jsx
│   │   └── Lesson.module.css    # Shared demo utility classes
│   ├── App.jsx                  # Router + all 18 routes
│   ├── index.css                # Global reset + CSS design tokens
│   └── main.jsx                 # React entry point
├── index.html
├── vite.config.js
└── package.json
```

## Design System

All design tokens are defined as CSS custom properties in `src/index.css`:

```css
:root {
  --color-primary:   #6366f1;   /* indigo */
  --color-secondary: #06b6d4;   /* cyan */
  --color-success:   #10b981;
  --color-warning:   #f59e0b;
  --color-danger:    #ef4444;
  --color-bg:        #0a0c14;
  --color-surface:   #1a1f2e;
}
```

**Fonts:** [Inter](https://fonts.google.com/specimen/Inter) (UI) + [Fira Code](https://fonts.google.com/specimen/Fira+Code) (monospace)

## License

MIT
