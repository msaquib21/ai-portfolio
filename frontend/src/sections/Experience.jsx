import React, { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

const experienceData = [
  {
    id: 1,
    company: "Reliance Industries Limited",
    role: "Data & Application Engineer",
    period: "August 2024 – Present",
    location: "Navi Mumbai, India",
    isCurrent: true,
    note: "Promoted from Graduate Engineer Trainee",
    subAreas: [
      {
        area: "GenAI / LLM Engineering",
        title: "RAG & Text-to-SQL Systems",
        description: "Built a RAG-powered search engine over 200+ pages of MES/WMS specs using LangChain, ChromaDB, and Azure OpenAI (GPT-4o), achieving 90% retrieval accuracy. Shipped a Text-to-SQL engine on Databricks SQL Warehouse using LangChain SQLDatabaseToolkit and ReAct agent loops, achieving 91% query accuracy.",
        stack: ["Python", "LangChain", "ChromaDB", "Azure OpenAI", "Databricks", "SQL"]
      },
      {
        area: "Data Engineering",
        title: "Databricks Apps & API Pipelines",
        description: "Engineered ASN Attachment App on Databricks Apps and automated API-based data pipelines with supplier portals. Secured REST API data flow across 4+ teams via WSO2 IAM with Role-Based Access Control for 500+ users.",
        stack: ["Azure Databricks", "FastAPI", "REST APIs", "WSO2 IAM", "Python"]
      }
    ]
  },
  {
    id: 2,
    company: "IIT Hyderabad",
    role: "Research Summer Intern",
    period: "May 2023 – July 2023",
    location: "Hyderabad, India (Remote)",
    isCurrent: false,
    points: [
      "Implemented a RISC-V ISA simulator emulating core instruction set architecture behavior in C++, demonstrating low-level systems execution, memory alignment, and computer architecture principles."
    ],
    stack: ["C++", "RISC-V", "Computer Architecture"]
  }
];

const Experience = () => {
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            // Once visible, we can stop observing it if we want it to animate only once
            // observer.unobserve(entry.target); 
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
      }
    );

    const currentRefs = itemRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className={styles.section} id="experience">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.monoLabel}>02 — EXPERIENCE</span>
          <h2 className={styles.title}>Where I've Worked</h2>
          <p className={styles.subtitle}>Professional journey and impact.</p>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.timeline}>
          {experienceData.map((exp, index) => (
            <div
              key={exp.id}
              className={styles.timelineItem}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className={`${styles.timelineDot} ${exp.isCurrent ? styles.current : ''}`}></div>
              
              <div className={`${styles.glassCard} ${exp.isCurrent ? styles.currentCard : ''}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.roleInfo}>
                    <h3>{exp.role}</h3>
                    <div className={styles.company}>{exp.company}</div>
                    <div className={styles.location}>{exp.location}</div>
                  </div>
                  
                  <div className={styles.metaInfo}>
                    {exp.isCurrent && <span className={styles.currentBadge}>Current</span>}
                    <div className={styles.period}>{exp.period}</div>
                  </div>
                </div>

                {exp.note && <div className={styles.note}>{exp.note}</div>}

                {exp.subAreas && (
                  <div className={styles.subAreasGrid}>
                    {exp.subAreas.map((sub, idx) => (
                      <div key={idx} className={styles.subAreaCard}>
                        <span className={styles.areaLabel}>{sub.area}</span>
                        <h4>{sub.title}</h4>
                        <p>{sub.description}</p>
                        <div className={styles.techStack}>
                          {sub.stack.map((tech, i) => (
                            <span key={i} className={styles.techPill}>{tech}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {exp.points && (
                  <ul className={styles.bulletPoints}>
                    {exp.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}

                {exp.stack && !exp.subAreas && (
                  <div className={styles.techStack}>
                    {exp.stack.map((tech, idx) => (
                      <span key={idx} className={styles.techPill}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
