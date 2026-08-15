import React, { useState, useEffect, useRef } from 'react';
import styles from './Skills.module.css';

const skillsData = {
  "Languages": ["Python", "SQL", "C++"],
  "GenAI / LLM": ["LangChain", "LangGraph", "RAG Systems", "Text-to-SQL", "ChromaDB", "Pinecone", "Prompt Engineering", "Azure OpenAI", "Ollama", "HuggingFace"],
  "Data Engineering": ["Azure Databricks", "SQL Warehouse", "Databricks Apps", "DLT", "ETL/ELT", "DuckDB", "MySQL", "PostgreSQL", "Power BI", "DAX"],
  "Tools & Cloud": ["Azure", "Docker", "Git/GitHub", "REST APIs", "WSO2 IAM", "FastAPI", "Pydantic", "Postman", "Figma"]
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("Languages");
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
      { threshold: 0.1 }
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
          <h2 className={styles.sectionTitle}>TECH STACK</h2>
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
