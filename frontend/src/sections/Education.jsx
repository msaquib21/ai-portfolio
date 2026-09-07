import React, { useEffect, useRef } from 'react';
import styles from './Education.module.css';

const educationData = [
  {
    institution: 'NIT Raipur',
    degree: 'B.Tech CSE',
    period: '2020-2024',
    score: 'CPI: 7.65',
  },
  {
    institution: 'DPS Kuwait',
    degree: 'Class XII CBSE',
    period: '2019-2020',
    score: '90.2%',
  },
  {
    institution: 'DPS Kuwait',
    degree: 'Class X CBSE',
    period: '2017-2018',
    score: '85.6%',
  },
];

const GraduationCap = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.iconSvg}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default function Education() {
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

    const cards = sectionRef.current.querySelectorAll(`.${styles.eduCard}`);
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className={styles.educationSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>05 &mdash; EDUCATION</span>
          <h2 className={styles.title}>Academic Background</h2>
        </div>

        <div className={styles.grid}>
          {educationData.map((edu, index) => (
            <div
              key={index}
              className={styles.eduCard}
              style={{ '--delay': `${index * 0.15}s` }}
            >
              <div className={styles.cardInner}>
                <div className={styles.iconArea}>
                  <GraduationCap />
                </div>
                <div className={styles.contentArea}>
                  <h3 className={styles.institution}>{edu.institution}</h3>
                  <div className={styles.detailsRow}>
                    <span className={styles.degree}>{edu.degree}</span>
                    <span className={styles.period}>{edu.period}</span>
                  </div>
                  <div className={styles.score}>{edu.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
