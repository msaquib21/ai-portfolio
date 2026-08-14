import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const ROLES = [
  'Data & Application Engineer',
  'GenAI Engineer',
  'LLM Builder',
  'RAG Systems Architect'
];

export default function Hero({ onOpenChat }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentRole = ROLES[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          timeout = setTimeout(handleTyping, 100);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          timeout = setTimeout(handleTyping, 50);
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
          timeout = setTimeout(handleTyping, 500);
        }
      }
    };

    timeout = setTimeout(handleTyping, 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.leftContent}>
          <div className={styles.statusBadge}>
            <div className={styles.pulseDot} />
            <span className={styles.statusText}>Available for GenAI & Data Engineering roles</span>
          </div>

          <div className={styles.headingWrapper}>
            <h1 className={styles.headingLine1}>Mohammad</h1>
            <h1 className={styles.headingLine2}>Saquib</h1>
          </div>

          <div className={styles.typewriterWrapper}>
            <span>{displayText}</span>
            <span className={styles.cursor}>▌</span>
          </div>

          <p className={styles.subtitle}>
            Data &amp; Application Engineer at Reliance Industries — building RAG systems, Text-to-SQL engines, and LLM-powered automation for enterprise workflows.
          </p>

          <div className={styles.ctaGroup}>
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onOpenChat}>
              <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Ask My AI
            </button>
            <a href="/Mohammad_Saquib_Resume.pdf" download="Mohammad_Saquib_Resume.pdf" className={`${styles.btn} ${styles.btnGlass}`}>
              <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Resume
            </a>
            <a href="#contact" className={`${styles.btn} ${styles.btnOutline}`}>
              <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Content */}
        <div className={styles.rightContent}>
          <div className={styles.terminalWrapper}>
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <div className={`${styles.dot} ${styles.dotRed}`}></div>
                <div className={`${styles.dot} ${styles.dotYellow}`}></div>
                <div className={`${styles.dot} ${styles.dotGreen}`}></div>
                <span className={styles.terminalTitle}>bash — 80x24</span>
              </div>
              <div className={styles.terminalBody}>
                <div className={styles.terminalLine}>
                  <span className={styles.prompt}>$</span> <span className={styles.command}>whoami</span>
                </div>
                <div className={styles.terminalLine}>
                  <span className={styles.output}>&gt; Mohammad Saquib — Data &amp; Application Engineer</span>
                </div>
                <div className={styles.terminalLine}>
                  <span className={styles.prompt}>$</span> <span className={styles.command}>cat focus.json</span>
                </div>
                <div className={styles.terminalLine}>
                  <span className={styles.output}>&nbsp;&nbsp;{'{'} "genai": "LangChain + RAG + Azure OpenAI", "data": "Databricks + SQL", "lang": "Python" {'}'}</span>
                </div>
                <div className={styles.terminalLine}>
                  <span className={styles.prompt}>$</span> <span className={styles.command}>agent.run('parse resume')</span>
                </div>
                <div className={styles.terminalLine}>
                  <span className={styles.success}>✓ pipeline executed successfully</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
