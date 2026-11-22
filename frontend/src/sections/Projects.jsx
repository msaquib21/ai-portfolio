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

  const githubLink = (
    <a href="https://github.com/msaquib21" target="_blank" rel="noreferrer" className={styles.githubLink}>
      View on GitHub
      <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );

  return (
    <section className={styles.section} id="projects" ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.reveal}`}>
          <span className={styles.sectionNumber}>03</span>
          <h2 className={styles.sectionTitle}>FEATURED CASE STUDY</h2>
          <div className={styles.headerLine}></div>
        </div>

        {/* ── Featured Case Study: Zepto ── */}
        <div className={`${styles.featuredProject} ${styles.reveal}`}>
          <div className={styles.projectHeader}>
            <span className={styles.projectTag}>CASE STUDY · PRODUCT STRATEGY &amp; GROWTH</span>
            <h3 className={styles.projectTitle}>Closing the ₹79 Order Gap</h3>
            <p className={styles.projectOverview}>
              Audited Zepto's FY26 unit economics and designed three product levers to close the ~₹79 per-order
              contribution-margin loss — without ever compromising the 10-minute delivery promise.
            </p>
          </div>

          <div className={styles.projectDetails}>
            <div className={styles.detailCard}>
              <h4>The North Star</h4>
              <p>
                Contribution margin per order = gross margin + ad revenue − fulfilment, last-mile and dark-store cost −
                customer incentives. Every bet is judged on its CM/order delta, not GMV.
              </p>
            </div>
            <div className={styles.detailCard}>
              <h4>The Three Levers</h4>
              <p>
                Margin-aware second tier on the cart milestone ladder; Flexi-Batch opt-in plus 1-tap split-cart
                consolidation; persona-targeted, outcome-priced ad shelf in the cart and after checkout.
              </p>
            </div>
          </div>

          <div className={styles.techStack}>
            {['Strategy', 'Growth', 'RICE', 'A/B Testing', 'CM Modeling', 'SQL'].map((tech) => (
              <span key={tech} className={styles.techPill}>{tech}</span>
            ))}
          </div>

          <div className={styles.projectLinks}>
            {githubLink}
          </div>
        </div>

        {/* ── Case Studies & Product Teardowns ── */}
        <div className={styles.caseStudiesGrid}>
          {/* AI Copilot Case Study */}
          <div className={`${styles.caseStudyCard} ${styles.reveal}`}>
            <div className={styles.projectHeader}>
              <span className={styles.projectTag}>CASE STUDY · AI PRODUCT DESIGN</span>
              <h4 className={styles.caseStudyTitle}>Where Is My Material?</h4>
              <p className={styles.projectOverview}>
                Designed an AI copilot in Microsoft Teams that answers everyday material and delivery questions from
                approved read-only SAP interfaces — turning the unofficial colleague-as-helpdesk workflow into a
                governed assistant.
              </p>
            </div>

            <div className={styles.projectDetails}>
              <div className={styles.detailCard}>
                <h4>The Problem</h4>
                <p>
                  People who need delivery or stock status cannot open the company's records system, so they ask a
                  colleague on Teams and wait 1–2 hours. The colleague becomes an unofficial help desk with no record of
                  who asked what.
                </p>
              </div>
              <div className={styles.detailCard}>
                <h4>Design &amp; Guardrails</h4>
                <p>
                  Chose the AI assistant over a process fix, status page or rule bot through a structured options
                  analysis. The AI only restates facts from approved interfaces, never calculates or guesses quantities;
                  answers carry source and an &quot;as of&quot; time; version 1 is fully read-only; every question type
                  ships with an off switch.
                </p>
              </div>
            </div>

            <div className={styles.techStack}>
              {['AI Product', 'LLM', 'Guardrails', 'SAP', 'Teams', 'Product Design'].map((tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>

            <div className={styles.projectLinks}>
              {githubLink}
            </div>
          </div>

          {/* Rapido Teardown */}
          <div className={`${styles.caseStudyCard} ${styles.reveal}`}>
            <div className={styles.projectHeader}>
              <span className={styles.projectTag}>CASE STUDY · PRODUCT TEARDOWN · GROWTH</span>
              <h4 className={styles.caseStudyTitle}>Why My Morning Ride Started Late</h4>
              <p className={styles.projectOverview}>
                Teardown of Rapido&apos;s booking flow: a 5-minute quoted pickup versus a 10–14 minute real wait. Root
                cause: manual fare top-ups restarting searches. Rider-configured auto-escalation proposed with presets
                and caps.
              </p>
            </div>

            <div className={styles.projectDetails}>
              <div className={styles.detailCard}>
                <h4>Method</h4>
                <p>
                  Labeled OBSERVED / REPORTED / HYPOTHESIS across timed rides, a captain interview and competitor
                  comparison.
                </p>
              </div>
              <div className={styles.detailCard}>
                <h4>Design</h4>
                <p>
                  Rider sets a raise rule once before booking (Relaxed / Normal / Urgent or custom); the app raises the
                  fare on the same request, never above the rider&apos;s cap.
                </p>
              </div>
            </div>

            <div className={styles.techStack}>
              {['Product Teardown', 'Growth', 'A/B Testing', 'Pricing'].map((tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>

            <div className={styles.projectLinks}>
              {githubLink}
            </div>
          </div>

          {/* Topmate Teardown */}
          <div className={`${styles.caseStudyCard} ${styles.reveal}`}>
            <div className={styles.projectHeader}>
              <span className={styles.projectTag}>CASE STUDY · PRODUCT TEARDOWN · MARKETPLACE</span>
              <h4 className={styles.caseStudyTitle}>Finding the Right Expert on Topmate</h4>
              <p className={styles.projectOverview}>
                Teardown of Topmate&apos;s career-guidance marketplace: hard-to-choose gaps and an unreliable call
                record. Three-part fix — verified call status, path card, AI compare — with build order and test design.
              </p>
            </div>

            <div className={styles.projectDetails}>
              <div className={styles.detailCard}>
                <h4>Gaps</h4>
                <p>
                  Career paths were not shown in a comparable way and ratings were almost all 5.0, so seekers left to
                  check LinkedIn. Missed calls were marked &quot;Completed&quot;, so ratings, refunds and show-up numbers
                  could not be trusted.
                </p>
              </div>
              <div className={styles.detailCard}>
                <h4>Fix &amp; Test</h4>
                <p>
                  Build order: verified call status → path card → compare. Pilot design: 4-week A/B on calls that really
                  happen per 100 bookings.
                </p>
              </div>
            </div>

            <div className={styles.techStack}>
              {['Marketplace', 'Discovery', 'AI', 'Trust & Safety'].map((tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>

            <div className={styles.projectLinks}>
              {githubLink}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
