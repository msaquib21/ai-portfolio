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
      { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
    );

    const elements = document.querySelectorAll(`.${styles.tiltIn}`);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleMouseMove = (e, ref) => {
    if (!ref.current || window.innerWidth <= 900) return;
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
            I'm Mohammad Saquib, a product-minded engineer turned Product Manager based in Navi Mumbai. At Reliance Industries, I spent two years turning manufacturing and supply-chain pain points into enterprise digital products — defining requirements, aligning business, technology and vendor teams, and delivering measurable outcomes across SAP, WMS and Databricks. I now apply the same discovery-to-metrics discipline to product work: teardowns, PRDs, experiments and AI copilots.
          </p>
          <p className={styles.bioText}>
            My independent product work includes the Zepto contribution-margin case study, an AI copilot design for SAP called "Where Is My Material?", a Rapido booking-flow teardown (root cause, prototype, A/B plan), a Topmate marketplace teardown, and ResumeIQ — an evidence-grounded resume-to-JD analyzer. B.Tech in CS from NIT Raipur. 5-star HackerRank Problem Solving; CodeChef Global Rank 312.
          </p>
        </div>

        <div className={styles.infoGrid}>
          <Card label="Current" value="Technical Program Manager, Reliance Industries" />
          <Card label="Focus" value="Product Strategy · AI Product · Supply Chain" />
          <Card label="Systems" value="SAP · WMS · Databricks · Product Craft" />
          <Card label="Education" value="B.Tech CSE, NIT Raipur" />
        </div>
      </div>
    </section>
  );
};

export default About;
