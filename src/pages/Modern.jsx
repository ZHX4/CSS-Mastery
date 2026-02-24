import { useState } from 'react'
import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

function HasDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 11, color: '#8892a4', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
        <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}
          style={{ accentColor: '#6366f1', width: 14, height: 14 }} />
        Toggle: <code style={{ fontFamily: 'Fira Code', color: '#818cf8' }}>.card:has(input:checked)</code>
      </label>
      <div style={{
        background: checked ? 'linear-gradient(135deg, #312e81, #1e3a5f)' : '#1a1f2e',
        border: `2px solid ${checked ? '#6366f1' : '#2d3748'}`,
        borderRadius: 10, padding: 12,
        boxShadow: checked ? '0 0 20px rgba(99,102,241,0.3)' : 'none',
        transition: 'all 300ms ease',
      }}>
        <p style={{ margin: 0, fontSize: 12, color: checked ? '#c7d2fe' : '#4a5568' }}>
          {checked ? '✅ Parent card styled because :has(input:checked) matched!' : 'Card is unstyled — no checked input inside it.'}
        </p>
      </div>
    </div>
  )
}

export default function Modern() {
  return (
    <LessonPage
      icon="✨"
      title="Modern CSS"
      description="CSS has evolved dramatically. Nesting, cascade layers, logical properties, color-mix(), and @property bring language-level features that were previously only possible with preprocessors."
      difficulty="Advanced"
    >
      <LessonSection
        title="CSS Nesting"
        explanation="Native CSS nesting (now supported without a preprocessor) lets you write component styles without repeating the parent selector, similar to Sass."
        badge="modern"
        code={`/* Native CSS nesting — supported in all modern browsers */
.card {
  background: #1a1f2e;
  padding: 1.5rem;
  border-radius: 12px;

  /* Nested selectors — & represents the parent (.card) */
  & .title {
    font-size: 1.25rem;
    color: #e2e8f0;
  }

  &:hover {
    transform: translateY(-2px);
  }

  & .badge {
    background: #6366f1;
    & span { font-size: 0.75rem; }  /* further nesting */
  }

  /* Media query nesting */
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

/* Implicit & (selector starts with element/class) */
.button {
  background: blue;
  :hover & { background: darkblue; }  /* parent hover */
}`}
        filename="nesting.css"
        demo={
          <div style={{ background: '#1a1f2e', borderRadius: 10, padding: 12, border: '1px solid #2d3748' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 600, marginBottom: 4 }}>.card</div>
                <div style={{ background: '#6366f1', borderRadius: 4, display: 'inline-block', padding: '2px 8px' }}>
                  <span style={{ fontSize: 10, color: '#fff' }}>.badge {'>'} span</span>
                </div>
              </div>
              <div style={{ fontSize: 9, color: '#4a5568', fontFamily: 'Fira Code, monospace', textAlign: 'right' }}>
                & .badge<br />& span
              </div>
            </div>
          </div>
        }
        tips={[
          'Native nesting uses & to refer to the parent — it\'s required for combinators and pseudo-classes.',
          'Nesting reduces repetition but can hurt readability if more than 3 levels deep.',
          'Check caniuse.com — CSS Nesting is now supported in Chrome 112+, Firefox 117+, Safari 16.5+.',
        ]}
      />

      <LessonSection
        title="Cascade Layers (@layer)"
        explanation="@layer gives you explicit control over the CSS cascade. Styles in later layers win over earlier ones, regardless of specificity — solving specificity wars."
        badge="modern"
        code={`/* Declare layer order — EARLIER layers have LOWER priority */
@layer reset, base, components, utilities;

/* Assign styles to layers */
@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
}

@layer base {
  h1 { font-size: 2rem; }
  a  { color: blue; }
}

@layer components {
  .btn { background: #6366f1; padding: 0.5rem 1rem; }
}

/* Utilities always win — highest priority */
@layer utilities {
  .mt-0 { margin-top: 0 !important; }
  .hidden { display: none; }
}

/* Import a library into a layer (contained specificity) */
@import url('bootstrap.css') layer(bootstrap);`}
        filename="layers.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['reset', 'base', 'components', 'utilities'].map((layer, i) => (
              <div key={layer} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 24, background: `rgba(99,102,241,${0.15 + i * 0.2})`, border: `1px solid rgba(99,102,241,${0.3 + i * 0.2})`, borderRadius: 5, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                  <code style={{ fontSize: 10, color: '#818cf8', fontFamily: 'Fira Code, monospace' }}>@layer {layer}</code>
                </div>
                <span style={{ fontSize: 9, color: '#4a5568', width: 80 }}>priority {i + 1}</span>
              </div>
            ))}
          </div>
        }
        tips={[
          'Layers are declared in order — later-declared layers win. Declare the order explicitly at the top.',
          'Third-party styles imported into a @layer can never override your unlayered styles.',
          'Unlayered styles always beat layered styles, regardless of specificity.',
        ]}
      />

      <LessonSection
        title=":has() — The Parent Selector"
        explanation=":has() lets you style a parent element based on its children or subsequent siblings. It was previously impossible in pure CSS."
        badge="modern"
        code={`/* Style a form-group when its input is invalid */
.form-group:has(input:invalid) label {
  color: #ef4444;
}
.form-group:has(input:invalid) .hint {
  display: block;
}

/* Card layout changes when it contains an image */
.card:has(> img:first-child) {
  padding-top: 0;
}

/* Navigation with open submenu */
.nav-item:has(.submenu:hover) > .nav-link {
  color: #6366f1;
}

/* Sibling-based (! operator not needed) */
h2:has(+ p) { margin-bottom: 0.25em; }

/* Quantity queries */
ul:has(li:nth-child(10)) {  /* if 10+ items… */
  font-size: 0.85rem;
  columns: 2;
}`}
        filename="has-selector.css"
        demo={<HasDemo />}
        tips={[
          ':has() now has broad browser support (Chrome/Edge 105+, Safari 15.4+, Firefox 121+).',
          ':has() accepts a relative selector list — it\'s checking for descendants matching that selector.',
          'Avoid deeply nested :has() chains — they can be expensive for the browser to evaluate.',
        ]}
      />

      <LessonSection
        title="Logical Properties"
        explanation="Logical properties replace directional terms (left/right/top/bottom) with start/end/inline/block — enabling automatic RTL and writing-mode support."
        badge="modern"
        code={`/* Physical → Logical property equivalents */
margin-top    → margin-block-start
margin-bottom → margin-block-end
margin-left   → margin-inline-start
margin-right  → margin-inline-end
padding-left  → padding-inline-start

/* Shorthand logical properties */
margin-inline:  auto;          /* left + right */
margin-block:   1rem 2rem;     /* top + bottom */
padding-inline: 1rem;          /* left + right */
padding-block:  0.5rem 1rem;   /* top + bottom */

inset-inline-start: 0;  /* replaces left: 0 */
inset-block-start:  0;  /* replaces top: 0 */
inset: 0;               /* shorthand for all four sides */

/* Borders */
border-inline: 1px solid #6366f1;  /* left + right border */
border-block-end: 1px solid #2d3748; /* bottom border */

/* Dimensions */
inline-size:     400px;   /* width */
block-size:      200px;   /* height */
min-inline-size: 200px;   /* min-width */`}
        filename="logical.css"
        demo={
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { physical: 'margin-left', logical: 'margin-inline-start' },
              { physical: 'padding-top', logical: 'padding-block-start' },
              { physical: 'width', logical: 'inline-size' },
              { physical: 'border-bottom', logical: 'border-block-end' },
            ].map(({ physical, logical }) => (
              <div key={physical} style={{ background: '#1a1f2e', borderRadius: 6, padding: '5px 8px' }}>
                <div style={{ fontSize: 9, color: '#ef4444', fontFamily: 'Fira Code, monospace', textDecoration: 'line-through' }}>{physical}</div>
                <div style={{ fontSize: 9, color: '#10b981', fontFamily: 'Fira Code, monospace' }}>{logical}</div>
              </div>
            ))}
          </div>
        }
        tips={[
          'Use logical properties in new projects — they are now widely supported.',
          'They automatically flip left/right for RTL languages when dir="rtl" or writing-mode changes.',
          'Logical shorthands (padding-inline, margin-block) are especially clean.',
        ]}
      />

      <LessonSection
        title="color-mix() & @property"
        explanation="color-mix() blends two colors in CSS. @property registers a custom property with a type, enabling animations on color variables and numeric values."
        badge="modern"
        code={`/* color-mix(in colorspace, color1 amount, color2 amount) */
.mixed-50  { color: color-mix(in srgb, #6366f1, #06b6d4); }
.mixed-30  { color: color-mix(in srgb, #6366f1 30%, #06b6d4); }
.tinted    { color: color-mix(in srgb, #6366f1 80%, transparent); }

/* Mix with currentColor for automatic tinting */
.badge { background: color-mix(in srgb, currentColor 15%, transparent); }

/* @property — typed custom properties (CSS Houdini) */
@property --progress {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

/* Now --progress can be animated! */
.loader {
  --progress: 0;
  width: calc(var(--progress) * 1%);
  transition: --progress 500ms ease;
}
.loader.loaded { --progress: 100; }

/* Animate a gradient via @property */
@property --hue {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
.spinning-gradient {
  background: hsl(var(--hue), 80%, 60%);
  animation: spin-hue 3s linear infinite;
}
@keyframes spin-hue {
  to { --hue: 360deg; }
}`}
        filename="modern-color.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, color: '#8892a4' }}>color-mix:</span>
              {[100, 75, 50, 25, 10].map(pct => (
                <div key={pct} style={{ width: 32, height: 32, borderRadius: 6, background: `color-mix(in srgb, #6366f1 ${pct}%, #06b6d4 ${100 - pct}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>{pct}%</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#1a1f2e', borderRadius: 8, padding: 8 }}>
              <div style={{ fontSize: 9, color: '#6366f1', fontFamily: 'Fira Code, monospace', marginBottom: 4 }}>@property --hue animation</div>
              <div style={{ height: 16, borderRadius: 8, background: 'linear-gradient(90deg, hsl(240,80%,60%), hsl(280,80%,60%), hsl(320,80%,60%), hsl(0,80%,60%), hsl(40,80%,60%), hsl(80,80%,60%), hsl(120,80%,60%), hsl(160,80%,60%), hsl(200,80%,60%), hsl(240,80%,60%))' }} />
            </div>
          </div>
        }
        tips={[
          'color-mix() is now supported in all major browsers (Chrome 111+, Firefox 113+, Safari 16.2+).',
          '@property is Chrome/Edge-only for now — use it as progressive enhancement.',
          '@property enables CSS-only gradient animations that were previously JavaScript-only.',
        ]}
      />
    </LessonPage>
  )
}
