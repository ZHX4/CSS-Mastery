import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

const box = (label, color = '#6366f1', extra = {}) => (
  <div style={{ padding: '8px 14px', background: `${color}20`, border: `1px solid ${color}60`, borderRadius: 6, color, fontSize: 12, fontFamily: 'Fira Code, monospace', ...extra }}>
    {label}
  </div>
)

export default function Display() {
  return (
    <LessonPage
      icon="🧩"
      title="Display & Flow"
      description="The display property is the most influential CSS property — it controls how an element participates in the layout flow of the page."
      difficulty="Beginner"
    >
      <LessonSection
        title="Block vs Inline vs Inline-Block"
        explanation="Block elements stack vertically and take full width. Inline elements flow in text and ignore width/height. Inline-block is a hybrid: it flows inline but respects dimensions."
        code={`/* Block — stacks, takes full width, respects w/h/margin */
div, p, h1, section, article { display: block; }

.card {
  display: block;
  width: 300px;       /* respected */
  height: 200px;      /* respected */
  margin: 16px auto;  /* centers horizontally */
}

/* Inline — flows with text, ignores w/h, vertical margin */
span, a, strong, em { display: inline; }

.badge {
  display: inline;
  /* width/height ignored */
  /* padding-top/bottom affect layout differently */
}

/* Inline-block — inline flow + block sizing */
.pill-btn {
  display: inline-block;
  width: 120px;        /* respected */
  height: 40px;        /* respected */
  padding: 8px 16px;
  vertical-align: middle;
}`}
        filename="display-types.css"
        demo={
          <div>
            <div style={{ fontSize: 11, color: '#8892a4', marginBottom: 6 }}>Block elements (full row each):</div>
            <div style={{ marginBottom: 10 }}>
              {['block div (full width)', 'another block'].map(l => (
                <div key={l} style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 4, padding: '4px 10px', marginBottom: 3, fontSize: 12, color: '#818cf8' }}>{l}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: '#8892a4', marginBottom: 6 }}>Inline elements (flow together):</div>
            <div>
              {['inline', 'elements', 'flow', 'together'].map(l => (
                <span key={l} style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 4, padding: '2px 8px', marginRight: 4, fontSize: 12, color: '#06b6d4', display: 'inline' }}>{l}</span>
              ))}
            </div>
          </div>
        }
        tips={[
          'Prefer flexbox or grid over display: inline-block for modern layouts.',
          'vertical-align only works on inline and inline-block elements.',
        ]}
      />

      <LessonSection
        title="display: none vs visibility: hidden"
        explanation="display: none removes the element from the document flow entirely (no space reserved). visibility: hidden hides it visually but preserves its space in the layout."
        code={`.hidden-remove {
  display: none;
  /* Element gone: no space, not in tab order */
}

.hidden-preserve {
  visibility: hidden;
  /* Space reserved, children also hidden */
}

/* Hide visually but keep accessible */
.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
}

/* Modern clip approach */
.sr-only {
  clip-path: inset(50%);
  white-space: nowrap;
  overflow: hidden;
  width: 1px; height: 1px;
}`}
        filename="visibility.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 80, height: 30, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>visible</div>
              <div style={{ display: 'none', width: 80, height: 30 }}>hidden</div>
              <div style={{ width: 80, height: 30, background: 'rgba(6,182,212,0.2)', border: '1px solid rgba(6,182,212,0.4)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4' }}>after none</div>
            </div>
            <div style={{ fontSize: 11, color: '#8892a4' }}>display:none — no space consumed</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 80, height: 30, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>visible</div>
              <div style={{ visibility: 'hidden', width: 80, height: 30, background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: 6 }} />
              <div style={{ width: 80, height: 30, background: 'rgba(6,182,212,0.2)', border: '1px solid rgba(6,182,212,0.4)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4' }}>after hidden</div>
            </div>
            <div style={{ fontSize: 11, color: '#8892a4' }}>visibility:hidden — space preserved</div>
          </div>
        }
        tips={[
          'Use the .visually-hidden pattern to provide context for screen readers without visual clutter.',
          'opacity: 0 still occupies space and can receive pointer events — combine with pointer-events: none if needed.',
        ]}
      />

      <LessonSection
        title="Overflow"
        explanation="When content is larger than its container, the overflow property controls what happens: visible (default), hidden (clips), scroll, or auto."
        code={`.container {
  width: 300px;
  height: 150px;
}

/* Default — content spills out */
.overflow-visible { overflow: visible; }

/* Clip content at container edge */
.overflow-hidden  { overflow: hidden; }

/* Always show scrollbars */
.overflow-scroll  { overflow: scroll; }

/* Scrollbar only when needed */
.overflow-auto    { overflow: auto; }

/* Independent x/y control */
.scroll-x { overflow-x: auto; overflow-y: hidden; }
.scroll-y { overflow-y: auto; overflow-x: hidden; }

/* Modern — clip without scroll context creation */
.clip { overflow: clip; }`}
        filename="overflow.css"
        demo={
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'overflow: visible', ov: 'visible', color: '#ef4444' },
              { label: 'overflow: hidden', ov: 'hidden', color: '#10b981' },
              { label: 'overflow: auto', ov: 'auto', color: '#6366f1' },
              { label: 'overflow: scroll', ov: 'scroll', color: '#f59e0b' },
            ].map(({ label, ov, color }) => (
              <div key={ov} style={{ border: `1px solid ${color}40`, borderRadius: 6 }}>
                <div style={{ fontSize: 10, color, padding: '2px 6px', borderBottom: `1px solid ${color}40`, fontFamily: 'Fira Code, monospace' }}>{label}</div>
                <div style={{ height: 40, overflow: ov, fontSize: 10, color: '#8892a4', padding: '4px 6px', lineHeight: 1.3 }}>
                  This content is longer than the container and will behave differently based on overflow value.
                </div>
              </div>
            ))}
          </div>
        }
        tips={[
          'Setting overflow to anything but visible on a parent creates a new block formatting context, which prevents margin collapse.',
          'overflow: auto is preferable over scroll — it only shows scrollbars when necessary.',
          'overflow: clip (modern) clips without creating a scroll container.',
        ]}
      />
    </LessonPage>
  )
}
