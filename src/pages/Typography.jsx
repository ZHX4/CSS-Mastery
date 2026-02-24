import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

function FontStackDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        { text: 'Inter — clean modern UI font', font: 'Inter, sans-serif', size: 16 },
        { text: 'Georgia — classic serif body text', font: 'Georgia, serif', size: 15 },
        { text: 'Fira Code — monospace for code', font: 'Fira Code, monospace', size: 14, color: '#06b6d4' },
        { text: 'System UI — OS native font stack', font: 'system-ui, sans-serif', size: 15 },
      ].map(({ text, font, size, color }) => (
        <div key={text} style={{ fontFamily: font, fontSize: size, color: color || '#e2e8f0', lineHeight: 1.5 }}>
          {text}
        </div>
      ))}
    </div>
  )
}

function TextPropertiesDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
      <p style={{ fontWeight: 300, color: '#8892a4' }}>font-weight: 300 — Light</p>
      <p style={{ fontWeight: 400, color: '#e2e8f0' }}>font-weight: 400 — Regular</p>
      <p style={{ fontWeight: 600, color: '#e2e8f0' }}>font-weight: 600 — Semibold</p>
      <p style={{ fontWeight: 700, color: '#818cf8' }}>font-weight: 700 — Bold</p>
      <p style={{ fontStyle: 'italic', color: '#8892a4' }}>font-style: italic</p>
      <p style={{ textDecoration: 'underline', textDecorationColor: '#6366f1', color: '#e2e8f0' }}>text-decoration: underline + color</p>
      <p style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#8892a4' }}>letter-spacing + uppercase</p>
    </div>
  )
}

function LineHeightDemo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {[
        { lh: 1, label: 'line-height: 1', color: '#ef4444' },
        { lh: 1.8, label: 'line-height: 1.8', color: '#10b981' },
      ].map(({ lh, label, color }) => (
        <div key={lh} style={{ padding: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: `1px solid ${color}40` }}>
          <div style={{ fontSize: 10, color, marginBottom: 6, fontFamily: 'Fira Code, monospace' }}>{label}</div>
          <p style={{ lineHeight: lh, fontSize: 12, color: '#8892a4', margin: 0 }}>
            This text has a {lh === 1 ? 'tight' : 'comfortable'} line height. Notice how it affects readability when the text wraps.
          </p>
        </div>
      ))}
    </div>
  )
}

export default function Typography() {
  return (
    <LessonPage
      icon="✍️"
      title="Typography"
      description="Typography is about making text readable, beautiful, and appropriate for its context. CSS provides fine-grained control over fonts, sizing, spacing, and layout."
      difficulty="Beginner"
    >
      <LessonSection
        title="Font Families & Loading"
        explanation="CSS uses a font stack — a prioritised list of fonts. The browser uses the first one available. Google Fonts and local fonts can be loaded with @font-face or @import."
        code={`/* Font stack: tries each in order until one is found */
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

code {
  font-family: 'Fira Code', 'Cascadia Code', monospace;
}

/* Google Fonts — add to your HTML <head> */
/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"> */

/* @font-face — self-hosted fonts */
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/myfont.woff2') format('woff2');
  font-weight: 100 900; /* variable font range */
  font-display: swap;   /* show fallback while loading */
}`}
        filename="fonts.css"
        demo={<FontStackDemo />}
        tips={[
          'Always end your font stack with a generic family: serif, sans-serif, or monospace.',
          'Use font-display: swap to prevent invisible text during font loading.',
          'Prefer WOFF2 format for self-hosted fonts — best compression and universal browser support.',
        ]}
      />

      <LessonSection
        title="Font Size & Fluid Typography"
        explanation="Avoid fixed pixel sizes for body text. Use rem (relative to root) for accessibility. The clamp() function creates fluid typography that scales between screen sizes without media queries."
        code={`/* rem — scales with user's browser font size setting */
html  { font-size: 16px; } /* 1rem = 16px */
body  { font-size: 1rem; }   /* 16px */
h1    { font-size: 2.25rem; } /* 36px */
small { font-size: 0.75rem; } /* 12px */

/* em — relative to the PARENT's font size */
.parent { font-size: 20px; }
.child  { font-size: 0.9em; } /* 18px */

/* clamp(min, preferred, max) — fluid sizing */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* min: 24px | scales with viewport | max: 48px */
}

p {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
}`}
        filename="font-size.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { size: '2.25rem', label: 'h1 — 2.25rem', color: '#818cf8' },
              { size: '1.5rem', label: 'h2 — 1.5rem', color: '#a5b4fc' },
              { size: '1.125rem', label: 'h3 — 1.125rem', color: '#c7d2fe' },
              { size: '1rem', label: 'body — 1rem', color: '#e2e8f0' },
              { size: '0.875rem', label: 'small — 0.875rem', color: '#8892a4' },
              { size: '0.75rem', label: 'caption — 0.75rem', color: '#4a5568' },
            ].map(({ size, label, color }) => (
              <div key={size} style={{ fontSize: size, color, lineHeight: 1.2 }}>{label}</div>
            ))}
          </div>
        }
        tips={[
          'Never set font-size in px on the <html> element if you want to respect user accessibility preferences.',
          'clamp() eliminates many font-size media queries.',
          'Avoid font sizes below 12px — they become unreadable and fail accessibility audits.',
        ]}
      />

      <LessonSection
        title="Font Weight, Style & Decoration"
        explanation="Weight ranges from 100 (thin) to 900 (black). Variable fonts support any value in between. Decoration includes underline, strikethrough, and more."
        code={`.light    { font-weight: 300; }
.regular  { font-weight: 400; }
.semibold { font-weight: 600; }
.bold     { font-weight: 700; }

/* Italic */
em, .italic { font-style: italic; }

/* Text decoration */
a {
  text-decoration: underline;
  text-decoration-color: #6366f1;
  text-underline-offset: 3px; /* gap between text and line */
}

del { text-decoration: line-through; }

/* Letter & word spacing */
.heading {
  letter-spacing: -0.02em;  /* tighten heading */
}

.label {
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Line & text wrapping */
p {
  line-height: 1.7;
  max-width: 70ch; /* ch = width of "0" character */
  text-wrap: pretty; /* smart hyphenation (modern) */
}`}
        filename="text-style.css"
        demo={<TextPropertiesDemo />}
        tips={[
          'Constrain paragraph width with max-width: 65-75ch for comfortable reading.',
          'Use letter-spacing sparingly — negative values on headings, small positive values on uppercase labels.',
          'text-underline-offset adds breathing room under link underlines, improving clarity.',
        ]}
      />

      <LessonSection
        title="Line Height & Vertical Rhythm"
        explanation="Line height controls the space between lines of text. A value of 1.5–1.8 is ideal for body text. Always use unitless values to avoid inheritance issues."
        code={`/* Use unitless values — relative to element's font-size */
body   { line-height: 1.6; }    /* ✅ inherits correctly */
body   { line-height: 1.6em; }  /* ⚠️ can cause issues */
body   { line-height: 26px; }   /* ❌ breaks scaling */

/* Headings need tighter line height */
h1, h2, h3 {
  line-height: 1.1;
  text-wrap: balance; /* even line lengths (modern) */
}

/* Good vertical rhythm: use multiples of base unit */
:root { --base: 8px; }
h1    { margin-bottom: calc(var(--base) * 3); }
p     { margin-bottom: calc(var(--base) * 2); }
`}
        filename="line-height.css"
        demo={<LineHeightDemo />}
        tips={[
          'Use unitless line-height so it scales proportionally when font-size changes.',
          'text-wrap: balance distributes text evenly across lines in headings.',
          'text-wrap: pretty avoids orphans (single words on a line) in paragraphs.',
        ]}
      />
    </LessonPage>
  )
}
