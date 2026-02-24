import { useState } from 'react'
import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

function ThemeDemo() {
  const [hue, setHue] = useState(240)
  const bg = `hsl(${hue}, 70%, 10%)`
  const primary = `hsl(${hue}, 80%, 65%)`
  const surface = `hsl(${hue}, 30%, 16%)`
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label style={{ fontSize: 11, color: '#8892a4' }}>
        --primary-hue: <strong style={{ color: primary }}>{hue}</strong>
        <input type="range" min={0} max={360} value={hue} onChange={e => setHue(+e.target.value)}
          style={{ marginLeft: 8, width: '60%', accentColor: primary, verticalAlign: 'middle' }} />
      </label>
      <div style={{ background: bg, borderRadius: 10, padding: 12, border: `1px solid ${surface}` }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: primary }} />
          <span style={{ color: primary, fontWeight: 700, fontSize: 13 }}>Live Theme</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['button', 'tag', 'badge'].map(l => (
            <span key={l} style={{ background: primary, color: bg, borderRadius: 5, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Variables() {
  return (
    <LessonPage
      icon="🎨"
      title="CSS Variables"
      description="CSS custom properties (variables) unlock dynamic, maintainable theming directly in CSS. Unlike preprocessor variables, they're live — JavaScript can read and write them at runtime."
      difficulty="Intermediate"
    >
      <LessonSection
        title="Declaring & Using Custom Properties"
        explanation="Custom properties are declared with a -- prefix and accessed via var(). They cascade and inherit like any other CSS property."
        code={`/* Declare on :root to make globally accessible */
:root {
  --color-primary: #6366f1;
  --color-bg: #0a0c14;
  --font-size-base: 1rem;
  --space-4: 1rem;
  --radius: 8px;
}

/* Access with var() — second arg is fallback */
.button {
  background: var(--color-primary);
  padding: var(--space-4);
  border-radius: var(--radius, 4px); /* fallback: 4px */
  font-size: var(--font-size-base);
}

/* Fallback chains */
.card {
  color: var(--card-color, var(--color-text, #fff));
}`}
        filename="variables.css"
        demo={
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { name: '--color-primary', val: '#6366f1', bg: '#6366f1', text: '#fff' },
              { name: '--color-secondary', val: '#06b6d4', bg: '#06b6d4', text: '#fff' },
              { name: '--radius', val: '8px', bg: 'transparent', text: '#8892a4', border: '1px dashed #2d3748' },
              { name: '--space-4', val: '1rem', bg: 'transparent', text: '#8892a4', border: '1px dashed #2d3748' },
            ].map(({ name, val, bg, text, border }) => (
              <div key={name} style={{ background: bg, border, borderRadius: 8, padding: '4px 10px' }}>
                <div style={{ fontSize: 9, color: text, opacity: 0.7, fontFamily: 'Fira Code, monospace' }}>{name}</div>
                <div style={{ fontSize: 11, color: text, fontFamily: 'Fira Code, monospace', fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
        }
        tips={[
          'Custom properties ARE case-sensitive: --Color is different from --color.',
          'The fallback in var() only applies when the property is not defined, not when it\'s invalid.',
          'Custom properties can hold any CSS value, including partial values like calc arguments.',
        ]}
      />

      <LessonSection
        title="Scope & Inheritance"
        explanation="Custom properties obey CSS inheritance. Scoping them to a component element prevents polluting the global namespace."
        code={`/* Each component can override its own scope */
.card {
  --card-bg: #1a1f2e;
  --card-radius: 12px;
  background: var(--card-bg);
  border-radius: var(--card-radius);
}

/* Variants: just override the variable */
.card--featured {
  --card-bg: #2d1458;
  --card-radius: 20px;
}

/* Theming: override at a containing element */
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #0a0c14;
  --color-surface: #f1f5f9;
}

/* Dark theme (default) */
:root {
  --color-bg: #0a0c14;
  --color-text: #e2e8f0;
  --color-surface: #1a1f2e;
}`}
        filename="scope.css"
        demo={
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: '.card', bg: '#1a1f2e', radius: 12, border: '1px solid #2d3748' },
              { label: '.card--featured', bg: '#2d1458', radius: 20, border: '1px solid #6366f1' },
            ].map(({ label, bg, radius, border }) => (
              <div key={label} style={{ background: bg, borderRadius: radius, border, padding: 10 }}>
                <div style={{ fontSize: 9, color: '#8892a4', fontFamily: 'Fira Code, monospace', marginBottom: 6 }}>{label}</div>
                <div style={{ height: 6, background: '#6366f1', borderRadius: 3, marginBottom: 4 }} />
                <div style={{ height: 6, background: '#2d3748', borderRadius: 3 }} />
              </div>
            ))}
          </div>
        }
        tips={[
          'Scope variables to a component class rather than :root when they are only relevant to that component.',
          'This pattern keeps your global variable namespace clean and predictable.',
        ]}
      />

      <LessonSection
        title="Dynamic Theming — Live Demo"
        explanation="Because custom properties live in the CSSOM, JavaScript can read and write them with getPropertyValue() and setProperty()."
        badge="pro"
        code={`/* CSS: define the variable */
:root {
  --hue: 240;
  --primary: hsl(var(--hue), 80%, 65%);
  --bg: hsl(var(--hue), 70%, 10%);
}
.button { background: var(--primary); }

/* JS: change the theme at runtime */
const slider = document.querySelector('#hue');
slider.addEventListener('input', e => {
  document.documentElement.style
    .setProperty('--hue', e.target.value);
});

/* Read a custom property */
const hue = getComputedStyle(document.documentElement)
  .getPropertyValue('--hue');`}
        filename="dynamic-theme.js"
        demo={<ThemeDemo />}
        tips={[
          'Storing a hue value lets you derive an entire palette — primary, surface, bg — from one variable.',
          'hsl() with a CSS variable hue is a powerful one-variable theming pattern.',
          'Use @property to register custom properties with type safety and animation support (CSS Houdini).',
        ]}
      />

      <LessonSection
        title="Using Variables in calc()"
        explanation="CSS variables work seamlessly inside calc(), making spacing systems, fluid sizing, and component math reusable."
        code={`/* Systematic spacing with a base unit */
:root {
  --space-unit: 4px;
}
.sm { padding: calc(var(--space-unit) * 2); }  /* 8px  */
.md { padding: calc(var(--space-unit) * 4); }  /* 16px */
.lg { padding: calc(var(--space-unit) * 8); }  /* 32px */

/* Fluid sidebar with variable override */
:root { --sidebar-width: 260px; }
.sidebar     { width: var(--sidebar-width); }
.main-content {
  margin-left: calc(var(--sidebar-width) + 2rem);
}

/* Breakpoint-driven variable */
@media (max-width: 768px) {
  :root { --sidebar-width: 0px; }
}`}
        filename="calc-vars.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[2, 4, 6, 8].map(mult => (
              <div key={mult} style={{ background: '#1a1f2e', borderRadius: 6, padding: `${mult * 4}px 12px`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: '#8892a4', fontFamily: 'Fira Code, monospace' }}>calc(--unit * {mult})</span>
                <span style={{ fontSize: 10, color: '#6366f1', fontFamily: 'Fira Code, monospace' }}>{mult * 4}px</span>
              </div>
            ))}
          </div>
        }
        tips={[
          'Build a spacing scale by multiplying a single --space-unit variable.',
          'Avoid deeply nested calc() expressions — they become hard to debug.',
          '@property can enforce a number type on a variable, enabling animation via CSS transition.',
        ]}
      />
    </LessonPage>
  )
}
