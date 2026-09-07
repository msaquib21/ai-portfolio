import React, { useEffect, useRef } from 'react';
import styles from './Projects.module.css';

const Projects = () => {
  const sectionRef = useRef(null);

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

  return (
    <section className={styles.section} id="projects" ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.reveal}`}>
          <span className={styles.sectionNumber}>03</span>
          <h2 className={styles.sectionTitle}>FEATURED PROJECTS</h2>
          <div className={styles.headerLine}></div>
        </div>

        <div className={styles.projectsGrid}>
          {/* Featured Project */}
          <div className={`${styles.featuredProject} ${styles.reveal}`}>
            <div className={styles.projectHeader}>
              <span className={styles.projectTag}>AI/ML Pipeline</span>
              <h3 className={styles.projectTitle}>Agentic Resume Analyzer</h3>
              <p className={styles.projectOverview}>
                Architected an agentic evaluation pipeline using a 3-node LangGraph stateful graph to process candidate resumes against job descriptions via multi-query RAG fused via Reciprocal Rank Fusion.
              </p>
            </div>
            
            <div className={styles.projectDetails}>
              <div className={styles.detailCard}>
                <h4>Pipeline Architecture</h4>
                <p>3-node LangGraph stateful graph with conditional edges for agentic resume evaluation against job descriptions</p>
              </div>
              <div className={styles.detailCard}>
                <h4>Retrieval Strategy</h4>
                <p>Multi-query RAG with Reciprocal Rank Fusion (RRF) over ChromaDB vector store for precise candidate matching</p>
              </div>
              <div className={styles.detailCard}>
                <h4>Production Engineering</h4>
                <p>FastAPI backend with SSE streaming, Pydantic schema validation, and SHA-256 caching for instant repeat queries</p>
              </div>
              <div className={styles.detailCard}>
                <h4>Local LLM Inference</h4>
                <p>Deployed Ollama with Qwen 2.5 3B for privacy-first, zero-cost local inference with self-healing JSON parser</p>
              </div>
            </div>

            <div className={styles.techStack}>
              {['Python', 'LangGraph', 'LangChain', 'FastAPI', 'ChromaDB', 'Pydantic', 'Ollama'].map((tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>

            <div className={styles.projectLinks}>
              <a href="https://github.com/msaquib21" target="_blank" rel="noreferrer" className={styles.githubLink}>
                View on GitHub
                <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Secondary Project */}
          <div className={`${styles.secondaryProject} ${styles.reveal}`}>
            <div className={styles.projectHeader}>
              <span className={styles.projectTag}>Data Engineering</span>
              <h3 className={styles.projectTitle}>Chess Analytics ETL Pipeline</h3>
              <p className={styles.projectOverview}>
                Built an end-to-end pipeline processing 6.5M+ game records from Chess.com API with DLT framework and Power BI dashboard with 10+ DAX measures.
              </p>
            </div>
            
            <div className={styles.projectDetails}>
              <div className={styles.detailCard}>
                <h4>Data Ingestion</h4>
                <p>Processed 6.5M+ game records from Chess.com REST API using the DLT (Data Load Tool) framework</p>
              </div>
              <div className={styles.detailCard}>
                <h4>Storage Layer</h4>
                <p>DuckDB for blazing-fast local OLAP analytics, MySQL for persistent relational storage and querying</p>
              </div>
              <div className={styles.detailCard}>
                <h4>Visualization</h4>
                <p>Interactive Power BI dashboard with 10+ custom DAX measures for player performance and game trend analysis</p>
              </div>
            </div>

            <div className={styles.techStack}>
              {['Python', 'DLT', 'DuckDB', 'MySQL', 'Power BI', 'DAX'].map((tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>

            <div className={styles.projectLinks}>
              <a href="https://github.com/msaquib21" target="_blank" rel="noreferrer" className={styles.githubLink}>
                View on GitHub
                <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
