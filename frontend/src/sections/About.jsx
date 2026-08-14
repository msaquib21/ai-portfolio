import React, { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

function useReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
}

const About = () => {
  const [headerRef, headerVisible] = useReveal();
  const [bioRef, bioVisible] = useReveal();
  const [card1Ref, card1Visible] = useReveal();
  const [card2Ref, card2Visible] = useReveal();
  const [card3Ref, card3Visible] = useReveal();
  const [card4Ref, card4Visible] = useReveal();

  return (
    <section id="about" className={styles.aboutSection}>
      <div 
        ref={headerRef} 
        className={`${styles.header} ${styles.reveal} ${headerVisible ? styles.visible : ''}`}
      >
        <span className={styles.label}>01 &mdash; About</span>
        <h2 className={styles.title}>About</h2>
        <p className={styles.subtitle}>GenAI and data engineering across enterprise-grade LLM systems.</p>
        <div className={styles.divider}></div>
      </div>

      <div className={styles.content}>
        <div 
          ref={bioRef}
          className={`${styles.bioCard} ${styles.reveal} ${bioVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '100ms' }}
        >
          <p>
            I'm Mohammad Saquib, a Data &amp; Application Engineer at Reliance Industries in Navi Mumbai, promoted from Graduate Engineer Trainee. I build production LLM-powered systems &mdash; from RAG search engines over 200+ pages of MES/WMS specs using LangChain, ChromaDB, and Azure OpenAI, to Text-to-SQL engines on Databricks enabling 500+ operators to self-serve KPIs.
          </p>
          <p>
            My strongest personal build is the Agentic Resume Analyzer: a LangGraph-powered evaluation pipeline with multi-query RAG, SSE streaming, and 100% local LLM inference via Ollama. I hold a B.Tech in CS from NIT Raipur and keep sharp on DSA across LeetCode and CodeChef.
          </p>
        </div>

        <div className={styles.infoCards}>
          <div 
            ref={card1Ref}
            className={`${styles.infoCard} ${styles.reveal} ${card1Visible ? styles.visible : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Current</span>
              <span className={styles.infoValue}>Data &amp; Application Engineer, Reliance Industries</span>
            </div>
          </div>

          <div 
            ref={card2Ref}
            className={`${styles.infoCard} ${styles.reveal} ${card2Visible ? styles.visible : ''}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                <circle cx="12" cy="12" r="4"></circle>
              </svg>
            </div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Focus</span>
              <span className={styles.infoValue}>LLM Automation &amp; RAG Systems</span>
            </div>
          </div>

          <div 
            ref={card3Ref}
            className={`${styles.infoCard} ${styles.reveal} ${card3Visible ? styles.visible : ''}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Systems</span>
              <span className={styles.infoValue}>Python &middot; FastAPI &middot; Databricks</span>
            </div>
          </div>

          <div 
            ref={card4Ref}
            className={`${styles.infoCard} ${styles.reveal} ${card4Visible ? styles.visible : ''}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className={styles.iconWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Education</span>
              <span className={styles.infoValue}>B.Tech CSE, NIT Raipur</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
