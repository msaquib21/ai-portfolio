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
            I'm Mohammad Saquib, a Data & Application Engineer at Reliance Industries in Navi Mumbai, promoted from Graduate Engineer Trainee. I build production LLM-powered systems — from RAG search engines over 200+ pages of MES/WMS specs using LangChain, ChromaDB, and Azure OpenAI, to Text-to-SQL engines on Databricks enabling 500+ operators to self-serve KPIs.
          </p>
          <p className={styles.bioText}>
            My strongest personal build is the Agentic Resume Analyzer: a LangGraph-powered evaluation pipeline with multi-query RAG, SSE streaming, and 100% local LLM inference via Ollama. I hold a B.Tech in CS from NIT Raipur and keep sharp on DSA across LeetCode and CodeChef.
          </p>
        </div>

        <div className={styles.infoGrid}>
          <Card label="Current" value="Data & Application Engineer, Reliance Industries" />
          <Card label="Focus" value="LLM Automation & RAG Systems" />
          <Card label="Systems" value="Python · FastAPI · Databricks" />
          <Card label="Education" value="B.Tech CSE, NIT Raipur" />
        </div>
      </div>
    </section>
  );
};

export default About;
