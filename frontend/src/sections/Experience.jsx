import React, { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

const Experience = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll(`.${styles.tiltIn}`);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={`${styles.sectionHeader} ${styles.tiltIn}`}>
        <span className={styles.headerIndex}>02</span>
        <h2 className={styles.headerTitle}>Experience</h2>
        <div className={styles.headerDivider}></div>
      </div>

      <div className={styles.timeline}>
        {/* Reliance Experience */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineNode}></div>
          <div className={`${styles.experienceCard} ${styles.featuredCard} ${styles.tiltIn}`}>
            <span className={styles.currentBadge}>Current</span>
            
            <div className={styles.cardHeader}>
              <div className={styles.roleInfo}>
                <h3 className={styles.roleTitle}>Data & Application Engineer</h3>
                <span className={styles.companyName}>Reliance Industries</span>
              </div>
              <span className={styles.dateRange}>Aug 2024 - Present</span>
            </div>

            <div className={styles.subCardsGrid}>
              <div className={styles.subCard}>
                <h4 className={styles.subCardTitle}>Agentic AI & Document Intelligence</h4>
                <p className={styles.subCardDesc}>
                  Built an agentic document-extraction pipeline using LangGraph, Pydantic & a local LLM — achieving 97% field-level recall, 92% routing accuracy on a variance-aware evaluation suite, with template-caching cutting extraction latency 62% on recurring vendor formats.
                </p>
                <ul className={styles.stackList}>
                  <li className={styles.stackPill}>LangGraph</li>
                  <li className={styles.stackPill}>Pydantic</li>
                  <li className={styles.stackPill}>Local LLM</li>
                  <li className={styles.stackPill}>FastAPI</li>
                </ul>
              </div>
              
              <div className={styles.subCard}>
                <h4 className={styles.subCardTitle}>Supply-Chain Investigation & Data Engineering</h4>
                <p className={styles.subCardDesc}>
                  Engineered a Python-based ASN/GRN investigation engine with transaction attribution, deterministic reconciliation & evidence provenance — 93 automated tests and golden evaluation scenarios. Built an ASN Attachment App on Azure Databricks with automated data-ingestion pipelines.
                </p>
                <ul className={styles.stackList}>
                  <li className={styles.stackPill}>Python</li>
                  <li className={styles.stackPill}>Databricks</li>
                  <li className={styles.stackPill}>REST APIs</li>
                  <li className={styles.stackPill}>WSO2 IAM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* IIT Hyderabad Experience */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineNode}></div>
          <div className={`${styles.experienceCard} ${styles.tiltIn}`}>
            <div className={styles.cardHeader}>
              <div className={styles.roleInfo}>
                <h3 className={styles.roleTitle}>Research Summer Intern</h3>
                <span className={styles.companyName}>IIT Hyderabad</span>
              </div>
              <span className={styles.dateRange}>May 2023 - Jul 2023</span>
            </div>
            <p className={styles.internDesc}>
              Contributed to architecture research by developing and optimizing a RISC-V ISA simulator written in C++. Improved simulation accuracy and execution performance for advanced processor designs.
            </p>
            <ul className={styles.stackList} style={{ marginTop: '1.5rem' }}>
              <li className={styles.stackPill}>C++</li>
              <li className={styles.stackPill}>RISC-V</li>
              <li className={styles.stackPill}>Computer Architecture</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
