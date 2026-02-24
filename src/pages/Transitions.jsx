import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

function TransitionDemo() {
  return (
    <>
      <style>{`
        .td-item {
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
          font-family: 'Fira Code', monospace;
        }
        .td-color {
          color: #8892a4;
          border: 1px solid transparent;
          transition: color 300ms ease;
        }
        .td-color:hover { color: #818cf8; }

        .td-background {
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          transition: background 300ms ease;
        }
        .td-background:hover { background: rgba(99,102,241,0.35); }

        .td-transform {
          background: rgba(6,182,212,0.1);
          border: 1px solid rgba(6,182,212,0.2);
          color: #06b6d4;
          transform: translateY(0);
          transition: transform 300ms ease, box-shadow 300ms ease;
        }
        .td-transform:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(6,182,212,0.3);
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="td-item td-color">hover me — color transition</div>
        <div className="td-item td-background">hover me — background transition</div>
        <div className="td-item td-transform">hover me — transform transition</div>
      </div>
    </>
  )
}

export default function Transitions() {
  return (
    <LessonPage
      icon="🔄"
      title="Transitions"
      description="CSS transitions animate property changes smoothly over time. They're the simplest way to add motion to your UI on interaction."
      difficulty="Intermediate"
    >
      <LessonSection
        title="The transition Property"
        explanation="transition takes a property name, duration, timing function, and optional delay. It activates whenever that CSS property changes value."
        code={`/* transition: property duration timing-function delay */
.btn {
  background: #6366f1;
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(99,102,241,0.3);

  transition: background 250ms ease,
              transform  200ms ease,
              box-shadow 250ms ease;
}

.btn:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99,102,241,0.5);
}

/* Transition ALL changes */
.card { transition: all 300ms ease; } /* ⚠️ can be slow */

/* Better: be explicit */
.card {
  transition:
    opacity   200ms ease,
    transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}`}
        filename="transitions.css"
        demo={<TransitionDemo />}
        tips={[
          'Never use transition: all in production — it animates every property including layout ones (expensive).',
          'prefer transform and opacity transitions — they are GPU-accelerated and do not trigger layout.',
          'For enter/exit animations in React, use the transition property paired with class toggling.',
        ]}
      />

      <LessonSection
        title="Timing Functions (Easing)"
        explanation="The timing function controls the rate of change during the transition. Cubic bezier curves let you define any easing curve."
        code={`/* Keyword easings */
transition-timing-function: linear;      /* constant speed */
transition-timing-function: ease;        /* slow-fast-slow (default) */
transition-timing-function: ease-in;     /* slow start */
transition-timing-function: ease-out;    /* slow end */
transition-timing-function: ease-in-out; /* slow both ends */

/* Custom cubic-bezier(x1, y1, x2, y2) */
transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
/* ↑ overshoot spring effect */

/* Steps — discrete jumps */
transition-timing-function: steps(4, end);

/* CSS custom properties for consistent easing */
:root {
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
}`}
        filename="easing.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { label: 'ease (default)', easing: 'ease', color: '#818cf8' },
              { label: 'ease-out (natural feel)', easing: 'ease-out', color: '#06b6d4' },
              { label: 'cubic-bezier spring', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', color: '#10b981' },
              { label: 'linear', easing: 'linear', color: '#f59e0b' },
            ].map(({ label, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#8892a4', fontFamily: 'Fira Code, monospace' }}>{label}</span>
              </div>
            ))}
            <div style={{ marginTop: 8, fontSize: 11, color: '#4a5568' }}>Use cubic-bezier.com to visualize custom curves</div>
          </div>
        }
        tips={[
          'ease-out feels most natural for UI interactions — elements decelerate like real objects.',
          'Use cubic-bezier.com to preview and copy custom easing curves.',
          'For enter animations use ease-out; for exit animations use ease-in.',
        ]}
      />

      <LessonSection
        title="Transitioning Display & Height"
        explanation="Some properties like display and height: auto cannot be directly transitioned. Here are the modern workarounds."
        code={`/* ❌ Cannot transition display: none → block */
/* Use opacity + visibility instead */
.tooltip {
  opacity: 0;
  visibility: hidden;
  transition: opacity 200ms ease, visibility 200ms ease;
}
.tooltip.visible {
  opacity: 1;
  visibility: visible;
}

/* ❌ Cannot transition height: auto */
/* Option 1: max-height trick */
.accordion {
  max-height: 0;
  overflow: hidden;
  transition: max-height 400ms ease;
}
.accordion.open {
  max-height: 500px; /* larger than content */
}

/* Option 2: Modern — @starting-style (Chrome 117+) */
dialog {
  transition: opacity 300ms, display 300ms allow-discrete;
  opacity: 1;
}
dialog:not([open]) { opacity: 0; }

@starting-style {
  dialog[open] { opacity: 0; }
}`}
        filename="transition-tricks.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ padding: '8px 12px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 8, fontSize: 12, color: '#06b6d4' }}>
              ✅ opacity + visibility (smooth fade)
            </div>
            <div style={{ padding: '8px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 12, color: '#10b981' }}>
              ✅ max-height accordion trick
            </div>
            <div style={{ padding: '8px 12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 12, color: '#818cf8' }}>
              🚀 @starting-style (native, modern)
            </div>
          </div>
        }
        tips={[
          'The max-height trick works but can feel snappy if max-height is much larger than real content.',
          '@starting-style is the future — it enables enter/exit animations without JavaScript.',
          'For complex state-based animations in React, prefer CSS transitions triggered by class toggling.',
        ]}
      />
    </LessonPage>
  )
}
