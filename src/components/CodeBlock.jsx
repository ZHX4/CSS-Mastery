import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './CodeBlock.module.css'

export default function CodeBlock({ code, language = 'css', filename }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span className={styles.dot} data-color="red" />
          <span className={styles.dot} data-color="yellow" />
          <span className={styles.dot} data-color="green" />
        </div>
        {filename && <span className={styles.filename}>{filename}</span>}
        <button className={styles.copyBtn} onClick={handleCopy} aria-label="Copy code">
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 12px 12px',
          fontSize: '0.875rem',
          lineHeight: '1.7',
          background: '#0d1117',
          padding: '1.25rem 1.5rem',
        }}
        showLineNumbers
        wrapLongLines
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
