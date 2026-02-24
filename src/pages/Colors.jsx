import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

function ColorFormatsDemo() {
    const formats = [
        { label: 'Named', value: 'tomato', bg: 'tomato' },
        { label: 'HEX', value: '#6366f1', bg: '#6366f1' },
        { label: 'RGB', value: 'rgb(6,182,212)', bg: 'rgb(6,182,212)' },
        { label: 'HSL', value: 'hsl(271,81%,56%)', bg: 'hsl(271,81%,56%)' },
        { label: 'OKLCH', value: 'oklch(70% .2 250)', bg: 'oklch(70% .2 250)' },
        { label: 'Transparent', value: 'rgba(99,102,241,.4)', bg: 'rgba(99,102,241,.4)' },
    ]
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {formats.map(({ label, value, bg }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <div style={{ width: '100%', height: 40, background: bg, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }} />
                    <span style={{ fontSize: 10, color: '#8892a4' }}>{label}</span>
                </div>
            ))}
        </div>
    )
}

function GradientDemo() {
    const grads = [
        { label: 'linear-gradient', bg: 'linear-gradient(135deg, #6366f1, #06b6d4)' },
        { label: 'radial-gradient', bg: 'radial-gradient(circle, #f59e0b, #ef4444)' },
        { label: 'conic-gradient', bg: 'conic-gradient(from 0deg, #6366f1, #06b6d4, #10b981, #6366f1)' },
        { label: 'multi-stop', bg: 'linear-gradient(to right, #0f1117 0%, #6366f1 50%, #06b6d4 100%)' },
    ]
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {grads.map(({ label, bg }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 60, height: 30, background: bg, borderRadius: 6, flexShrink: 0 }} />
                    <code style={{ fontSize: 11, color: '#8892a4', fontFamily: 'Fira Code, monospace' }}>{label}</code>
                </div>
            ))}
        </div>
    )
}

function OpacityDemo() {
    return (
        <div style={{ position: 'relative', height: 100 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #6366f1, #06b6d4)', borderRadius: 8 }} />
            {[1, 0.7, 0.4, 0.15].map((op, i) => (
                <div key={op} style={{
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    left: i * 30,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#0f1117',
                    opacity: op,
                    borderRadius: 8,
                    border: '2px solid rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    color: '#fff',
                    fontFamily: 'Fira Code, monospace',
                }}>
                    {op}
                </div>
            ))}
        </div>
    )
}

export default function Colors() {
    return (
        <LessonPage
            icon="🎨"
            title="Colors"
            description="CSS supports multiple color formats, gradients, and transparency controls. Modern formats like OKLCH provide perceptually uniform color manipulation."
            difficulty="Beginner"
        >
            <LessonSection
                title="Color Formats"
                explanation="CSS accepts color values in many formats. HEX and RGB are most common, but HSL and OKLCH are more human-friendly for creating color palettes."
                code={`/* Named colors — 140+ keywords */
color: tomato;
color: cornflowerblue;

/* HEX — #RRGGBB or shorthand #RGB */
color: #6366f1;
color: #63f;  /* shorthand */
color: #6366f180; /* with alpha (last 2 hex digits) */

/* RGB / RGBA */
color: rgb(99, 102, 241);
color: rgba(99, 102, 241, 0.5); /* 50% opacity */
color: rgb(99 102 241 / 50%);   /* modern space syntax */

/* HSL — Hue (0-360°), Saturation, Lightness */
color: hsl(239, 84%, 67%);
color: hsl(239deg 84% 67% / 80%);

/* OKLCH — perceptually uniform (modern CSS) */
color: oklch(65% 0.2 258);
/* lightness% chroma hue-angle */`}
                filename="color-formats.css"
                demo={<ColorFormatsDemo />}
                tips={[
                    'Use HSL or OKLCH when building color palettes — adjust lightness/chroma while keeping the same hue.',
                    'HEX with alpha (#RRGGBBAA) shorthand works in all modern browsers.',
                    'OKLCH produces more visually consistent gradients between two colors than RGB.',
                ]}
            />

            <LessonSection
                title="Gradients"
                explanation="CSS gradients are images created by the browser — they can be used anywhere an image is expected. Three types: linear, radial, and conic."
                code={`/* Linear gradient */
background: linear-gradient(135deg, #6366f1, #06b6d4);
background: linear-gradient(to right, #0f1117, #6366f1 50%, #06b6d4);

/* Radial gradient */
background: radial-gradient(circle at center, #f59e0b, #ef4444);
background: radial-gradient(ellipse 80% 60% at 50% 40%, #6366f1, transparent);

/* Conic gradient */
background: conic-gradient(from 0deg, #6366f1, #06b6d4, #10b981, #6366f1);

/* Stacked gradients (multiple backgrounds) */
background:
  linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
  url('image.jpg') center/cover;`}
                filename="gradients.css"
                demo={<GradientDemo />}
                tips={[
                    'Use multiple comma-separated backgrounds to stack a gradient overlay on top of an image.',
                    'Add many small color stops to create noise/texture effects with a gradient.',
                    'linear-gradient(in oklch, red, blue) interpolates in OKLCH space for vivid gradients.',
                ]}
            />

            <LessonSection
                title="Opacity & Transparency"
                explanation="There are two ways to add transparency: the opacity property (affects the whole element including children) or an alpha channel in the color value (only affects that color)."
                code={`/* opacity — affects entire element + all children */
.overlay { opacity: 0.5; }  /* 0 = invisible, 1 = opaque */

/* Alpha channel — only this color is transparent */
.card {
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
  /* Children are NOT affected */
}

/* Transparent keyword */
.ghost { background: transparent; }

/* CSS variable with alpha */
:root { --primary: 99 102 241; }
.tinted {
  background: rgb(var(--primary) / 0.2);
}`}
                filename="opacity.css"
                demo={<OpacityDemo />}
                tips={[
                    'Prefer rgba/alpha channels over the opacity property so children are not affected.',
                    'opacity: 0 still makes an element interactive (it receives clicks). Use visibility: hidden or pointer-events: none to disable.',
                    'Split color channels into CSS variables to reuse them at different opacities.',
                ]}
            />

            <LessonSection
                title="currentColor & inherit"
                explanation="currentColor is a special keyword that references the current element's color value, making it easy to keep SVG icons and borders in sync with text color."
                code={`/* currentColor mirrors the element's own color value */
.btn {
  color: #6366f1;
  border: 2px solid currentColor;  /* matches color */
}

.btn svg {
  fill: currentColor;  /* icon matches button text */
}

.btn:hover {
  color: #818cf8;
  /* border and icon automatically follow */
}

/* inherit — explicitly take the parent's value */
.child { color: inherit; }

/* initial — reset to browser default */
.reset { color: initial; }

/* unset — inherit if inherited, otherwise initial */
.unset { color: unset; }`}
                filename="current-color.css"
                demo={
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        {['#6366f1', '#10b981', '#f59e0b', '#ef4444'].map(c => (
                            <div key={c} style={{ padding: '8px 14px', border: `2px solid ${c}`, borderRadius: 8, color: c, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                                currentColor
                            </div>
                        ))}
                    </div>
                }
                tips={[
                    'Use currentColor on SVG icons — the icon color will automatically match surrounding text.',
                    'currentColor is inherited, so setting it on a parent propagates through all child SVG icons.',
                ]}
            />
        </LessonPage>
    )
}
