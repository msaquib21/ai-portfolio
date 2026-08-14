import React, { useEffect, useRef, useState } from 'react';
import styles from './Skills.module.css';

const SKILLS_DATA = [
  { group: 'Languages', items: ['Python', 'SQL', 'C++'] },
  { group: 'GenAI / LLM', items: ['LangChain', 'LangGraph', 'RAG Systems', 'Text-to-SQL', 'ChromaDB', 'Pinecone', 'Prompt Engineering', 'Azure OpenAI', 'Ollama', 'HuggingFace'] },
  { group: 'Data Engineering', items: ['Azure Databricks', 'SQL Warehouse', 'Databricks Apps', 'DLT', 'ETL/ELT', 'DuckDB', 'MySQL', 'PostgreSQL', 'Power BI', 'DAX'] },
  { group: 'Tools & Cloud', items: ['Azure', 'Docker', 'Git/GitHub', 'REST APIs', 'WSO2 IAM', 'FastAPI', 'Pydantic', 'Postman', 'Figma'] }
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);
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

    const elements = sectionRef.current.querySelectorAll(`.${styles.reveal}`);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className={styles.section} id="skills" ref={sectionRef}>
      <div className={`${styles.header} ${styles.reveal}`}>
        <span className={styles.sectionMono}>04 — TECH STACK</span>
        <h2 className={styles.title}>Tech Stack</h2>
        <p className={styles.subtitle}>The tools I build with.</p>
      </div>

      <div className={`${styles.tabs} ${styles.reveal}`} style={{ transitionDelay: '0.1s' }}>
        {SKILLS_DATA.map((data, idx) => (
          <button
            key={idx}
            className={`${styles.tabBtn} ${activeTab === idx ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {data.group}
          </button>
        ))}
      </div>

      <div className={styles.skillsGrid}>
        {SKILLS_DATA[activeTab].items.map((skill, idx) => (
          <div 
            key={`${activeTab}-${skill}`} 
            className={styles.skillCard}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <span className={styles.skillName}>{skill}</span>
            <div className={styles.hoverLine}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
