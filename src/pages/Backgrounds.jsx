import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

export default function Backgrounds() {
  return (
    <LessonPage
      icon="🖼️"
      title="Backgrounds"
      description="CSS backgrounds go far beyond a solid color — they support images, gradients, clipping, sizing, blending, and multiple layered backgrounds."
      difficulty="Beginner"
    >
      <LessonSection
        title="Background Color & Image"
        explanation="background-color sets a solid fill. background-image accepts URLs and generated gradients. Multiple backgrounds are layered from top to bottom."
        code={`/* Solid color */
.card { background-color: #1a1d27; }

/* Image */
.hero {
  background-image: url('/hero.jpg');
  background-size: cover;      /* fill, may crop */
  background-size: contain;    /* fit, may letterbox */
  background-size: 100% auto;  /* explicit */
  background-position: center center;
  background-repeat: no-repeat;
}

/* Shorthand */
.hero {
  background: url('/hero.jpg') center/cover no-repeat;
}

/* Multiple backgrounds (first = on top) */
.overlay {
  background:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('/photo.jpg') center/cover no-repeat,
    #1a1d27;        /* fallback color */
}`}
        filename="backgrounds.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ height: 45, background: '#1a1d27', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 12, color: '#8892a4' }}>background-color: #1a1d27</div>
            <div style={{ height: 45, background: 'linear-gradient(135deg, #6366f1, #06b6d4)', borderRadius: 8, display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 12, color: '#fff' }}>background: gradient</div>
            <div style={{ height: 45, background: 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: 8, display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 12, color: '#fff' }}>overlay + image</div>
          </div>
        }
        tips={[
          'Always provide a background-color fallback when using background-image — shown if image fails to load.',
          'background-size: cover on hero images may clip important content — use object-position for focal point.',
        ]}
      />

      <LessonSection
        title="Background Clip & Origin"
        explanation="background-clip controls where the background is rendered (content box, padding box, or border box). background-clip: text makes text itself the mask."
        code={`/* Gradient text — very popular modern effect */
.gradient-text {
  background: linear-gradient(135deg, #6366f1, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent; /* fallback */
}

/* Background only behind content area */
.padded {
  background-clip: content-box;
  padding: 16px;
}

/* Background includes border area */
.full {
  background-clip: border-box; /* default */
}

/* Background origin — where background-position starts */
.card {
  background-origin: content-box;
  background-image: url('/pattern.svg');
}`}
        filename="background-clip.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 28, fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Gradient Text</div>
            <div style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(to right, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Warm Gradient Text</div>
            <div style={{ fontSize: 18, fontWeight: 700, background: 'linear-gradient(135deg, #10b981, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>CSS is beautiful!</div>
          </div>
        }
        tips={[
          'Always add -webkit-background-clip: text for Safari compatibility alongside the standard property.',
          'Gradient text accessibility: ensure color contrast is still readable for low-vision users.',
        ]}
      />

      <LessonSection
        title="Box Shadow"
        explanation="box-shadow adds drop shadows to elements. Multiple comma-separated shadows layer from front to back. The inset keyword creates inner shadows."
        code={`/* box-shadow: x y blur spread color */
.card {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

/* Multiple shadows */
.elevated {
  box-shadow:
    0 1px 2px rgba(0,0,0,0.2),   /* tight contact shadow */
    0 4px 12px rgba(0,0,0,0.3),  /* soft ambient shadow */
    0 8px 32px rgba(0,0,0,0.2);  /* wide elevation shadow */
}

/* Inset shadow — inner effect */
.pressed {
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.4);
}

/* Glow effect */
.glow {
  box-shadow: 0 0 24px rgba(99, 102, 241, 0.4);
}

/* No blur spread — sharp outline */
.outline {
  box-shadow: 0 0 0 2px #6366f1;
}

/* On hover — transition it! */
.card {
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: box-shadow 250ms ease;
}
.card:hover {
  box-shadow: 0 8px 32px rgba(99,102,241,0.4);
}`}
        filename="box-shadow.css"
        demo={
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Subtle', shadow: '0 2px 8px rgba(0,0,0,0.4)', bg: '#1a1d27' },
              { label: 'Elevated', shadow: '0 4px 8px rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.3)', bg: '#1a1d27' },
              { label: 'Glow', shadow: '0 0 20px rgba(99,102,241,0.5)', bg: '#1a1d27' },
              { label: 'Inset', shadow: 'inset 0 3px 8px rgba(0,0,0,0.6)', bg: '#0f1117' },
            ].map(({ label, shadow, bg }) => (
              <div key={label} style={{ padding: '16px', background: bg, border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, boxShadow: shadow, fontSize: 12, color: '#8892a4', textAlign: 'center' }}>
                {label}
              </div>
            ))}
          </div>
        }
        tips={[
          'Layer 2-3 shadows of different sizes for natural, multi-depth shadows.',
          'box-shadow: 0 0 0 2px color works as a crisp outline that does not affect layout (unlike border).',
          'Transition box-shadow on hover for a smooth elevation effect on cards.',
        ]}
      />

      <LessonSection
        title="Backdrop Filter"
        badge="modern"
        explanation="backdrop-filter applies visual effects (blur, brightness, saturation) to the content behind the element — creating the popular frosted glass effect."
        code={`/* Frosted glass card */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
}

/* Dark frosted glass */
.dark-glass {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
}

/* Modal overlay blur */
.modal-overlay {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
}`}
        filename="backdrop-filter.css"
        demo={
          <div style={{ position: 'relative', height: 100, borderRadius: 10, overflow: 'hidden', background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #10b981 100%)' }}>
            <div style={{ position: 'absolute', top: 12, left: 12, right: 12, bottom: 12, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 600 }}>
              Frosted glass effect ✨
            </div>
          </div>
        }
        tips={[
          'backdrop-filter requires the element to have some transparency (rgba background) to be visible.',
          'Always include -webkit-backdrop-filter for Safari support.',
          'Heavy blur values on large elements can impact performance — use will-change: transform sparingly.',
        ]}
      />
    </LessonPage>
  )
}
