import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { LESSONS } from '../data/lessons'
import styles from './Sidebar.module.css'

export default function Sidebar({ mobileOpen, onClose }) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState({})

  const toggle = (group) =>
    setCollapsed((prev) => ({ ...prev, [group]: !prev[group] }))

  return (
    <>
      <nav className={`${styles.sidebar} ${mobileOpen ? styles.open : ''}`}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>🎨</span>
          <div>
            <div className={styles.brandName}>CSS Mastery</div>
            <div className={styles.brandSub}>Interactive Tutorial</div>
          </div>
        </div>

        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${getProgress(location.pathname)}%` }}
            />
          </div>
          <span className={styles.progressLabel}>{getProgress(location.pathname)}% complete</span>
        </div>

        <div className={styles.nav}>
          {LESSONS.map(({ group, items }) => (
            <div key={group} className={styles.group}>
              <button
                className={styles.groupLabel}
                onClick={() => toggle(group)}
                aria-expanded={!collapsed[group]}
              >
                <span>{group}</span>
                <svg
                  className={`${styles.chevron} ${collapsed[group] ? styles.chevronUp : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {!collapsed[group] && (
                <ul className={styles.list}>
                  {items.map(({ path, label, icon }) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        end={path === '/'}
                        className={({ isActive }) =>
                          `${styles.link} ${isActive ? styles.active : ''}`
                        }
                        onClick={onClose}
                      >
                        <span className={styles.linkIcon}>{icon}</span>
                        <span className={styles.linkLabel}>{label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </nav>

      {mobileOpen && (
        <div className={styles.backdrop} onClick={onClose} />
      )}
    </>
  )
}

function getProgress(path) {
  const allPaths = LESSONS.flatMap((g) => g.items.map((i) => i.path))
  const idx = allPaths.indexOf(path)
  if (idx < 0) return 0
  return Math.round(((idx + 1) / allPaths.length) * 100)
}
