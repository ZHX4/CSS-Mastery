import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'
import { useState } from 'react'

function TransformDemo() {
  const [active, setActive] = useState(null)
  const transforms = [
    { id: 'translate', label: 'translate', tf: 'translate(10px, -10px)', color: '#818cf8' },
    { id: 'scale', label: 'scale',  tf: 'scale(1.2)', color: '#06b6d4' },
    { id: 'rotate', label: 'rotate', tf: 'rotate(15deg)', color: '#10b981' },
    { id: 'skew', label: 'skew', tf: 'skew(10deg, 5deg)', color: '#f59e0b' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {transforms.map(({ id, label, tf, color }) => (
        <div
          key={id}
          onMouseEnter={() => setActive(id)}
          onMouseLeave={() => setActive(null)}
          style={{
            padding: '16px',
            background: `${color}12`,
            border: `1px solid ${color}40`,
            borderRadius: 10,
            transform: active === id ? tf : 'none',
            transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer',
            textAlign: 'center',
            fontSize: 11,
            color,
            fontFamily: 'Fira Code, monospace',
          }}
        >
          {label}(…)
        </div>
      ))}
    </div>
  )
}

export default function Transforms() {
  return (
    <LessonPage
      icon="🔀"
      title="Transforms"
      description="CSS transforms move, scale, rotate, and skew elements without affecting document flow. They are GPU-accelerated and the foundation of performant animations."
      difficulty="Intermediate"
    >
      <LessonSection
        title="Transform Functions"
        explanation="The transform property accepts one or more transform functions. They are applied right-to-left. Transforms do not affect layout flow — other elements don't move."
        code={`/* Translate — move element (does not affect layout) */
.move { transform: translate(20px, -10px); }
.move-x { transform: translateX(50px); }
.move-y { transform: translateY(-20px); }
/* Percentage relative to element's own size */
.center { transform: translate(-50%, -50%); }

/* Scale — resize element */
.grow   { transform: scale(1.1); }        /* uniform */
.wide   { transform: scaleX(1.5); }
.flip-x { transform: scaleX(-1); }        /* mirror */

/* Rotate */
.spin   { transform: rotate(45deg); }
.spin3d { transform: rotateY(180deg); }   /* 3D */

/* Skew */
.tilt  { transform: skew(10deg, 0); }
.perspective { transform: skewY(-3deg); } /* slanted sections */

/* Combine (applied right to left) */
.combined {
  transform: translateY(-4px) scale(1.02) rotate(1deg);
}

/* Transform origin — pivot point */
.from-top    { transform-origin: top center; }
.from-corner { transform-origin: 0 0; }`}
        filename="transforms.css"
        demo={<TransformDemo />}
        tips={[
          'transform: translate(-50%, -50%) combined with position:absolute + top:50% + left:50% is the classic centering technique.',
          'Transforms are GPU-accelerated — always prefer them over changing top/left for animations.',
          'Transform functions apply right to left: translate() scale() first scales then translates.',
        ]}
      />

      <LessonSection
        title="3D Transforms & Perspective"
        explanation="CSS supports 3D transforms with rotateX, rotateY, rotateZ, and translateZ. The perspective property controls the depth illusion."
        code={`/* 3D flip card */
.card-container {
  perspective: 600px;   /* depth — lower = more dramatic */
}

.card {
  transform-style: preserve-3d;  /* children in 3D space */
  transition: transform 600ms ease;
  position: relative;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  backface-visibility: hidden;  /* hide reversed face */
  position: absolute;
  inset: 0;
}

.card-back {
  transform: rotateY(180deg);  /* starts face-down */
}

/* Parallax-like tilt effect */
.tilt-card {
  transform: perspective(800px) rotateX(5deg) rotateY(-5deg);
}`}
        filename="3d-transforms.css"
        demo={
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: 'rotateX(15deg)', tf: 'perspective(300px) rotateX(15deg)', color: '#818cf8' },
              { label: 'rotateY(30deg)', tf: 'perspective(300px) rotateY(30deg)', color: '#06b6d4' },
              { label: 'perspective tilt', tf: 'perspective(400px) rotateX(8deg) rotateY(-8deg)', color: '#10b981' },
            ].map(({ label, tf, color }) => (
              <div key={label} style={{ flex: 1, minWidth: 80, padding: '12px 8px', background: `${color}15`, border: `1px solid ${color}40`, borderRadius: 10, transform: tf, fontSize: 10, color, textAlign: 'center', fontFamily: 'Fira Code, monospace' }}>
                {label}
              </div>
            ))}
          </div>
        }
        tips={[
          'perspective must be set on the parent of the element being transformed in 3D.',
          'backface-visibility: hidden prevents the back of a flipped element from showing through.',
          'transform-style: preserve-3d on a container allows children to exist in the same 3D space.',
        ]}
      />

      <LessonSection
        title="will-change"
        explanation="will-change hints to the browser which properties will animate, allowing it to optimize in advance — but use it sparingly."
        code={`/* Tell the browser to prepare for transform changes */
.animated-card {
  will-change: transform;
}

/* Multiple properties */
.complex {
  will-change: transform, opacity;
}

/* ⚠️ Only add will-change when needed — it consumes memory */

/* Add dynamically in JavaScript */
/* element.addEventListener('mouseenter', () => {
    element.style.willChange = 'transform';
   })
   element.addEventListener('mouseleave', () => {
    element.style.willChange = 'auto';
   }) */

/* Composited properties (fast, GPU) */
/* ✅ transform, opacity, filter */

/* Non-composited (slow, triggers layout) */
/* ❌ width, height, top, left, margin, padding */`}
        filename="will-change.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 12 }}>
              <span style={{ color: '#10b981', fontSize: 16 }}>✅</span>
              <span style={{ color: '#8892a4' }}>transform, opacity, filter — GPU composited (fast)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, fontSize: 12 }}>
              <span style={{ color: '#f59e0b', fontSize: 16 }}>⚠️</span>
              <span style={{ color: '#8892a4' }}>background-color — paint (medium cost)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, fontSize: 12 }}>
              <span style={{ color: '#ef4444', fontSize: 16 }}>❌</span>
              <span style={{ color: '#8892a4' }}>width, height, top, left — layout (slow)</span>
            </div>
          </div>
        }
        tips={[
          'Only add will-change to elements about to animate — do not apply it globally.',
          'Remove will-change after animation completes to free GPU memory.',
          'Stick to animating transform and opacity for the best performance.',
        ]}
      />
    </LessonPage>
  )
}
