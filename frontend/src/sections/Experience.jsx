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
                <h3 className={styles.roleTitle}>Technical Program Manager</h3>
                <span className={styles.companyName}>Reliance Industries</span>
              </div>
              <span className={styles.dateRange}>Aug 2024 - Present</span>
            </div>

            <div className={styles.subCardsGrid}>
              <div className={styles.subCard}>
                <h4 className={styles.subCardTitle}>Enterprise Product Delivery · SAP, WMS & Databricks</h4>
                <p className={styles.subCardDesc}>
                  Owned requirements definition and API enablement for the SAP-to-WMS GRN data flow, aligning business, SAP, security and vendor teams on scope and technical trade-offs; digitized supplier quality-document workflows end to end across SQA, SCM, SAP, data engineering and application teams.
                </p>
                <ul className={styles.stackList}>
                  <li className={styles.stackPill}>SAP</li>
                  <li className={styles.stackPill}>WMS</li>
                  <li className={styles.stackPill}>REST APIs</li>
                  <li className={styles.stackPill}>Databricks</li>
                  <li className={styles.stackPill}>Jira</li>
                </ul>
              </div>
              
              <div className={styles.subCard}>
                <h4 className={styles.subCardTitle}>AI Product Development</h4>
                <p className={styles.subCardDesc}>
                  Built the product foundation for agentic AI: an agentic document-extraction pipeline via LangGraph, Pydantic and local LLMs achieving 97% field-level recall, 92% routing accuracy, with template caching cutting extraction latency 62%; plus a deterministic supply-chain investigation engine with 93 automated tests.
                </p>
                <ul className={styles.stackList}>
                  <li className={styles.stackPill}>LangGraph</li>
                  <li className={styles.stackPill}>Pydantic</li>
                  <li className={styles.stackPill}>Python</li>
                  <li className={styles.stackPill}>Local LLM</li>
                  <li className={styles.stackPill}>FastAPI</li>
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
