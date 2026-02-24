import LessonPage from '../components/LessonPage'
import LessonSection from '../components/LessonSection'

export default function Animations() {
  return (
    <LessonPage
      icon="✨"
      title="Animations"
      description="CSS @keyframes animations allow multi-step, looping, and complex motion without JavaScript. They are declarative, performant, and highly composable."
      difficulty="Intermediate"
    >
      <LessonSection
        title="@keyframes & animation Property"
        explanation="Define an animation with @keyframes, then apply it with the animation shorthand. Keyframes describe the state at each point in the animation timeline."
        code={`/* Define the keyframes */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-16px); }
}

/* Apply: name duration timing-function delay
    iteration-count direction fill-mode */
.fade-in {
  animation: fadeIn 400ms ease-out both;
}

.spinner {
  animation: spin 1s linear infinite;
}

.bouncing {
  animation: bounce 1s ease-in-out infinite;
}

/* Pause/Resume */
.paused { animation-play-state: paused; }
.playing { animation-play-state: running; }`}
        filename="keyframes.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <style>{`
              @keyframes tutFadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
              @keyframes tutSpin { to { transform: rotate(360deg); } }
              @keyframes tutBounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
              @keyframes tutPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
              .tut-fade { animation: tutFadeIn 1s ease-out both; }
              .tut-spin { animation: tutSpin 2s linear infinite; display:inline-block; }
              .tut-bounce { animation: tutBounce 1s ease-in-out infinite; display:inline-block; }
              .tut-pulse { animation: tutPulse 1.5s ease-in-out infinite; }
            `}</style>
            <div className="tut-fade" style={{ padding: '6px 14px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, fontSize: 12, color: '#818cf8' }}>fadeIn animation</div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span className="tut-spin" style={{ fontSize: 20 }}>⚙️</span>
              <span style={{ fontSize: 12, color: '#8892a4' }}>spin: infinite</span>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span className="tut-bounce" style={{ fontSize: 20 }}>🎈</span>
              <span style={{ fontSize: 12, color: '#8892a4' }}>bounce: infinite</span>
            </div>
            <div className="tut-pulse" style={{ padding: '6px 14px', background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 8, fontSize: 12, color: '#06b6d4' }}>pulse: infinite</div>
          </div>
        }
        tips={[
          'Use animation-fill-mode: both to apply the first keyframe before the animation starts and keep the last after it ends.',
          'Keep animations under 300ms for UI feedback; use longer durations for decorative/illustrative animations.',
          'animation: spin 1s linear infinite is the standard loading spinner pattern.',
        ]}
      />

      <LessonSection
        title="Staggered Animations"
        explanation="Use animation-delay to create staggered effects where multiple elements animate one after another — a powerful technique for lists and grids."
        code={`/* Parent — no animation needed */
.list {}

/* Each child gets an increasing delay */
.list-item {
  animation: fadeSlideIn 400ms ease-out both;
}

.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 80ms; }
.list-item:nth-child(3) { animation-delay: 160ms; }
.list-item:nth-child(4) { animation-delay: 240ms; }

/* In React — use inline style for dynamic delay */
/* style={{ animationDelay: \`\${index * 80}ms\` }} */

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}
        filename="staggered.css"
        demo={
          <div>
            <style>{`
              @keyframes tutSlide { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
            `}</style>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['First item', 'Second item', 'Third item', 'Fourth item'].map((item, i) => (
                <div
                  key={item}
                  style={{
                    padding: '6px 12px',
                    background: `rgba(99,102,241,${0.08 + i * 0.04})`,
                    border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: 8,
                    fontSize: 12,
                    color: '#818cf8',
                    animation: 'tutSlide 400ms ease-out both',
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        }
        tips={[
          'Keep stagger delays short (50-100ms) — longer values make the animation feel sluggish.',
          'In React, pass animationDelay via inline styles to stagger JSX-rendered lists.',
        ]}
      />

      <LessonSection
        title="Reduced Motion Accessibility"
        explanation="Some users configure their OS to reduce motion due to vestibular disorders. Always respect this with the prefers-reduced-motion media query."
        code={`/* Default — full animation */
.hero-title {
  animation: heroSlideIn 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  /* Option 1: Remove animation entirely */
  .hero-title { animation: none; }

  /* Option 2: Keep but make instantaneous */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Or use the CSS custom media query approach */
@media (prefers-reduced-motion: no-preference) {
  .hero-title {
    animation: heroSlideIn 600ms ease both;
  }
  /* animations only applied when motion is OK */
}`}
        filename="reduced-motion.css"
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ padding: '8px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 12, color: '#10b981' }}>
              ✅ Full animations for users who prefer motion
            </div>
            <div style={{ padding: '8px 12px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, fontSize: 12, color: '#f59e0b' }}>
              ♿ No animations for prefers-reduced-motion users
            </div>
            <div style={{ fontSize: 11, color: '#4a5568', fontFamily: 'Fira Code, monospace' }}>
              @media (prefers-reduced-motion: reduce)
            </div>
          </div>
        }
        tips={[
          'prefers-reduced-motion is a WCAG 2.1 Success Criterion — not optional for accessible sites.',
          'Consider showing a simplified version rather than removing all motion: fade instead of slide.',
          'Test with "Reduce Motion" enabled in your OS accessibility settings.',
        ]}
      />
    </LessonPage>
  )
}
