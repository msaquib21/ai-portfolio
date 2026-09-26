import React, { useEffect, useRef } from 'react';
import styles from './About.module.css';

const About = () => {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll(`.${styles.tiltIn}`);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt away from center
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (ref) => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const Card = ({ label, value }) => {
    const cardRef = useRef(null);
    return (
      <div 
        className={`${styles.infoCard} ${styles.tiltIn}`} 
        ref={cardRef}
        onMouseMove={(e) => handleMouseMove(e, cardRef)}
        onMouseLeave={() => handleMouseLeave(cardRef)}
      >
        <span className={styles.infoLabel}>{label}</span>
        <span className={styles.infoValue}>{value}</span>
      </div>
    );
  };

  return (
    <section id="about" className={styles.aboutSection} ref={sectionRef}>
      <div className={`${styles.sectionHeader} ${styles.tiltIn}`}>
        <span className={styles.headerIndex}>01</span>
        <h2 className={styles.headerTitle}>About</h2>
        <div className={styles.headerDivider}></div>
      </div>

      <div className={styles.content}>
        <div className={`${styles.bioCard} ${styles.tiltIn}`}>
          <p className={styles.bioText}>
            I'm Mohammad Saquib, a Data & Application Engineer at Reliance Industries in Navi Mumbai, promoted from Graduate Engineer Trainee. I engineer production-grade agentic AI pipelines and deterministic data systems — including an agentic document-extraction pipeline using LangGraph, Pydantic, and local LLMs achieving 97% field-level recall, 92% routing accuracy, and a 62% latency reduction via template caching.
          </p>
          <p className={styles.bioText}>
            I also engineered a Python-based supply-chain root-cause analysis engine for ASN/GRN discrepancies with deterministic transaction attribution, delivery-to-MSEG tracing, and 93 automated test scenarios. My flagship project is the Agentic Resume Analyzer — a 3-node LangGraph evaluation pipeline with multi-query RAG, Reciprocal Rank Fusion, SSE streaming, and local LLM inference via Ollama. B.Tech in CS from NIT Raipur.
          </p>
        </div>

        <div className={styles.infoGrid}>
          <Card label="Current" value="Data & Application Engineer, Reliance Industries" />
          <Card label="Focus" value="Agentic AI · Document Intelligence · Data Systems" />
          <Card label="Systems" value="LangGraph · Pydantic · Python · Databricks" />
          <Card label="Education" value="B.Tech CSE, NIT Raipur" />
        </div>
      </div>
    </section>
  );
};

export default About;
