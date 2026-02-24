import { useState } from 'react'
import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

function BreakpointDemo() {
  const [width, setWidth] = useState(900)
  const bp = width < 480 ? 'mobile' : width < 768 ? 'tablet' : width < 1024 ? 'laptop' : 'desktop'
  const cols = { mobile: 1, tablet: 2, laptop: 3, desktop: 4 }[bp]
  const colors = { mobile: '#ef4444', tablet: '#f59e0b', laptop: '#10b981', desktop: '#6366f1' }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label style={{ fontSize: 11, color: '#8892a4' }}>
        Simulated width: <strong style={{ color: colors[bp] }}>{width}px</strong> — <code style={{ fontFamily: 'Fira Code', color: colors[bp] }}>{bp}</code>
        <input type="range" min={300} max={1280} value={width} onChange={e => setWidth(+e.target.value)}
          style={{ marginLeft: 8, width: '55%', accentColor: colors[bp], verticalAlign: 'middle' }} />
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 6, transition: 'all 200ms' }}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} style={{ height: 36, background: colors[bp] + '30', border: `1px solid ${colors[bp]}`, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, color: colors[bp], fontFamily: 'Fira Code, monospace' }}>col {i + 1}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['<480px', '480–768px', '768–1024px', '>1024px'].map((label, i) => {
          const c = ['#ef4444', '#f59e0b', '#10b981', '#6366f1'][i]
          return <span key={label} style={{ fontSize: 9, color: c, fontFamily: 'Fira Code, monospace', padding: '2px 6px', border: `1px solid ${c}`, borderRadius: 4 }}>{label}</span>
        })}
      </div>
    </div>
  )
}

export default function Responsive() {
  return (
    <LessonPage
      icon="📱"
      title="Responsive Design"
      description="Responsive design means building layouts that adapt gracefully to any screen size. The modern toolkit — fluid units, clamp(), media queries, and container queries — makes single-source-of-truth CSS possible."
      difficulty="Intermediate"
    >
      <LessonSection
        title="Media Queries"
        explanation="Media queries apply CSS conditionally based on device characteristics. The mobile-first approach uses min-width — start small, add complexity as the screen grows."
        code={`/* Viewport width breakpoints (mobile-first) */
/* Base styles: mobile */
.grid { grid-template-columns: 1fr; }

@media (min-width: 480px) {   /* small tablets */
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 768px) {   /* tablets */
  .grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1024px) {  /* laptops */
  .grid { grid-template-columns: repeat(4, 1fr); }
}

/* Range syntax (modern — CSS Media Queries Level 4) */
@media (480px <= width < 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Non-width queries */
@media (orientation: landscape) { }
@media (prefers-color-scheme: dark) { }
@media (prefers-reduced-motion: reduce) { }
@media (hover: none) { }          /* touch devices */
@media print { * { color: black; } }

/* Logical operators */
@media (min-width: 768px) and (max-width: 1024px) { }`}
        filename="media-queries.css"
        demo={<BreakpointDemo />}
        tips={[
          'Mobile-first (min-width) is preferred — base styles are simplest and then you enhance.',
          'Avoid device-specific breakpoints (768px = iPad) — use content-driven breakpoints instead.',
          'The new range syntax (@media (480px <= width < 768px)) is cleaner but check browser support.',
        ]}
      />

      <LessonSection
        title="Fluid Sizing with clamp()"
        explanation="clamp(min, preferred, max) creates values that scale with the viewport, eliminating the need for multiple breakpoints for typography and spacing."
        code={`/* font-size that scales from 14px (mobile) to 20px (desktop) */
/* clamp(minimum, preferred, maximum) */
h1 { font-size: clamp(1.25rem, 4vw, 2.5rem); }
p  { font-size: clamp(0.875rem, 2vw, 1.125rem); }

/* Fluid spacing */
.section {
  padding-block: clamp(2rem, 8vw, 6rem);
}

/* Fluid grid column sizing */
.auto-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
}

/* viewport units */
.hero { height: 100svh; } /* svh = small viewport height (mobile-safe) */
.full { width: 100vw; }

/* ch unit — based on character width */
p { max-width: 65ch; }  /* ~optimal reading line length */`}
        filename="fluid.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'clamp(1.25rem, 4vw, 2.5rem)', size: 'clamp(1.25rem, 4vw, 2.5rem)', text: 'Fluid Heading' },
              { label: 'clamp(0.875rem, 2vw, 1.125rem)', size: 'clamp(0.875rem, 2vw, 1.125rem)', text: 'Fluid body text that scales smoothly with the viewport without any media queries.' },
            ].map(({ label, size, text }) => (
              <div key={label} style={{ background: '#1a1f2e', borderRadius: 8, padding: 10 }}>
                <div style={{ fontSize: 9, color: '#6366f1', fontFamily: 'Fira Code, monospace', marginBottom: 4 }}>{label}</div>
                <p style={{ margin: 0, fontSize: size, color: '#e2e8f0' }}>{text}</p>
              </div>
            ))}
          </div>
        }
        tips={[
          'clamp() eliminates many breakpoint-specific font-size declarations.',
          'Use svh (small viewport height) instead of vh for mobile to avoid address bar issues.',
          'max-width: 65ch on paragraphs ensures optimal reading line length across screen sizes.',
        ]}
      />

      <LessonSection
        title="Container Queries"
        explanation="Container queries apply styles based on the parent container's size, not the viewport. This enables truly component-driven responsive design."
        badge="modern"
        code={`/* 1. Define a containment context */
.card-wrapper {
  container-type: inline-size;
  container-name: card; /* optional — for named queries */
}

/* 2. Query the container's size */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

/* Named container query */
@container card (min-width: 600px) {
  .card__title { font-size: 1.5rem; }
}

/* Container query units */
.card__img {
  width: 50cqi;  /* 50% of container inline size */
  height: 20cqb; /* 20% of container block size */
}

/* Combine with CSS variables for compound components */
@container (width < 300px) {
  .price { font-size: 0.875rem; }
}`}
        filename="container-queries.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[180, 280, 400].map(w => (
              <div key={w} style={{ width: w, background: '#1a1f2e', borderRadius: 8, overflow: 'hidden', border: '1px solid #2d3748' }}>
                <div style={{ display: w >= 400 ? 'grid' : 'flex', gridTemplateColumns: w >= 400 ? '80px 1fr' : undefined, flexDirection: w >= 400 ? undefined : 'column' }}>
                  <div style={{ height: w >= 400 ? 'auto' : 50, minWidth: w >= 400 ? 80 : undefined, background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }} />
                  <div style={{ padding: 8 }}>
                    <div style={{ fontSize: w >= 280 ? 12 : 10, color: '#e2e8f0', fontWeight: 600 }}>Card at {w}px</div>
                    <div style={{ fontSize: 9, color: '#4a5568', marginTop: 2 }}>container-type: inline-size</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
        tips={[
          'container-queries allow a component to be responsive to where it is placed, not the viewport.',
          'container-type: inline-size is the most common — it enables width-based queries.',
          'This is one of the biggest improvements to responsive CSS in years. Browser support is excellent.',
        ]}
      />
    </LessonPage>
  )
}
