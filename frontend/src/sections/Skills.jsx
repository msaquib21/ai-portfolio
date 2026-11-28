import React, { useState, useEffect, useRef } from 'react';
import styles from './Skills.module.css';

const skillsData = {
  "Product Craft": ["Product Discovery", "PRDs & Functional Specs", "Root-Cause Analysis", "Wireframing & Prototyping", "Prioritization & Phased Rollouts", "UAT & Delivery"],
  "Data & Experimentation": ["SQL", "Product Analytics (PostHog / Mixpanel)", "Event Instrumentation", "A/B Test Design & Sizing", "Product Metrics & Guardrails", "Azure Databricks"],
  "AI Product": ["LLM Evals & Golden Datasets (Promptfoo / Langfuse)", "AI Guardrails & Fallbacks", "Prompt Engineering & Structured Outputs", "Cost/Latency Optimization", "Hybrid LLM/Deterministic Design"],
  "Technical & Tools": ["REST APIs (Postman / OpenAPI)", "Enterprise Integrations (SAP, WMS, MES)", "Python", "Figma", "Jira", "Notion", "GitHub"]
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("Product Craft");
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll(`.${styles.reveal}`);
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Trigger animation when tab changes
  useEffect(() => {
    if (gridRef.current) {
      const tiles = gridRef.current.querySelectorAll(`.${styles.skillTile}`);
      tiles.forEach((tile) => {
        tile.classList.remove(styles.animateIn);
        // trigger reflow
        void tile.offsetWidth;
        tile.classList.add(styles.animateIn);
      });
    }
  }, [activeTab]);

  return (
    <section className={styles.section} id="skills" ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.reveal}`}>
          <span className={styles.sectionNumber}>04</span>
          <h2 className={styles.sectionTitle}>PRODUCT &amp; TECH STACK</h2>
          <div className={styles.headerLine}></div>
        </div>

        <div className={`${styles.content} ${styles.reveal}`}>
          <div className={styles.tabsContainer}>
            {Object.keys(skillsData).map((tab) => (
              <button
                key={tab}
                className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.skillsGrid} ref={gridRef}>
            {skillsData[activeTab].map((skill, index) => (
              <div 
                key={`${activeTab}-${skill}`} 
                className={styles.skillTile}
                style={{ '--stagger-idx': index }}
              >
                <div className={styles.tileContent}>
                  <span className={styles.skillName}>{skill}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
