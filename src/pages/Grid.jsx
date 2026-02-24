import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

function GridBasicDemo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ padding: '10px', background: `rgba(99,102,241,${0.1 + i * 0.03})`, border: '1px solid rgba(99,102,241,0.3)', borderRadius: 6, textAlign: 'center', fontSize: 12, color: '#818cf8', fontFamily: 'Fira Code, monospace' }}>
          {i + 1}
        </div>
      ))}
    </div>
  )
}

function GridTemplateDemo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gridTemplateRows: '36px 1fr 28px', gap: 6, height: 130 }}>
      <div style={{ gridColumn: '1 / -1', background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#06b6d4', fontFamily: 'Fira Code, monospace' }}>header (col 1 / -1)</div>
      <div style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#818cf8', fontFamily: 'Fira Code, monospace' }}>sidebar</div>
      <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#10b981', fontFamily: 'Fira Code, monospace' }}>main content</div>
      <div style={{ gridColumn: '1 / -1', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#f59e0b', fontFamily: 'Fira Code, monospace' }}>footer (col 1 / -1)</div>
    </div>
  )
}

function GridAreasDemo() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateAreas: '"header header" "sidebar content" "footer footer"',
      gridTemplateColumns: '80px 1fr',
      gridTemplateRows: '30px 1fr 28px',
      gap: 6,
      height: 130,
    }}>
      {[
        { area: 'header', label: '"header"', color: '#06b6d4' },
        { area: 'sidebar', label: '"sidebar"', color: '#818cf8' },
        { area: 'content', label: '"content"', color: '#10b981' },
        { area: 'footer', label: '"footer"', color: '#f59e0b' },
      ].map(({ area, label, color }) => (
        <div key={area} style={{ gridArea: area, background: `${color}20`, border: `1px solid ${color}50`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color, fontFamily: 'Fira Code, monospace' }}>{label}</div>
      ))}
    </div>
  )
}

export default function Grid() {
  return (
    <LessonPage
      icon="⊞"
      title="CSS Grid"
      description="CSS Grid is a two-dimensional layout system — it handles both rows and columns simultaneously, making it ideal for complex page layouts and card grids."
      difficulty="Intermediate"
    >
      <LessonSection
        title="Grid Basics: Columns & Rows"
        explanation="Define a grid by specifying column and row tracks with grid-template-columns and grid-template-rows. Items are automatically placed into cells."
        code={`.grid {
  display: grid;

  /* 3 equal columns */
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-columns: repeat(3, 1fr); /* shorthand */

  /* Fixed + fluid + fixed */
  grid-template-columns: 200px 1fr 200px;

  /* Named tracks */
  grid-template-columns: [sidebar] 260px [main] 1fr [end];

  /* Rows */
  grid-template-rows: auto;   /* size to content (default) */
  grid-template-rows: 60px 1fr 40px; /* header + main + footer */

  gap: 16px;
  gap: 16px 24px; /* row-gap column-gap */
}

/* Auto-fill responsive grid (no media queries!) */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}`}
        filename="grid-basics.css"
        demo={<GridBasicDemo />}
        tips={[
          'fr is the "fractional unit" — 1fr means "1 part of the available space".',
          'repeat(auto-fill, minmax(200px, 1fr)) creates a responsive grid with no media queries.',
          'auto-fill creates empty ghost columns; auto-fit collapses them.',
        ]}
      />

      <LessonSection
        title="Placing Items: Line Numbers"
        explanation="Items occupy a single cell by default. Use grid-column and grid-row to span multiple cells with line numbers. -1 references the last grid line."
        code={`.item {
  /* column: start / end */
  grid-column: 1 / 3;   /* span columns 1 and 2 */
  grid-column: 1 / -1;  /* span ALL columns */
  grid-column: span 2;  /* span 2 from current position */

  /* row: start / end */
  grid-row: 1 / 3;
  grid-row: span 2;

  /* Shorthand: row-start / col-start / row-end / col-end */
  grid-area: 1 / 1 / 3 / -1;
}

/* Classic page layout */
.page {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 60px 1fr 48px;
  min-height: 100vh;
}

.header  { grid-column: 1 / -1; }
.sidebar { grid-row: 2; }
.main    { grid-row: 2; }
.footer  { grid-column: 1 / -1; }`}
        filename="grid-placement.css"
        demo={<GridTemplateDemo />}
        tips={[
          'grid-column: 1 / -1 is the shorthand for "span all columns" regardless of how many there are.',
          'Use grid lines for precise control; use span for relative positioning.',
        ]}
      />

      <LessonSection
        title="Grid Template Areas"
        badge="modern"
        explanation="Named areas provide the most readable way to define page layouts. Each string represents a row; repeated names span that area across cells."
        code={`.layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  grid-template-columns: 260px 1fr;
  grid-template-rows: 60px 1fr 48px;
  min-height: 100vh;
  gap: 12px;
}

/* Each child just references its area name */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }

/* Use . for an empty cell */
.grid-with-gap {
  grid-template-areas:
    "header header"
    "sidebar ."     /* empty cell → no content */
    "footer footer";
}`}
        filename="grid-areas.css"
        demo={<GridAreasDemo />}
        tips={[
          'Grid template areas are self-documenting — the layout reads like ASCII art.',
          'All rows must have the same number of cells in grid-template-areas.',
          'Areas must form a rectangle — L-shapes are not allowed.',
        ]}
      />

      <LessonSection
        title="Alignment in Grid"
        explanation="Grid supports the same alignment properties as Flexbox, with additional per-item and content-level controls."
        code={`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  /* Align ALL items in their cells */
  justify-items: stretch;  /* default — fill cell width */
  justify-items: start | center | end;

  align-items: stretch;    /* default — fill cell height */
  align-items: start | center | end;

  /* Align the grid tracks within the container */
  justify-content: start | center | end | space-between;
  align-content: start | center | end | space-between;
}

/* Override for a single item */
.item {
  justify-self: center;
  align-self: end;

  /* Place an item in the center of its cell */
  place-self: center;
}

/* Center the entire grid's content */
.page { place-items: center; }`}
        filename="grid-align.css"
        demo={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, padding: 10, background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px dashed rgba(255,255,255,0.08)' }}>
            {[
              { align: 'start', justify: 'start' },
              { align: 'center', justify: 'center' },
              { align: 'end', justify: 'end' },
            ].map(({ align, justify }, i) => (
              <div key={i} style={{ height: 60, display: 'flex', alignItems: align, justifyContent: justify, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6 }}>
                <div style={{ width: 28, height: 28, background: 'rgba(99,102,241,0.3)', border: '1px solid rgba(99,102,241,0.5)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#818cf8', fontFamily: 'Fira Code, monospace' }}>{justify[0]}</div>
              </div>
            ))}
          </div>
        }
        tips={[
          'place-items is a shorthand for align-items + justify-items.',
          'place-self on a child overrides the container\'s place-items for that item.',
        ]}
      />
    </LessonPage>
  )
}
