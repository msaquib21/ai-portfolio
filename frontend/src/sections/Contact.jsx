import React, { useEffect, useRef } from 'react';
import styles from './Contact.module.css';

export default function Contact({ onOpenChat }) {
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

    return () => observer.disconnect();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className={styles.contactSection} ref={sectionRef}>
      <div className={styles.container}>
        <span className={styles.sectionNumber}>06 &mdash; CONTACT</span>
        
        <div className={styles.cardContainer}>
          <div className={styles.mainCard}>
            <div className={styles.cardContent}>
              <div className={styles.leftCol}>
                <h2 className={styles.heading}>
                  Let's talk about <br />
                  <span className={styles.gradientText}>AI & data.</span>
                </h2>
                <p className={styles.subtitle}>
                  Open for opportunities and exciting collaborations.
                  Reach out or ask my AI assistant for more details about my experience.
                </p>
                <div className={styles.buttonGroup}>
                  <a href="mailto:m.saquib419@gmail.com" className={styles.primaryButton}>
                    Email Me
                  </a>
                  <a href="/Mohammad_Saquib_Resume.pdf" download className={styles.secondaryButton}>
                    Resume
                  </a>
                  {onOpenChat && (
                    <button onClick={onOpenChat} className={styles.outlineButton}>
                      Ask My AI
                    </button>
                  )}
                </div>
              </div>
              
              <div className={styles.rightCol}>
                <div className={styles.tilesGrid}>
                  <a href="mailto:m.saquib419@gmail.com" className={styles.tile}>
                    <span className={styles.tileLabel}>EMAIL</span>
                    <span className={styles.tileValue}>m.saquib419@gmail.com</span>
                  </a>
                  <div className={styles.tile}>
                    <span className={styles.tileLabel}>PHONE</span>
                    <span className={styles.tileValue}>+91-9238612129</span>
                  </div>
                  <div className={styles.tile}>
                    <span className={styles.tileLabel}>LOCATION</span>
                    <span className={styles.tileValue}>Navi Mumbai, India</span>
                  </div>
                  <a href="https://github.com/msaquib21" target="_blank" rel="noopener noreferrer" className={styles.tile}>
                    <span className={styles.tileLabel}>GITHUB</span>
                    <span className={styles.tileValue}>msaquib21</span>
                  </a>
                  <a href="https://linkedin.com/in/msaquib21" target="_blank" rel="noopener noreferrer" className={styles.tile}>
                    <span className={styles.tileLabel}>LINKEDIN</span>
                    <span className={styles.tileValue}>msaquib21</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} Mohammad Saquib. All rights reserved.</p>
          <button onClick={handleScrollToTop} className={styles.backToTop}>
            BACK TO TOP &uarr;
          </button>
        </footer>
      </div>
    </section>
  );
}
