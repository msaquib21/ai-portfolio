import React, { useEffect, useRef } from 'react';
import styles from './Contact.module.css';

const Contact = ({ onOpenChat }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.section} ref={sectionRef} id="contact">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>06 — CONTACT</span>
          <h2 className={styles.title}>Contact</h2>
          <p className={styles.subtitle}>Open to GenAI and data engineering opportunities.</p>
        </div>

        <div className={styles.glowRing}>
          <div className={styles.card}>
            <div className={styles.leftSide}>
              <h3 className={styles.heading}>
                Let's talk about <span className={styles.gradientText}>AI & data.</span>
              </h3>
              <p className={styles.cardSubtitle}>
                The fastest way to reach me is email — I reply to everything.
              </p>
              <div className={styles.buttonGroup}>
                <a href="mailto:m.saquib419@gmail.com" className={styles.primaryButton}>
                  Email Me
                </a>
                <a href="/Mohammad_Saquib_Resume.pdf" download="Mohammad_Saquib_Resume.pdf" className={styles.outlineButton}>
                  Resume
                </a>
                {onOpenChat && (
                  <button onClick={onOpenChat} className={styles.aiButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    Ask My AI
                  </button>
                )}
              </div>
            </div>

            <div className={styles.rightSide}>
              <div className={styles.contactList}>
                <a href="mailto:m.saquib419@gmail.com" className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <span className={styles.contactText}>m.saquib419@gmail.com</span>
                </a>
                
                <div className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <span className={styles.contactText}>+91-9238612129</span>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <span className={styles.contactText}>Navi Mumbai, India</span>
                </div>

                <a href="https://github.com/msaquib21" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  </div>
                  <span className={styles.contactText}>github.com/msaquib21</span>
                </a>

                <a href="https://linkedin.com/in/msaquib21" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </div>
                  <span className={styles.contactText}>linkedin.com/in/msaquib21</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <p>© 2024 Mohammad Saquib</p>
          <a href="#top" onClick={scrollToTop} className={styles.backToTop}>
            back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
