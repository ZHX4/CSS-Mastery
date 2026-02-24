import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import styles from './Layout.module.css'
import { LESSONS } from '../data/lessons'

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const currentLesson = LESSONS.flatMap(g => g.items).find(i => i.path === location.pathname)
  const contentRef = useRef(null)

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className={styles.root}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6"  x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className={styles.breadcrumb}>
            <span>CSS Mastery</span>
            {currentLesson && (
              <>
                <span className={styles.sep}>/</span>
                <span className={styles.current}>
                  {currentLesson.icon} {currentLesson.label}
                </span>
              </>
            )}
          </div>

          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mdnLink}
          >
            MDN Docs
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </header>

        <main ref={contentRef} className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}
