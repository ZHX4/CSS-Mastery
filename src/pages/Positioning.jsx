import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

function PositioningDemo() {
  return (
    <div style={{ position: 'relative', height: 160, background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 8, padding: 10, overflow: 'hidden' }}>
      <div style={{ fontSize: 10, color: '#4a5568', marginBottom: 6 }}>position: relative (container)</div>
      {[
        { label: 'static (default)', top: 'auto', left: 'auto', position: 'static', color: '#8892a4' },
        { label: 'relative (offset)', top: 10, left: 10, position: 'relative', color: '#818cf8' },
        { label: 'absolute (pinned)', top: 40, right: 10, position: 'absolute', color: '#06b6d4' },
      ].map(({ label, top, left, right, position, color }) => (
        <div key={label} style={{ position, top, left, right, padding: '4px 10px', background: `${color}20`, border: `1px solid ${color}60`, borderRadius: 6, fontSize: 10, color, fontFamily: 'Fira Code, monospace', marginBottom: position === 'static' ? 4 : 0, whiteSpace: 'nowrap' }}>
          {label}
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', padding: '3px 10px', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.5)', borderRadius: 6, fontSize: 10, color: '#10b981', fontFamily: 'Fira Code, monospace', whiteSpace: 'nowrap' }}>
        absolute bottom center
      </div>
    </div>
  )
}

function StickyDemo() {
  return (
    <div style={{ height: 150, overflowY: 'auto', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}>
      {Array.from({ length: 3 }, (_, g) => (
        <div key={g}>
          <div style={{ position: 'sticky', top: 0, padding: '6px 12px', background: 'rgba(99,102,241,0.9)', backdropFilter: 'blur(8px)', zIndex: 1, fontSize: 11, fontWeight: 600, color: '#fff', fontFamily: 'Fira Code, monospace' }}>
            📌 Group {g + 1} — sticky header
          </div>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} style={{ padding: '5px 12px', fontSize: 11, color: '#8892a4', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              Item {g * 3 + i + 1}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Positioning() {
  return (
    <LessonPage
      icon="📌"
      title="Positioning"
      description="CSS positioning removes elements from the normal document flow and places them with precise coordinates. Understanding stacking context is key."
      difficulty="Intermediate"
    >
      <LessonSection
        title="Position Values"
        explanation="There are five position values. static is the default. relative offsets from normal position. absolute removes from flow and anchors to nearest positioned ancestor. fixed anchors to the viewport. sticky is a hybrid."
        code={`/* static — default, part of normal flow */
.item { position: static; }

/* relative — offset but still in flow */
.nudge {
  position: relative;
  top: 8px;     /* moves DOWN 8px */
  left: -4px;   /* moves LEFT 4px */
  /* Space is still reserved at original position */
}

/* absolute — removed from flow */
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  /* Anchors to nearest position:relative ancestor */
}

/* Parent must be positioned for absolute child to anchor */
.card {
  position: relative; /* establishes containing block */
}

/* fixed — anchors to viewport (ignores scroll) */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* sticky — flows normally, then "sticks" at threshold */
.table-header {
  position: sticky;
  top: 0;
  z-index: 1;
}`}
        filename="positioning.css"
        demo={<PositioningDemo />}
        tips={[
          'Always set position: relative on a parent when you want absolute children to position relative to it.',
          'Fixed elements are removed from flow — add padding-top to the page equal to the navbar height.',
          'Sticky requires a scroll container ancestor with defined height and overflow other than visible.',
        ]}
      />

      <LessonSection
        title="Sticky Positioning"
        explanation="position: sticky acts like relative until the element reaches a specified offset, then it acts like fixed — within its parent container."
        code={`/* Section headers that stick while scrolling */
.section-header {
  position: sticky;
  top: 0;           /* sticks at 0 from scroll parent top */
  background: #1a1d27;
  backdrop-filter: blur(8px);
  z-index: 10;
  padding: 8px 16px;
}

/* Sticky sidebar */
.sidebar {
  position: sticky;
  top: 80px;   /* below a fixed navbar */
  align-self: start; /* inside a flex/grid container */
  height: calc(100vh - 80px);
  overflow-y: auto;
}

/* Sticky table column */
.table th:first-child,
.table td:first-child {
  position: sticky;
  left: 0;
  background: #1a1d27;
}`}
        filename="sticky.css"
        demo={<StickyDemo />}
        tips={[
          'Sticky requires the parent to have a defined height and overflow that allows scrolling.',
          'In a flex column container, use align-self: start so the sticky element doesn\'t stretch to full height.',
          'backdrop-filter: blur() on sticky headers creates a modern frosted-glass look.',
        ]}
      />

      <LessonSection
        title="Z-index & Stacking Context"
        explanation="z-index controls which element appears on top when they overlap. It only works on positioned elements. Stacking contexts are created by transforms, opacity, filters, and more."
        code={`/* z-index only works on positioned elements */
.modal-overlay { position: fixed; z-index: 1000; }
.modal         { position: fixed; z-index: 1001; }
.tooltip       { position: absolute; z-index: 9999; }

/* ⚠️ New stacking context created by: */
.creates-context {
  opacity: 0.99;        /* opacity < 1 */
  transform: scale(1);  /* any transform */
  filter: blur(0);      /* any filter */
  isolation: isolate;   /* explicit */
  z-index: 0;           /* on positioned element */
  will-change: transform;
}

/* isolation: isolate — explicitly creates stacking context */
/* Prevents child z-indexes from affecting the outer stack */
.card-stack {
  isolation: isolate;
}

/* Recommended z-index scale */
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
}`}
        filename="z-index.css"
        demo={
          <div style={{ position: 'relative', height: 130 }}>
            {[
              { z: 1, color: '#6366f1', label: 'z-index: 1', top: 20, left: 10, opacity: 1 },
              { z: 2, color: '#06b6d4', label: 'z-index: 2', top: 40, left: 50, opacity: 1 },
              { z: 3, color: '#10b981', label: 'z-index: 3', top: 60, left: 30, opacity: 1 },
            ].map(({ z, color, label, top, left }) => (
              <div key={z} style={{ position: 'absolute', top, left, zIndex: z, padding: '6px 14px', background: `${color}`, borderRadius: 8, fontSize: 11, color: '#fff', fontFamily: 'Fira Code, monospace', fontWeight: 600, boxShadow: `0 4px 12px ${color}60` }}>
                {label}
              </div>
            ))}
          </div>
        }
        tips={[
          'Use CSS variables for z-index values to create a maintainable layering system.',
          'If a z-index isn\'t working, the element likely doesn\'t have a position property set.',
          'Transforms on a parent create a stacking context — children cannot escape it with z-index.',
          'Use isolation: isolate on a component to prevent its z-index from leaking outside.',
        ]}
      />
    </LessonPage>
  )
}
