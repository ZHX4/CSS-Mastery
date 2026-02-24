import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

function FilterDemo() {
  const filters = [
    { label: 'blur(4px)', filter: 'blur(4px)', color: '#818cf8' },
    { label: 'brightness(1.5)', filter: 'brightness(1.5)', color: '#f59e0b' },
    { label: 'contrast(2)', filter: 'contrast(2)', color: '#ef4444' },
    { label: 'hue-rotate(90deg)', filter: 'hue-rotate(90deg)', color: '#10b981' },
    { label: 'saturate(3)', filter: 'saturate(3)', color: '#06b6d4' },
    { label: 'grayscale(1)', filter: 'grayscale(1)', color: '#8892a4' },
    { label: 'sepia(0.8)', filter: 'sepia(0.8)', color: '#d97706' },
    { label: 'drop-shadow', filter: 'drop-shadow(3px 3px 6px rgba(99,102,241,0.8))', color: '#818cf8' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
      {filters.map(({ label, filter, color }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
          <div style={{ width: '100%', height: 36, background: 'linear-gradient(135deg, #6366f1, #06b6d4)', borderRadius: 6, filter }} />
          <span style={{ fontSize: 9, color: '#4a5568', textAlign: 'center', fontFamily: 'Fira Code, monospace', lineHeight: 1.2 }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Filters() {
  return (
    <LessonPage
      icon="🔮"
      title="Filters & Effects"
      description="CSS filter and mix-blend-mode add Photoshop-level image processing directly in the browser. Combined with backdrop-filter, they enable stunning visual effects."
      difficulty="Intermediate"
    >
      <LessonSection
        title="CSS filter Functions"
        explanation="The filter property applies graphic effects to an element and all its descendants. Multiple filters can be chained in a single declaration."
        code={`/* Individual filter functions */
.img { filter: blur(4px); }
.img { filter: brightness(1.5); }   /* 0=black, 1=normal, 2=double */
.img { filter: contrast(2); }       /* 0=gray, 1=normal */
.img { filter: grayscale(1); }      /* 0=normal, 1=fully gray */
.img { filter: hue-rotate(90deg); } /* rotates colors on the wheel */
.img { filter: invert(1); }         /* 0=normal, 1=inverted */
.img { filter: saturate(3); }       /* 0=gray, 1=normal, >1=vivid */
.img { filter: sepia(0.8); }        /* 0=normal, 1=full sepia */
.img { filter: opacity(0.5); }      /* same as opacity property */

/* drop-shadow — follows PNG transparency unlike box-shadow */
.icon { filter: drop-shadow(2px 4px 8px rgba(0,0,0,0.5)); }

/* Chain multiple filters */
.stylized {
  filter: contrast(1.2) saturate(1.4) hue-rotate(10deg);
}

/* Animated filter */
.photo:hover {
  filter: brightness(1.1) saturate(1.2);
  transition: filter 300ms ease;
}`}
        filename="filters.css"
        demo={<FilterDemo />}
        tips={[
          'drop-shadow() is aware of PNG transparency — it follows the element shape, not the bounding box.',
          'Avoid heavy blur (> 20px) on large elements — it is computationally expensive.',
          'A dark-mode toggle can use filter: invert(1) hue-rotate(180deg) as a quick approximation.',
        ]}
      />

      <LessonSection
        title="mix-blend-mode"
        explanation="mix-blend-mode controls how an element blends with the content behind it, like Photoshop blend modes. Ideal for overlapping text on images."
        code={`/* Common blend modes */
.overlay-text {
  mix-blend-mode: multiply;   /* darkens — great on light bgs */
  mix-blend-mode: screen;     /* lightens — great on dark bgs */
  mix-blend-mode: overlay;    /* contrast blend */
  mix-blend-mode: difference; /* inverts based on background */
  mix-blend-mode: luminosity; /* preserves bg color */
  mix-blend-mode: color;      /* applies element hue to bg luminosity */
}

/* Classic white text on photo */
.hero-text {
  color: white;
  mix-blend-mode: overlay;
}

/* SVG icon tinting */
.tinted-icon {
  filter: saturate(3);
  mix-blend-mode: luminosity;
}

/* Isolate from blending */
.no-blend {
  isolation: isolate; /* prevents blend with sibling layers */
}`}
        filename="blend-modes.css"
        demo={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { mode: 'multiply', label: 'multiply' },
              { mode: 'screen', label: 'screen' },
              { mode: 'overlay', label: 'overlay' },
              { mode: 'difference', label: 'difference' },
              { mode: 'color-dodge', label: 'color-dodge' },
              { mode: 'exclusion', label: 'exclusion' },
            ].map(({ mode, label }) => (
              <div key={mode} style={{ position: 'relative', height: 50, borderRadius: 8, overflow: 'hidden', background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, #f59e0b, #ef4444)', mixBlendMode: mode }} />
                <span style={{ position: 'absolute', bottom: 3, left: 0, right: 0, textAlign: 'center', fontSize: 9, color: '#fff', fontFamily: 'Fira Code, monospace', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>{label}</span>
              </div>
            ))}
          </div>
        }
        tips={[
          'mix-blend-mode: overlay is the most common choice for text overlaid on photography.',
          'Use isolation: isolate on a container to prevent its contents from blending with elements outside.',
          'Blend modes can cause unexpected results — always test across light and dark backgrounds.',
        ]}
      />

      <LessonSection
        title="CSS Masking & Clip-Path"
        explanation="clip-path clips an element to a geometric shape. mask provides more complex masking with gradients or images."
        code={`/* clip-path — clip to a shape */
.diamond  { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
.triangle { clip-path: polygon(50% 0%, 100% 100%, 0% 100%); }
.circle   { clip-path: circle(50%); }
.hexagon  { clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }
.rounded  { clip-path: inset(0 round 16px); }

/* Animated clip-path reveal */
.reveal {
  clip-path: inset(100% 0 0 0);  /* hidden */
  transition: clip-path 600ms cubic-bezier(0.76, 0, 0.24, 1);
}
.reveal.visible {
  clip-path: inset(0 0 0 0);     /* fully shown */
}

/* Gradient mask */
.fade-out {
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}`}
        filename="clip-mask.css"
        demo={
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { shape: 'circle(50%)', label: 'circle', bg: 'linear-gradient(135deg, #6366f1, #818cf8)' },
              { shape: 'polygon(50% 0%, 100% 100%, 0% 100%)', label: 'triangle', bg: 'linear-gradient(135deg, #06b6d4, #10b981)' },
              { shape: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', label: 'diamond', bg: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
              { shape: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', label: 'hexagon', bg: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
            ].map(({ shape, label, bg }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                <div style={{ width: 50, height: 50, background: bg, clipPath: shape }} />
                <span style={{ fontSize: 10, color: '#8892a4', fontFamily: 'Fira Code, monospace' }}>{label}</span>
              </div>
            ))}
          </div>
        }
        tips={[
          'clippy.css and Bennett Feely\'s clippy tool generate clip-path polygon values visually.',
          'Animate clip-path with transition for dramatic reveal effects.',
          'mask-image supports gradients for elegant soft-edge fades.',
        ]}
      />
    </LessonPage>
  )
}
