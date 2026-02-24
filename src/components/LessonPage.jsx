import styles from './LessonPage.module.css'

export default function LessonPage({ icon, title, description, difficulty, children }) {
  const difficultyColors = {
    Beginner: 'beginner',
    Intermediate: 'intermediate',
    Advanced: 'advanced',
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.iconWrap}>{icon}</div>
        <div className={styles.meta}>
          <div className={styles.metaTop}>
            <h1 className={styles.title}>{title}</h1>
            {difficulty && (
              <span className={`${styles.difficulty} ${styles[difficultyColors[difficulty] || 'beginner']}`}>
                {difficulty}
              </span>
            )}
          </div>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </header>

      <div className={styles.content}>{children}</div>
    </div>
  )
}
