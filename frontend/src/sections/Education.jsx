import React, { useEffect, useRef } from 'react';
import styles from './Education.module.css';

const educationData = [
  { school: 'National Institute of Technology Raipur', detail: 'B.Tech in Computer Science & Engineering', period: '2020 – 2024', score: 'CPI: 7.65' },
  { school: 'Delhi Public School, Kuwait', detail: 'Class XII (CBSE)', period: '2019 – 2020', score: '90.2%' },
  { school: 'Delhi Public School, Kuwait', detail: 'Class X (CBSE)', period: '2017 – 2018', score: '85.6%' }
];

const Education = () => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.section} ref={sectionRef} id="education">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>05 — EDUCATION</span>
          <h2 className={styles.title}>Education</h2>
          <p className={styles.subtitle}>Academic foundation.</p>
        </div>

        <div className={styles.timeline}>
          {educationData.map((edu, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconArea}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div className={styles.contentArea}>
                <h3 className={styles.school}>{edu.school}</h3>
                <p className={styles.detail}>{edu.detail}</p>
              </div>
              <div className={styles.scoreArea}>
                <div className={styles.period}>{edu.period}</div>
                <div className={styles.score}>{edu.score}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
