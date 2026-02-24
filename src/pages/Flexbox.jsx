import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'
import { useState } from 'react'

function FlexDirectionDemo() {
  const [dir, setDir] = useState('row')
  const items = ['Item 1', 'Item 2', 'Item 3']
  return (
    <div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
        {['row', 'row-reverse', 'column', 'column-reverse'].map(d => (
          <button key={d} onClick={() => setDir(d)} style={{
            padding: '3px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
            fontFamily: 'Fira Code, monospace',
            background: dir === d ? 'rgba(99,102,241,0.3)' : 'transparent',
            border: `1px solid ${dir === d ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
            color: dir === d ? '#818cf8' : '#8892a4',
          }}>{d}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: dir, gap: 6, padding: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px dashed rgba(255,255,255,0.1)', minHeight: 60 }}>
        {items.map((item, i) => (
          <div key={item} style={{ padding: '6px 12px', background: `rgba(99,102,241,${0.1 + i * 0.07})`, border: '1px solid rgba(99,102,241,0.4)', borderRadius: 6, color: '#818cf8', fontSize: 12, fontFamily: 'Fira Code, monospace', whiteSpace: 'nowrap' }}>{item}</div>
        ))}
      </div>
    </div>
  )
}

function AlignDemo() {
  const [jc, setJc] = useState('flex-start')
  const [ai, setAi] = useState('center')
  return (
    <div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 10, color: '#8892a4', alignSelf: 'center' }}>justify:</span>
        {['flex-start','center','flex-end','space-between','space-around'].map(v => (
          <button key={v} onClick={() => setJc(v)} style={{ padding: '2px 7px', borderRadius: 4, fontSize: 10, cursor: 'pointer', fontFamily: 'Fira Code, monospace', background: jc === v ? 'rgba(6,182,212,0.2)' : 'transparent', border: `1px solid ${jc === v ? '#06b6d4' : 'rgba(255,255,255,0.08)'}`, color: jc === v ? '#06b6d4' : '#8892a4' }}>{v}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 10, color: '#8892a4', alignSelf: 'center' }}>align:</span>
        {['flex-start','center','flex-end','stretch','baseline'].map(v => (
          <button key={v} onClick={() => setAi(v)} style={{ padding: '2px 7px', borderRadius: 4, fontSize: 10, cursor: 'pointer', fontFamily: 'Fira Code, monospace', background: ai === v ? 'rgba(99,102,241,0.2)' : 'transparent', border: `1px solid ${ai === v ? '#6366f1' : 'rgba(255,255,255,0.08)'}`, color: ai === v ? '#818cf8' : '#8892a4' }}>{v}</button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: jc, alignItems: ai, gap: 6, padding: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px dashed rgba(255,255,255,0.1)', height: 90 }}>
        {[40, 60, 50].map((h, i) => (
          <div key={i} style={{ width: 45, height: h, background: `rgba(99,102,241,${0.15 + i * 0.07})`, border: '1px solid rgba(99,102,241,0.5)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#818cf8' }}>{i+1}</div>
        ))}
      </div>
    </div>
  )
}

export default function Flexbox() {
  return (
    <LessonPage
      icon="↔️"
      title="Flexbox"
      description="Flexbox is a one-dimensional layout system — it arranges items in a row or column and provides powerful alignment and distribution controls."
      difficulty="Beginner"
    >
      <LessonSection
        title="Flex Container Basics"
        explanation="Adding display: flex to a container makes its direct children flex items. The main axis (flex-direction) and cross axis are the two core concepts."
        code={`.container {
  display: flex;

  /* Direction — main axis */
  flex-direction: row;           /* default → */
  flex-direction: row-reverse;   /* ← */
  flex-direction: column;        /* ↓ */
  flex-direction: column-reverse;/* ↑ */

  /* Wrapping */
  flex-wrap: nowrap;    /* default — single line */
  flex-wrap: wrap;      /* items wrap to next line */

  /* Shorthand */
  flex-flow: row wrap;

  /* Spacing between items */
  gap: 16px;
  gap: 16px 24px;  /* row-gap column-gap */
}`}
        filename="flex-container.css"
        demo={<FlexDirectionDemo />}
        tips={[
          'Prefer gap over margins for spacing between flex items — it handles edges correctly.',
          'flex-direction: column is useful for card layouts and vertical centring.',
        ]}
      />

      <LessonSection
        title="Alignment"
        explanation="justify-content aligns items along the main axis. align-items aligns on the cross axis. Both are among the most useful CSS properties ever created."
        code={`.container {
  display: flex;

  /* Main axis (horizontal for row) */
  justify-content: flex-start;    /* left */
  justify-content: center;        /* center */
  justify-content: flex-end;      /* right */
  justify-content: space-between; /* evenly spaced, no edge gap */
  justify-content: space-around;  /* evenly spaced with edge gaps */
  justify-content: space-evenly;  /* perfectly equal spaces */

  /* Cross axis (vertical for row) */
  align-items: stretch;     /* default — fill cross axis */
  align-items: center;      /* center vertically */
  align-items: flex-start;  /* top */
  align-items: flex-end;    /* bottom */
  align-items: baseline;    /* text baselines aligned */

  /* Multiple lines (only when flex-wrap: wrap) */
  align-content: space-between;
}`}
        filename="flex-align.css"
        demo={<AlignDemo />}
        tips={[
          'The classic "vertically center anything" trick: display:flex + align-items:center + justify-content:center.',
          'align-items works on individual items via align-self on the child.',
          'align-content only takes effect when there are multiple lines (wrap needed).',
        ]}
      />

      <LessonSection
        title="Flex Items (flex-grow, shrink, basis)"
        explanation="The flex shorthand on children controls how items grow, shrink, and their base size. These three properties interact to distribute available space."
        code={`/* flex: grow shrink basis */
.item {
  flex: 0 1 auto; /* default — don't grow, can shrink */
  flex: 1;        /* grow: 1, shrink: 1, basis: 0 */
  flex: 1 0 200px;/* grow, don't shrink, start at 200px */
  flex: none;     /* 0 0 auto — fixed size */
}

/* Equal-width columns */
.col { flex: 1; }

/* Specific growth ratios */
.sidebar { flex: 1; }    /* 1 part */
.content { flex: 3; }    /* 3 parts — 3× wider */

/* Fixed sidebar + fluid content */
.sidebar { flex: 0 0 260px; } /* fixed */
.content { flex: 1; }          /* takes remaining */

/* Override alignment for one item */
.special {
  align-self: flex-end;
  order: -1; /* move to front visually */
}`}
        filename="flex-items.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 11, color: '#8892a4' }}>flex: 1 — equal columns:</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['flex:1','flex:1','flex:1'].map((l,i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', padding: '6px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 6, fontSize: 11, color: '#818cf8', fontFamily: 'Fira Code, monospace' }}>{l}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: '#8892a4' }}>Fixed sidebar + fluid content:</div>
            <div style={{ display: 'flex', gap: 6, height: 40 }}>
              <div style={{ flex: '0 0 80px', background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.4)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#06b6d4', fontFamily: 'Fira Code, monospace' }}>80px</div>
              <div style={{ flex: 1, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#10b981', fontFamily: 'Fira Code, monospace' }}>flex:1 (remaining)</div>
            </div>
          </div>
        }
        tips={[
          'Use flex: 1 instead of specifying all three values when you want equal-width items.',
          'flex: 0 0 auto (same as flex: none) prevents items from growing or shrinking.',
          'The order property visually reorders items without changing DOM order — useful for accessibility.',
        ]}
      />

      <LessonSection
        title="Common Flexbox Patterns"
        explanation="Flexbox solves classic layout problems elegantly. Here are the most-used patterns you'll reach for daily."
        code={`/* 1. Perfect center */
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 2. Navigation bar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 3. Sticky footer (full-page) */
body { display: flex; flex-direction: column; min-height: 100vh; }
main { flex: 1; }

/* 4. Equal-height cards */
.card-row { display: flex; align-items: stretch; gap: 16px; }

/* 5. Push last item to end */
.list { display: flex; gap: 8px; }
.list .spacer { flex: 1; }
.list .last-item { /* pushed right */ }

/* 6. Auto-fill columns (with wrap) */
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag  { flex: 0 0 auto; }`}
        filename="flex-patterns.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: '8px 12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#818cf8' }}>🏠 Brand</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Home','About','Contact'].map(l => <span key={l} style={{ fontSize: 11, color: '#8892a4' }}>{l}</span>)}
              </div>
            </div>
            <div style={{ padding: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50, fontSize: 12, color: '#10b981' }}>
              Perfect center using flex
            </div>
          </div>
        }
        tips={[
          "Flexbox is 1D — use Grid for 2D layouts (rows AND columns simultaneously).",
          "gap in flex containers does not add outside space — no need for negative margins.",
        ]}
      />
    </LessonPage>
  )
}
