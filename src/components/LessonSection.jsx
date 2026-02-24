import CodeBlock from './CodeBlock'
import styles from './LessonSection.module.css'

export default function LessonSection({
  title,
  subtitle,
  explanation,
  code,
  language = 'css',
  filename,
  demo,
  tips = [],
  badge,
}) {
  return (
    <section className={styles.section}>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>{title}</h3>
        {badge && <span className={`${styles.badge} ${styles[`badge--${badge}`]}`}>{badge}</span>}
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      {explanation && (
        <div className={styles.explanation}>
          {typeof explanation === 'string' ? <p>{explanation}</p> : explanation}
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.codeCol}>
          <div className={styles.colLabel}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Code
          </div>
          <CodeBlock code={code} language={language} filename={filename} />
        </div>

        {demo && (
          <div className={styles.demoCol}>
            <div className={styles.colLabel}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Live Preview
            </div>
            <div className={styles.demoBox}>{demo}</div>
          </div>
        )}
      </div>

      {tips.length > 0 && (
        <div className={styles.tips}>
          <div className={styles.tipsHeader}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Tips & Best Practices
          </div>
          <ul className={styles.tipsList}>
            {tips.map((tip, i) => (
              <li key={i} className={styles.tip}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
