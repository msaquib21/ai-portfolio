import React, { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

const Experience = () => {
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

  return (
    <section id="experience" className={styles.experienceSection} ref={sectionRef}>
      <div className={`${styles.sectionHeader} ${styles.tiltIn}`}>
        <span className={styles.headerIndex}>02</span>
        <h2 className={styles.headerTitle}>Experience</h2>
        <div className={styles.headerDivider}></div>
      </div>

      <div className={styles.timeline}>
        {/* Reliance Experience */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineNode}></div>
          <div className={`${styles.experienceCard} ${styles.featuredCard} ${styles.tiltIn}`}>
            <span className={styles.currentBadge}>Current</span>
            
            <div className={styles.cardHeader}>
              <div className={styles.roleInfo}>
                <h3 className={styles.roleTitle}>Technical Program Manager</h3>
                <span className={styles.companyName}>Reliance Industries</span>
              </div>
              <span className={styles.dateRange}>Aug 2024 - Present</span>
            </div>

            <div className={styles.subCardsGrid}>
              {/* 1. Self-Serve Supplier Document Portal */}
              <div className={styles.subCard}>
                <h4 className={styles.subCardTitle}>Self-Serve Supplier Document Portal</h4>
                <p className={styles.subCardDesc}>
                  <span className={styles.subCardFocus}>0-to-1 Product Building · Access &amp; Workflow Friction · Azure Databricks Apps · Internal Tools</span>
                  Suppliers upload critical order attachments and quality documents to Reliance&apos;s Supplier First portal against Purchase Orders, but most downstream users lacked production access — creating recurring bottlenecks and manual document chasing. Instead of pushing broad production-portal licenses, scoped and built a lightweight, read-only internal search application inside Azure Databricks where synced portal data already lived. Designed the lookup workflow around real ops behaviour (PO number, plant code, supplier code, date range) and shipped it via Databricks Apps so all supplier attachments linked to a PO sat in one self-serve interface. Outcome: removed dependency on production portal access and manual document chasing.
                </p>
                <ul className={styles.stackList}>
                  <li className={styles.stackPill}>Azure Databricks</li>
                  <li className={styles.stackPill}>Databricks Apps</li>
                  <li className={styles.stackPill}>Internal Tools</li>
                  <li className={styles.stackPill}>Self-Serve</li>
                </ul>
              </div>

              {/* 2. Secure SAP-to-WMS GRN Data Integration */}
              <div className={styles.subCard}>
                <h4 className={styles.subCardTitle}>Secure SAP-to-WMS GRN Data Integration</h4>
                <p className={styles.subCardDesc}>
                  <span className={styles.subCardFocus}>Requirements &amp; Scope Definition · Technical Trade-Offs · REST API Contracts · Cross-Functional Alignment</span>
                  Warehouse operations needed real-time Goods Receipt Note data from SAP surfaced inside WMS for floor-level inventory accuracy. Fastest path was vendor WMS → Databricks (SAP tables already replicated), but the security review flagged an unacceptable risk: broad vendor read exposure into enterprise data. Drove the pivot to a scoped API architecture, trading initial speed for strict least-privilege governance. Owned end-to-end requirements and contract negotiation across Business Ops, SAP Technical, Security and the WMS vendor, auditing every GRN field against SAP source availability for a single locked specification. Outcome: secure, governed SAP-to-WMS integration blueprint that protected enterprise Databricks workspaces while unblocking GRN visibility.
                </p>
                <ul className={styles.stackList}>
                  <li className={styles.stackPill}>SAP</li>
                  <li className={styles.stackPill}>WMS</li>
                  <li className={styles.stackPill}>REST APIs</li>
                  <li className={styles.stackPill}>Security</li>
                  <li className={styles.stackPill}>Governance</li>
                </ul>
              </div>

              {/* 3. Supplier Cell-Parameter Workflow Digitization */}
              <div className={styles.subCard}>
                <h4 className={styles.subCardTitle}>Supplier Cell-Parameter Workflow Digitization</h4>
                <p className={styles.subCardDesc}>
                  <span className={styles.subCardFocus}>Workflow Digitization · Cross-Org Change Management · Data Pipeline Orchestration · MES Integration</span>
                  Every 2–3 months battery cells arrive from suppliers with a critical Excel sheet of cell-level technical parameters; previously exchanged ad hoc over email, creating version-control risk and zero automated visibility in MES. Structured the rollout as a multi-hop digital pipeline (Supplier First Portal → SAP → Databricks → MES) rather than a brittle one-off parser. Partnered SQA and SCM on upstream intake, aligned SAP engineering on ingestion, and bridged the Databricks → MES handoff. Outcome: replaced fragile email exchange with governed, traceable digital ingestion flow.
                </p>
                <ul className={styles.stackList}>
                  <li className={styles.stackPill}>Workflow Digitization</li>
                  <li className={styles.stackPill}>MES</li>
                  <li className={styles.stackPill}>SAP</li>
                  <li className={styles.stackPill}>Databricks</li>
                </ul>
              </div>

              {/* 4. End-to-End BESS Supply-Chain Traceability */}
              <div className={styles.subCard}>
                <h4 className={styles.subCardTitle}>End-to-End BESS Supply-Chain Traceability</h4>
                <p className={styles.subCardDesc}>
                  <span className={styles.subCardFocus}>Data Discovery · Supply-Chain Traceability · Databricks &amp; Genie · Executive Visibility</span>
                  Leadership needed granular, unit-level traceability across the BESS lifecycle — vertical thread (raw material origin) to horizontal manufacturing thread (cells → module packs → containers → finished units). Treated traceability as a data-coverage discovery problem before committing engineering effort, mapping what existed in SAP/Databricks against leadership&apos;s real decision questions (batch origin, ship timing, quantity, order). Owned discovery in Azure Databricks (Genie-assisted schema exploration), identified missing fields and broken linkages, and tracked gap closure with source-system owners. Outcome: structured data-availability map and gap-closure roadmap for executive visibility.
                </p>
                <ul className={styles.stackList}>
                  <li className={styles.stackPill}>Data Discovery</li>
                  <li className={styles.stackPill}>Databricks</li>
                  <li className={styles.stackPill}>Supply Chain</li>
                  <li className={styles.stackPill}>Genie</li>
                </ul>
              </div>
            </div>

            {/* Additional smaller work */}
            <div className={styles.smallerWork}>
              <h4 className={styles.smallerWorkTitle}>Additional Smaller Work</h4>
              <ul className={styles.smallerWorkList}>
                <li>
                  <p><strong>MES Frontend Prototyping (Figma):</strong> Translated shop-floor operations requirements into early-stage Figma UI flows and wireframes to align the external vendor team on expected frontend behaviour before development began.</p>
                </li>
                <li>
                  <p><strong>Battery APS Rollout &amp; SQL Adaptation:</strong> Adapted an existing Reliance Solar Advance Planning &amp; Scheduling (APS) platform for the Battery business by modifying Databricks SQL queries on SAP datasets to power a dedicated Battery instance, running iterative user-feedback loops with planners to refine queries and UI.</p>
                </li>
                <li>
                  <p><strong>Global Vendor Blueprinting (China) &amp; API UAT:</strong> Represented Reliance on-site in China during BESS vendor blueprinting to align software capabilities with manufacturing constraints; executed station-wise material-movement API testing to support formal UAT with operations teams.</p>
                </li>
                <li>
                  <p><strong>Build-vs-Reuse Evaluation (MOC):</strong> Audited operations requirements for a Management of Change tool, uncovered Reliance&apos;s central Hydrocarbon MOC platform, and aligned operations to adopt the shared enterprise platform once production begins instead of funding redundant custom development.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* IIT Hyderabad Experience */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineNode}></div>
          <div className={`${styles.experienceCard} ${styles.tiltIn}`}>
            <div className={styles.cardHeader}>
              <div className={styles.roleInfo}>
                <h3 className={styles.roleTitle}>Research Summer Intern</h3>
                <span className={styles.companyName}>IIT Hyderabad</span>
              </div>
              <span className={styles.dateRange}>May 2023 - Jul 2023</span>
            </div>
            <p className={styles.internDesc}>
              Contributed to architecture research by developing and optimizing a RISC-V ISA simulator written in C++. Improved simulation accuracy and execution performance for advanced processor designs.
            </p>
            <ul className={styles.stackList} style={{ marginTop: '1.5rem' }}>
              <li className={styles.stackPill}>C++</li>
              <li className={styles.stackPill}>RISC-V</li>
              <li className={styles.stackPill}>Computer Architecture</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
