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
                <h4 className={styles.subCardTitle}>Agentic AI & LLM Engineering</h4>
                <p className={styles.subCardDesc}>
                  Built a RAG-powered search engine over 200+ pages of MES/WMS specs using LangChain, ChromaDB & Azure OpenAI — achieving 90% retrieval accuracy at sub-7s latency. Shipped a Text-to-SQL engine with ReAct agent loops on Databricks SQL Warehouse (91% accuracy, 500+ users, 60% ticket reduction).
                </p>
                <ul className={styles.stackList}>
                  <li className={styles.stackPill}>LangChain</li>
                  <li className={styles.stackPill}>LangGraph</li>
                  <li className={styles.stackPill}>ChromaDB</li>
                  <li className={styles.stackPill}>Azure OpenAI</li>
                  <li className={styles.stackPill}>RAG</li>
                </ul>
              </div>
              
              <div className={styles.subCard}>
                <h4 className={styles.subCardTitle}>Data Engineering & Platform Automation</h4>
                <p className={styles.subCardDesc}>
                  Engineered an ASN Attachment App on Azure Databricks Apps with automated API-based data pipelines for supplier portal integration. Secured REST API data flows across 4+ teams via WSO2 IAM with strict RBAC for 500+ active shop-floor users.
                </p>
                <ul className={styles.stackList}>
                  <li className={styles.stackPill}>Databricks</li>
                  <li className={styles.stackPill}>FastAPI</li>
                  <li className={styles.stackPill}>WSO2 IAM</li>
                  <li className={styles.stackPill}>REST APIs</li>
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
