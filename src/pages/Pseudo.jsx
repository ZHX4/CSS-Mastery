import { useState } from 'react'
import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

function NthChildDemo() {
  const [n, setN] = useState(2)
  const items = Array.from({ length: 8 }, (_, i) => i + 1)
  const highlighted = items.filter(i => i % n === 0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 11, color: '#8892a4' }}>
        n = <strong>{n}</strong> — <code style={{ fontFamily: 'Fira Code', color: '#818cf8' }}>:nth-child({n}n)</code>
        <input type="range" min={1} max={4} value={n} onChange={e => setN(+e.target.value)}
          style={{ marginLeft: 8, width: '50%', accentColor: '#6366f1', verticalAlign: 'middle' }} />
      </label>
      <div style={{ display: 'flex', gap: 5 }}>
        {items.map(i => (
          <div key={i} style={{
            width: 32, height: 32, borderRadius: 7,
            background: highlighted.includes(i) ? '#6366f1' : '#1a1f2e',
            border: `2px solid ${highlighted.includes(i) ? '#818cf8' : '#2d3748'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: highlighted.includes(i) ? '#fff' : '#4a5568',
            fontWeight: 700, transition: 'all 200ms',
          }}>{i}</div>
        ))}
      </div>
    </div>
  )
}

export default function Pseudo() {
  return (
    <LessonPage
      icon="🔵"
      title="Pseudo-classes & Pseudo-elements"
      description="Pseudo-classes target elements in a particular state (:hover, :focus). Pseudo-elements create virtual sub-parts of elements (::before, ::after). Together they unlock rich interactive CSS without extra markup."
      difficulty="Intermediate"
    >
      <LessonSection
        title="Structural Pseudo-classes"
        explanation="Structural pseudo-classes select elements based on their position in the DOM — no class names required."
        code={`:first-child   { color: gold; }     /* first sibling */
:last-child    { color: coral; }    /* last sibling */
:only-child    { color: teal; }     /* no siblings */

/* nth-child — powerful pattern matching */
:nth-child(2)     { }  /* exactly the 2nd child */
:nth-child(2n)    { }  /* every EVEN child (2,4,6…) */
:nth-child(2n+1)  { }  /* every ODD child (1,3,5…) */
:nth-child(3n)    { }  /* every 3rd child */
:nth-child(-n+3)  { }  /* first 3 children */
:nth-child(n+4)   { }  /* from 4th onwards */

/* Type-based variants */
:first-of-type, :last-of-type, :nth-of-type(2n) { }

/* Negation */
li:not(:last-child) { border-bottom: 1px solid #eee; }

/* Quantity queries */
li:nth-last-child(n+4) { font-size: 0.9em; } /* if 4+ items, shrink */`}
        filename="structural.css"
        demo={<NthChildDemo />}
        tips={[
          ':nth-child(An+B) — A is the cycle size, B is the offset. Example: 3n+1 → 1, 4, 7, 10…',
          ':not() accepts any simple selector as of CSS Selectors Level 4, including :not(.foo, .bar).',
          'Prefer :nth-child over manually adding first/last classes to your markup.',
        ]}
      />

      <LessonSection
        title="State Pseudo-classes"
        explanation="State pseudo-classes react to user interaction, form state, and browser features."
        code={`/* Pointer interactions */
a:hover   { color: #6366f1; }
a:active  { opacity: 0.7; }  /* while clicking */
a:visited { color: #818cf8; }

/* Keyboard focus — never remove! */
:focus { outline: 2px solid #6366f1; outline-offset: 3px; }
:focus-visible { /* only keyboard focus, not mouse click */
  outline: 2px solid #6366f1;
}
/* Remove default only when replacing with custom style */
:focus:not(:focus-visible) { outline: none; }

/* Form states */
input:valid     { border-color: #10b981; }
input:invalid   { border-color: #ef4444; }
input:required  { border-left: 3px solid #f59e0b; }
input:disabled  { opacity: 0.5; cursor: not-allowed; }
input:checked + label { color: #6366f1; }
input:placeholder-shown { background: #f9fafb; }

/* :has() — parent selector */
.form-group:has(input:invalid) label { color: #ef4444; }
.card:has(img) { padding-top: 0; }  /* card has an image? */`}
        filename="state.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: ':hover', style: { background: '#1a1f2e', padding: '6px 12px', borderRadius: 6, border: '1px solid #6366f1', cursor: 'pointer' } },
              { label: ':focus', style: { background: '#1a1f2e', padding: '6px 12px', borderRadius: 6, outline: '2px solid #818cf8', outlineOffset: 2 } },
              { label: ':disabled', style: { background: '#1a1f2e', padding: '6px 12px', borderRadius: 6, opacity: 0.4, cursor: 'not-allowed', border: '1px solid #2d3748' } },
              { label: ':valid', style: { background: '#1a1f2e', padding: '6px 12px', borderRadius: 6, border: '1px solid #10b981' } },
              { label: ':invalid', style: { background: '#1a1f2e', padding: '6px 12px', borderRadius: 6, border: '1px solid #ef4444' } },
            ].map(({ label, style }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 100, fontSize: 11, color: '#8892a4', fontFamily: 'Fira Code, monospace' }}>{label}</span>
                <div style={style}><span style={{ fontSize: 11, color: '#e2e8f0' }}>element</span></div>
              </div>
            ))}
          </div>
        }
        tips={[
          'Always provide a visible :focus style — removing it harms keyboard accessibility.',
          ':focus-visible is a modern improvement — it shows focus rings for keyboard users only.',
          ':has() is now supported in all major browsers and enables powerful parent-aware styling.',
        ]}
      />

      <LessonSection
        title="Pseudo-elements"
        explanation="Pseudo-elements create virtual child nodes that can be styled with CSS, enabling decorative effects without extra HTML elements."
        code={`/* Generated content */
.required::after {
  content: ' *';
  color: red;
}

.blockquote::before {
  content: '"';
  font-size: 4rem;
  color: #6366f1;
  line-height: 0;
  vertical-align: -1rem;
}

/* Decorative ::before / ::after */
.underline-hover {
  position: relative;
}
.underline-hover::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 2px;
  background: #6366f1;
  transition: width 300ms ease;
}
.underline-hover:hover::after { width: 100%; }

/* ::placeholder, ::selection */
input::placeholder { color: #4a5568; font-style: italic; }
::selection { background: #6366f1; color: white; }`}
        filename="pseudo-elements.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ margin: 0, fontSize: 13, color: '#e2e8f0' }}>
              <span style={{ fontSize: 32, color: '#6366f1', lineHeight: 0, verticalAlign: '-0.6rem', fontFamily: 'serif' }}>"</span>
              {' '}A simulated ::before quote decoration
            </p>
            <a href="#" style={{ position: 'relative', color: '#818cf8', textDecoration: 'none', fontSize: 13, paddingBottom: 2, display: 'inline-block' }}
              onMouseEnter={e => { const el = e.currentTarget.querySelector('.ul'); if (el) el.style.width = '100%' }}
              onMouseLeave={e => { const el = e.currentTarget.querySelector('.ul'); if (el) el.style.width = '0' }}>
              Hover for underline effect
              <span className="ul" style={{ position: 'absolute', bottom: 0, left: 0, height: 2, width: 0, background: '#6366f1', transition: 'width 300ms ease', display: 'block' }} />
            </a>
          </div>
        }
        tips={[
          '::before and ::after require content: "" even if they display nothing — it activates the pseudo-element.',
          'Never rely on ::before/::after for meaningful content — screen readers may not read it.',
          '::selection styles only work for color, background, and a few text properties.',
        ]}
      />

      <LessonSection
        title=":is(), :where(), :has()"
        explanation="Modern CSS provides powerful selector grouping and relational selectors. :is() and :where() simplify complex selector lists. :has() selects a parent based on its children."
        badge="modern"
        code={`/* :is() — group selectors, uses highest specificity in list */
:is(h1, h2, h3) a { color: inherit; }
:is(article, section, aside) p { line-height: 1.7; }

/* :where() — same as :is() but ZERO specificity */
:where(h1, h2, h3) { font-weight: 700; }  /* easy to override */

/* :has() — parent selector (game changer!) */
/* Select a form-group that contains an invalid input */
.form-group:has(input:invalid) {
  --border-color: #ef4444;
}
/* Style a card differently when it has an image */
.card:has(> img:first-child) { padding-top: 0; }
/* Select items following a checked radio */
input[type="radio"]:checked + label { color: #6366f1; }
/* Quantity queries */
ul:has(li:nth-child(5)) li { font-size: 0.85rem; }  /* 5+ items?`}
        filename="modern-selectors.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { sel: ':is(h1,h2,h3) a', note: 'specificity = h1/h2/h3' },
              { sel: ':where(h1,h2,h3)', note: 'specificity = 0' },
              { sel: '.card:has(> img)', note: 'parent selector' },
              { sel: 'ul:has(li:nth-child(5))', note: 'quantity query' },
            ].map(({ sel, note }) => (
              <div key={sel} style={{ background: '#1a1f2e', borderRadius: 6, padding: '5px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <code style={{ fontSize: 10, color: '#818cf8', fontFamily: 'Fira Code, monospace' }}>{sel}</code>
                <span style={{ fontSize: 10, color: '#4a5568' }}>{note}</span>
              </div>
            ))}
          </div>
        }
        tips={[
          ':where() is great for resets and base styles because its zero specificity is easy to override.',
          ':has() is now supported in Chrome, Edge, Safari and Firefox. Check caniuse.com for exact versions.',
          ':is() raises specificity to the most specific selector in its argument list.',
        ]}
      />
    </LessonPage>
  )
}
