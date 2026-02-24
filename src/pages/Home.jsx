import { Link } from 'react-router-dom'
import { LESSONS } from '../data/lessons'
import styles from './Home.module.css'

const STATS = [
  { value: '18', label: 'Lessons' },
  { value: '60+', label: 'Examples' },
  { value: '4', label: 'Skill Levels' },
  { value: '100%', label: 'Interactive' },
]

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroBadge}>Interactive Learning Experience</div>
        <h1 className={styles.heroTitle}>
          Master CSS with{' '}
          <span className={styles.heroAccent}>confidence</span>
        </h1>
        <p className={styles.heroSub}>
          A comprehensive, hands-on tutorial covering every essential CSS concept —
          from fundamentals to modern techniques. Each lesson includes live demos,
          real code examples, and professional tips.
        </p>
        <div className={styles.heroActions}>
          <Link to="/selectors" className={styles.btnPrimary}>
            Start Learning
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link to="/flexbox" className={styles.btnSecondary}>
            Jump to Flexbox ↔️
          </Link>
        </div>

        <div className={styles.stats}>
          {STATS.map(({ value, label }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section className={styles.curriculum}>
        <h2 className={styles.sectionTitle}>Curriculum</h2>
        <div className={styles.groups}>
          {LESSONS.map(({ group, items }) => (
            <div key={group} className={styles.group}>
              <h3 className={styles.groupTitle}>{group}</h3>
              <div className={styles.cards}>
                {items.map(({ path, label, icon }) => (
                  <Link key={path} to={path} className={styles.card}>
                    <span className={styles.cardIcon}>{icon}</span>
                    <span className={styles.cardLabel}>{label}</span>
                    <svg className={styles.cardArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>What you'll get</h2>
        <div className={styles.featureGrid}>
          {[
            { icon: '💻', title: 'Live Demos', desc: 'Every concept has an interactive preview rendered right in the browser.' },
            { icon: '📋', title: 'Code Examples', desc: 'Copy-ready, syntax-highlighted code for each CSS technique.' },
            { icon: '💡', title: 'Best Practices', desc: 'Professional tips and patterns used in real-world production code.' },
            { icon: '📈', title: 'Logical Progression', desc: 'Topics build on each other from basics to advanced techniques.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className={styles.feature}>
              <div className={styles.featureIcon}>{icon}</div>
              <h4 className={styles.featureTitle}>{title}</h4>
              <p className={styles.featureDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
