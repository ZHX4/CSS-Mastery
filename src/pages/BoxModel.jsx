import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'
import styles from './Lesson.module.css'

function BoxModelDiagram() {
  const boxStyle = (bg, color, size, label) => ({
    position: 'relative',
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: size,
    borderRadius: 4,
  })
  return (
    <div style={{ fontFamily: 'Fira Code, monospace', fontSize: 11 }}>
      {/* Margin */}
      <div style={{ background: 'rgba(245,158,11,0.15)', border: '2px dashed rgba(245,158,11,0.5)', borderRadius: 8, padding: 12, position: 'relative' }}>
        <span style={{ position: 'absolute', top: 4, left: 8, color: '#f59e0b', fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>MARGIN</span>
        {/* Border */}
        <div style={{ background: 'rgba(99,102,241,0.15)', border: '2px solid rgba(99,102,241,0.6)', borderRadius: 6, padding: 12, position: 'relative', marginTop: 8 }}>
          <span style={{ position: 'absolute', top: 4, left: 8, color: '#818cf8', fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>BORDER</span>
          {/* Padding */}
          <div style={{ background: 'rgba(16,185,129,0.15)', border: '2px dashed rgba(16,185,129,0.4)', borderRadius: 4, padding: 12, marginTop: 8, position: 'relative' }}>
            <span style={{ position: 'absolute', top: 4, left: 8, color: '#10b981', fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>PADDING</span>
            {/* Content */}
            <div style={{ background: 'rgba(6,182,212,0.2)', border: '1px solid rgba(6,182,212,0.4)', borderRadius: 3, padding: '12px 24px', marginTop: 8, textAlign: 'center', color: '#06b6d4', fontWeight: 700, fontSize: 12 }}>
              CONTENT
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BoxSizingDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        { label: 'content-box (default)', width: '100%', padding: 16, border: 4, color: '#ef4444', note: 'Total = 100% + 40px + 8px' },
        { label: 'border-box', width: '100%', padding: 16, border: 4, color: '#10b981', note: 'Total = 100% (padding & border included)' },
      ].map(({ label, color, note }) => (
        <div key={label}>
          <div style={{ fontSize: 11, color: '#8892a4', marginBottom: 4 }}>{label}</div>
          <div style={{
            width: '100%',
            padding: '10px 16px',
            border: `3px solid ${color}`,
            borderRadius: 6,
            background: `${color}15`,
            color,
            fontSize: 12,
            fontFamily: 'Fira Code, monospace',
          }}>
            width: 100%
          </div>
          <div style={{ fontSize: 11, color: '#4a5568', marginTop: 3 }}>{note}</div>
        </div>
      ))}
    </div>
  )
}

export default function BoxModel() {
  return (
    <LessonPage
      icon="📦"
      title="The Box Model"
      description="Every HTML element is a rectangular box. The box model defines how that box's dimensions are calculated using content, padding, border, and margin."
      difficulty="Beginner"
    >
      <LessonSection
        title="The Four Layers"
        explanation="From inside out: Content (the actual text/image), Padding (space between content and border), Border (a visible or invisible edge), Margin (space outside the border separating elements from each other)."
        code={`.card {
  /* Content area */
  width: 300px;
  height: 200px;

  /* Space inside the border */
  padding: 24px;              /* all sides */
  padding: 16px 24px;         /* top/bottom left/right */
  padding: 10px 20px 15px 8px; /* top right bottom left */

  /* The visible edge */
  border: 2px solid #6366f1;
  border-radius: 12px;

  /* Space outside the border */
  margin: 16px;
  margin: 0 auto;             /* center horizontally */
}`}
        filename="box-model.css"
        demo={<BoxModelDiagram />}
        tips={[
          'Use margin: 0 auto on block elements with a fixed width to center them horizontally.',
          'Padding increases the clickable/tappable area of buttons — prefer padding over min-height alone.',
        ]}
      />

      <LessonSection
        title="box-sizing"
        explanation={
          <>
            By default (<code>content-box</code>), width and height only apply to the content area — padding and border are added on top. With <code>border-box</code>, the stated width/height includes padding and border, making layout math much more predictable.
          </>
        }
        code={`/* The global reset — add this to every project */
*, *::before, *::after {
  box-sizing: border-box;
}

.sidebar {
  width: 300px;
  padding: 24px;
  border: 2px solid #6366f1;
  /* With border-box: total width stays 300px */
  /* Without it: 300 + 48 + 4 = 352px total! */
}

/* Override for a specific element */
.legacy-component {
  box-sizing: content-box;
}`}
        filename="box-sizing.css"
        demo={<BoxSizingDemo />}
        tips={[
          'Always set box-sizing: border-box globally — it is the most common CSS reset after margin/padding 0.',
          'Every modern CSS framework and reset sheet includes this rule.',
        ]}
      />

      <LessonSection
        title="Margin Collapsing"
        explanation="Vertical margins between adjacent block elements collapse into the larger of the two values. This only happens vertically and not with floated, inline, or flex/grid items."
        code={`/* These two paragraphs are adjacent */
.top-para    { margin-bottom: 24px; }
.bottom-para { margin-top: 16px; }
/* Result: gap = 24px (not 40px!) */

/* Prevent collapse by adding padding or border to parent */
.parent {
  padding-top: 1px;     /* prevents top child margin collapse */
  overflow: hidden;     /* also prevents collapse */
}

/* No collapsing: flex/grid containers */
.flex-parent {
  display: flex;
  flex-direction: column;
  gap: 24px; /* prefer gap over margins in flex/grid */
}`}
        filename="margin-collapse.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
            <div style={{ padding: '12px', borderRadius: 6, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
              margin-bottom: 24px
            </div>
            <div style={{ fontSize: 11, color: '#4a5568', textAlign: 'center', fontFamily: 'Fira Code, monospace' }}>↕ gap = 24px (collapsed, not 40px)</div>
            <div style={{ padding: '12px', borderRadius: 6, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', color: '#06b6d4' }}>
              margin-top: 16px
            </div>
          </div>
        }
        tips={[
          'Margin collapsing surprises many developers — prefer gap in flex/grid layouts to avoid it entirely.',
          'Margins never collapse through padding, borders, or overflow other than visible.',
          'Use logical properties (margin-block-start) instead of margin-top for internationalized layouts.',
        ]}
      />

      <LessonSection
        title="Outline vs Border"
        explanation="Outline looks like a border but doesn't affect layout — it doesn't take up space. It's most commonly used for focus indicators."
        code={`/* Border — affects layout (adds to box size without border-box) */
.btn {
  border: 2px solid #6366f1;
  padding: 10px 20px;
}

/* Outline — does NOT affect layout */
.btn:focus {
  outline: 2px solid #818cf8;
  outline-offset: 3px;   /* gap between element and outline */
}

/* Never do this — it breaks keyboard accessibility */
.btn:focus { outline: none; } /* ❌ */

/* Instead, provide a custom visible focus style */
.btn:focus-visible {
  outline: 2px solid #818cf8;
  outline-offset: 3px;
}`}
        filename="outline.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ padding: '8px 20px', borderRadius: 8, border: '2px solid #6366f1', color: '#818cf8', fontSize: 13 }}>border (affects layout)</div>
            <div style={{ padding: '8px 20px', borderRadius: 8, border: 'none', outline: '2px solid #818cf8', outlineOffset: 3, color: '#06b6d4', fontSize: 13 }}>outline (no layout impact)</div>
          </div>
        }
        tips={[
          'Never set outline: none on focused elements without providing an alternative — this harms keyboard users.',
          'Use :focus-visible instead of :focus to only show outlines for keyboard navigation.',
          'outline-offset creates a gap between the outline and the element edges.',
        ]}
      />
    </LessonPage>
  )
}
