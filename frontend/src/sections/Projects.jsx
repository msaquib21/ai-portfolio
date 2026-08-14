import React, { useEffect, useRef } from 'react';
import styles from './Projects.module.css';

const Projects = () => {
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
    <section className={styles.section} id="projects" ref={sectionRef}>
      <div className={`${styles.header} ${styles.reveal}`}>
        <span className={styles.sectionMono}>03 — FEATURED PROJECTS</span>
        <h2 className={styles.title}>Featured Projects</h2>
        <p className={styles.subtitle}>Recent work showcasing my expertise.</p>
      </div>

      <div className={styles.projectsContainer}>
        {/* Featured Project */}
        <div className={`${styles.featuredCard} ${styles.reveal}`}>
          <div className={styles.glowCircle}></div>
          <div className={styles.cardHeader}>
            <span className={styles.tag}>AI/ML Pipeline</span>
            <h3 className={styles.featuredTitle}>Agentic Resume Analyzer</h3>
          </div>
          <p className={styles.overview}>
            Architected an agentic evaluation pipeline using a 3-node LangGraph stateful graph to process candidate resumes against job descriptions via multi-query RAG (3 query angles, 18 candidate chunks per cycle) fused via Reciprocal Rank Fusion.
          </p>
          
          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <h4 className={styles.detailHeading}>Pipeline Architecture</h4>
              <ul className={styles.detailList}>
                <li>3-node LangGraph stateful graph with multi-query RAG</li>
                <li>Reciprocal Rank Fusion across 18 candidate chunks per cycle</li>
                <li>4-stage self-healing JSON parser for resilient execution</li>
              </ul>
            </div>
            <div className={styles.detailCard}>
              <h4 className={styles.detailHeading}>Production Engineering</h4>
              <ul className={styles.detailList}>
                <li>FastAPI backend with Pydantic v2 typed contracts and SSE streaming</li>
                <li>Thread-safe SHA-256 vector store caching</li>
                <li>100% local LLM inference via Ollama (Qwen 2.5 3B)</li>
              </ul>
            </div>
          </div>

          <div className={styles.techPills}>
            {['Python', 'LangGraph', 'LangChain', 'FastAPI', 'ChromaDB', 'Pydantic', 'Ollama'].map(tech => (
              <span key={tech} className={styles.pill}>{tech}</span>
            ))}
          </div>

          <div className={styles.actions}>
            <a href="https://github.com/msaquib21" target="_blank" rel="noreferrer" className={styles.btnPrimary}>
              View on GitHub
            </a>
          </div>
        </div>

        {/* Regular Projects */}
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.reveal}`} style={{ transitionDelay: '0.1s' }}>
            <div className={styles.cardHeader}>
              <span className={styles.tag}>Data Engineering</span>
              <h3 className={styles.cardTitle}>Chess Analytics ETL Pipeline</h3>
            </div>
            <p className={styles.overview}>
              Built an end-to-end data pipeline processing 6.5M+ game records across 4 player profiles from the Chess.com API using the DLT framework, with a custom Python migration layer handling schema mapping, NULL normalization, and type conversion.
            </p>
            <div className={styles.techPills}>
              {['Python', 'DLT', 'DuckDB', 'MySQL', 'Power BI', 'DAX'].map(tech => (
                <span key={tech} className={styles.pill}>{tech}</span>
              ))}
            </div>
            <div className={styles.actions}>
              <a href="https://github.com/msaquib21" target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
