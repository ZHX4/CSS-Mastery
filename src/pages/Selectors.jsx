import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'
import styles from './Lesson.module.css'

/* ── Demo components ───────────────────────────────── */
function BasicSelectorsDemo() {
  return (
    <div className={styles.demoStack}>
      <p style={{ color: '#e2e8f0' }}>Element selector: <code>p</code></p>
      <p className="highlight-demo" style={{ color: '#818cf8', fontWeight: 600 }}>
        Class selector: <code>.highlight</code>
      </p>
      <p id="unique-demo" style={{ color: '#06b6d4', fontStyle: 'italic' }}>
        ID selector: <code>#unique</code>
      </p>
      <a href="#" style={{ color: '#f59e0b' }} onClick={e => e.preventDefault()}>
        Attribute selector: <code>a[href]</code>
      </a>
    </div>
  )
}

function CombinatorDemo() {
  return (
    <div className={styles.demoStack}>
      <div style={{ padding: '8px 12px', background: 'rgba(99,102,241,0.1)', borderRadius: 8, fontSize: 14 }}>
        <span style={{ color: '#8892a4', fontSize: 12, display: 'block', marginBottom: 4 }}>Descendant (div p)</span>
        <div>
          <p style={{ color: '#818cf8', margin: 0 }}>I'm a &lt;p&gt; inside &lt;div&gt;</p>
        </div>
      </div>
      <div style={{ padding: '8px 12px', background: 'rgba(6,182,212,0.1)', borderRadius: 8, fontSize: 14 }}>
        <span style={{ color: '#8892a4', fontSize: 12, display: 'block', marginBottom: 4 }}>Child (div &gt; p)</span>
        <div>
          <p style={{ color: '#06b6d4', margin: 0 }}>Direct child only</p>
          <div><p style={{ color: '#4a5568', margin: '4px 0 0' }}>Nested child — not matched</p></div>
        </div>
      </div>
    </div>
  )
}

function SpecificityDemo() {
  return (
    <div className={styles.demoStack}>
      {[
        { sel: '* { }', score: '(0,0,0)', color: '#4a5568' },
        { sel: 'p { }', score: '(0,0,1)', color: '#8892a4' },
        { sel: '.class { }', score: '(0,1,0)', color: '#818cf8' },
        { sel: '#id { }', score: '(1,0,0)', color: '#06b6d4' },
        { sel: 'style=""', score: '(1,0,0,0)', color: '#f59e0b' },
        { sel: '!important', score: 'Wins always', color: '#ef4444' },
      ].map(({ sel, score, color }) => (
        <div key={sel} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
          <code style={{ color, fontFamily: 'Fira Code, monospace' }}>{sel}</code>
          <span style={{ color: '#8892a4', fontFamily: 'Fira Code, monospace' }}>{score}</span>
        </div>
      ))}
    </div>
  )
}

export default function Selectors() {
  return (
    <LessonPage
      icon="🎯"
      title="CSS Selectors"
      description="Selectors are patterns that tell the browser which HTML elements to style. Mastering them is the foundation of every CSS project."
      difficulty="Beginner"
    >
      <LessonSection
        title="Basic Selectors"
        explanation="CSS provides several fundamental selectors: element (tag), class, ID, and attribute selectors. Each targets elements in a different way."
        code={`/* Element selector — targets all <p> tags */
p {
  color: #e2e8f0;
  line-height: 1.6;
}

/* Class selector — targets elements with class="highlight" */
.highlight {
  color: #818cf8;
  font-weight: 600;
}

/* ID selector — targets a single unique element */
#unique {
  color: #06b6d4;
  font-style: italic;
}

/* Attribute selector — targets <a> with an href */
a[href] {
  color: #f59e0b;
  text-decoration: underline;
}`}
        filename="selectors-basic.css"
        demo={<BasicSelectorsDemo />}
        tips={[
          'Prefer classes over IDs for styling — IDs are too specific and harder to override.',
          'Attribute selectors like [type="email"] are great for styling form inputs without extra classes.',
          'Element selectors are best for global resets or base typography styles.',
        ]}
      />

      <LessonSection
        title="Combinators"
        explanation="Combinators define relationships between selectors. The four combinators are: descendant (space), child (>), adjacent sibling (+), and general sibling (~)."
        code={`/* Descendant — any <p> inside a <div> (any depth) */
div p { color: #818cf8; }

/* Child — only direct <p> children of <div> */
div > p { color: #06b6d4; }

/* Adjacent sibling — <p> immediately after an <h2> */
h2 + p {
  font-size: 1.125rem;
  color: #a5b4fc;
}

/* General sibling — all <p> after an <h2> in same parent */
h2 ~ p { color: #94a3b8; }`}
        filename="selectors-combinators.css"
        demo={<CombinatorDemo />}
        tips={[
          'Use the child combinator (>) instead of the descendant (space) when you only want to target direct children — it avoids unintended deep matches.',
          'The adjacent sibling (+) is useful for styling the first paragraph after a heading.',
        ]}
      />

      <LessonSection
        title="Specificity"
        explanation="When multiple rules target the same element, the browser picks the winner using specificity — a scoring system based on selector type. Higher score wins."
        code={`/*  Specificity: (inline, IDs, classes, elements) */

/* (0,0,0) — universal selector */
* { box-sizing: border-box; }

/* (0,0,1) — element */
p { color: gray; }

/* (0,1,0) — class */
.text { color: blue; }

/* (1,0,0) — ID overrides class */
#intro { color: cyan; }

/* Inline style beats all normal rules */
/* <p style="color: orange"> */

/* !important — use sparingly, last resort only */
.override { color: red !important; }`}
        filename="specificity.css"
        demo={<SpecificityDemo />}
        tips={[
          'Avoid !important in application styles — it creates specificity wars that are hard to debug.',
          'Keep specificity low and flat; use BEM or CSS Modules to scope styles by default.',
          'The :is() and :where() pseudo-classes help write complex selectors with controlled specificity.',
          '!important in user agent or accessibility stylesheets is intentional and appropriate.',
        ]}
      />

      <LessonSection
        title="Pseudo-class & Pseudo-element Quick Reference"
        subtitle="Preview — covered in depth in the Pseudo-classes lesson"
        explanation="Pseudo-classes target elements in a specific state. Pseudo-elements target a part of an element."
        code={`/* Pseudo-classes */
a:hover   { color: #818cf8; }       /* mouse over */
a:focus   { outline: 2px solid #818cf8; } /* keyboard focus */
li:first-child { font-weight: bold; }
li:nth-child(2n) { background: #1a1d27; } /* even rows */

/* Pseudo-elements */
p::first-line { color: #818cf8; }   /* first line of text */
p::before {
  content: "→ ";
  color: #06b6d4;
}
p::after {
  content: " ✓";
  color: #10b981;
}`}
        filename="pseudo-quick.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['hover me', 'second item', 'third item'].map((t, i) => (
              <div key={i} style={{
                padding: '6px 12px',
                borderRadius: 6,
                background: i % 2 === 0 ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)',
                fontSize: 13,
                color: i === 0 ? '#818cf8' : '#8892a4',
                cursor: 'default',
              }}>
                {i === 0 && '→ '}{t}{i === 2 && ' ✓'}
              </div>
            ))}
          </div>
        }
        tips={[
          'Always include :focus styles for keyboard accessibility — never just :hover.',
          '::before and ::after require content: "" to be rendered, even if visually hidden.',
        ]}
      />
    </LessonPage>
  )
}
