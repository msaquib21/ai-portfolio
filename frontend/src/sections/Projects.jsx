import React, { useEffect, useRef } from 'react';
import styles from './Projects.module.css';

const CaseStudy = ({ tag, title, overview, details, techStack, githubLink, liveLink, flagship }) => {
  return (
    <div className={styles.caseStudyCard}>
      <div className={styles.projectHeader}>
        <div className={styles.titleRow}>
          <span className={styles.projectTag}>{tag}</span>
          {flagship && <span className={styles.flagshipBadge}>Flagship</span>}
        </div>
        <h3 className={styles.caseStudyTitle}>{title}</h3>
        <p className={styles.projectOverview}>{overview}</p>
      </div>

      <div className={styles.projectDetails}>
        {details.map((d) => (
          <div className={styles.detailCard} key={d.heading}>
            <h4>{d.heading}</h4>
            <p>{d.text}</p>
          </div>
        ))}
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.techStack}>
          {techStack.map((tech) => (
            <span key={tech} className={styles.techPill}>{tech}</span>
          ))}
        </div>
        <div className={styles.projectLinks}>
          {liveLink ? liveLink : githubLink}
        </div>
      </div>
    </div>
  );
};

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
      { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
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

  const caseStudies = [
    {
      flagship: true,
      tag: 'CASE STUDY - PRODUCT STRATEGY & GROWTH',
      title: 'Closing the ₹79 Order Gap',
      overview:
        'Audited Zepto FY26 unit economics and designed three product levers to close the ~₹79 per-order contribution-margin loss - without ever compromising the 10-minute delivery promise. Revenue had grown sharply, but contribution margin had not.',
      details: [
        {
          heading: 'The North Star',
          text: 'Contribution margin per order = gross margin + ad revenue - fulfilment, last-mile and dark-store cost - customer incentives. Every bet is judged on its CM/order delta, not GMV.',
        },
        {
          heading: 'The Three Levers',
          text: 'Margin-aware second tier on the cart milestone ladder; Flexi-Batch opt-in plus 1-tap split-cart consolidation; persona-targeted, outcome-priced ad shelf in the cart and after checkout. Phased rollout with explicit kill criteria, targeting ~₹32/order.',
        },
      ],
      techStack: ['Strategy', 'Growth', 'RICE', 'A/B Testing', 'CM Modeling', 'SQL'],
    },
    {
      tag: 'CASE STUDY - AI PRODUCT DESIGN',
      title: 'Where Is My Material?',
      overview:
        'Designed an AI copilot in Microsoft Teams that answers everyday material and delivery questions from approved read-only SAP interfaces - turning the informal colleague-as-helpdesk workflow into a governed, trusted assistant.',
      details: [
        {
          heading: 'The Problem',
          text: 'People who needed delivery or stock status could not open the company records system, so they pinged colleagues on Teams and waited 1-2 hours. The informal workaround quietly became an unofficial help desk with no audit trail of who asked what, when, or whether the answer was still valid.',
        },
        {
          heading: 'Design & Guardrails',
          text: 'Chose the AI assistant over a process fix, status page or rule bot through a structured options analysis. The assistant only restates facts returned by approved read-only interfaces - it never guesses or calculates quantities. Answers carry the source record and an "as of" time; version 1 is fully read-only; every question type ships with an off switch.',
        },
      ],
      techStack: ['AI Product', 'LLM', 'Guardrails', 'SAP', 'Teams', 'Product Design'],
    },
    {
      tag: 'PERSONAL PRODUCT - AI PRODUCT DESIGN',
      title: 'ResumeIQ - Evidence-Grounded Resume Analyzer',
      overview:
        'Scoped and built a candidate-facing resume-to-JD analyzer for early-career job seekers in India who apply blindly - making trust the core product decision by keeping scoring out of the LLM.',
      details: [
        {
          heading: 'The Problem & Trust Decision',
          text: 'Early-career job seekers apply blindly; keyword-count ATS tools guess and over-claim. Made trust the core product decision: scoring kept out of the LLM via a deterministic, configurable weighted rubric (required skills 40%, experience 25%, responsibilities 20%, preferred 10%, qualifications 5%); every skill match cites its resume line; gaps reported as "no evidence found", never guessed.',
        },
        {
          heading: 'The Rubric, Eval & Guardrails',
          text: 'Built an Interview Evidence Map tagging each probe strong / thin / exposed. Offline eval harness on 4 synthetic, hand-labeled resume cases (25/25 skill-status labels matched). LLM limited to JD extraction (local Ollama by default) behind a lexicon gate with deterministic fallback. FastAPI backend with SSE streaming, Pydantic validation, SHA-256 caching.',
        },
      ],
      techStack: ['Python', 'FastAPI', 'React', 'Ollama', 'LangGraph', 'ChromaDB', 'RAG'],
      liveLink: (
        <a href="https://ai-resume-project-ochre.vercel.app/" target="_blank" rel="noreferrer" className={styles.githubLink}>
          Try Live
          <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      ),
    },
    {
      tag: 'CASE STUDY - PRODUCT TEARDOWN - GROWTH',
      title: 'Why My Morning Ride Started Late',
      overview:
        'Teardown of Rapido Bike booking flow: the app quoted a ~5-minute pickup that reality delivered as a 10-14 minute wait. TL;DR - quoted ~11 min from booking to drop, actual 16-20; time saved vs walking fell from ~14 min to 5-9 min.',
      details: [
        {
          heading: 'Root Cause & Method',
          text: 'Investigation labeled OBSERVED / REPORTED / HYPOTHESIS across timed rides, a captain interview and competitor comparison; found manual +₹5 to +₹20 fare top-ups meant every rider tap restarted the captain search, with captains weighing distance, direction and next order - latency nobody had budgeted for.',
        },
        {
          heading: 'The Fix & The Test',
          text: 'Rider-configured auto-escalation with presets (Relaxed / Normal / Urgent) or custom cap; the app raises the fare on the same request and never above the rider cap. Single north star: captain at pickup ≤ 10 min. Designed a 2-week A/B test plan.',
        },
      ],
      techStack: ['Product Teardown', 'Growth', 'A/B Testing', 'Pricing'],
    },
    {
      tag: 'CASE STUDY - PRODUCT TEARDOWN - MARKETPLACE',
      title: 'Finding the Right Expert on Topmate',
      overview:
        'Teardown of Topmate 1:1 career-guidance marketplace from my own seeker testing - 25-30 LinkedIn profiles checked to book just 9 calls; 9 calls booked in 4 days; 5+ missed calls still marked "Completed".',
      details: [
        {
          heading: 'The Gaps',
          text: 'Gap 1 - hard to choose: career paths were not shown in a comparable way and ratings were almost all 5.0, so seekers left to check LinkedIn manually. Gap 2 - unreliable record: missed calls were marked "Completed", so ratings, refunds and show-up numbers could not be trusted.',
        },
        {
          heading: 'The Fix & The Test',
          text: 'Three-part fix: (A) seeker filters covering city, field of study, first job, years of experience, company type and visit frequency; (B) AI Compare - seeker shortlists 5-7 experts and gets one side-by-side screen with the AI note on who fits best and why; (C) status page / alerts / rule bot / AI assistant staged by confidence. Build order: verified call status → path card → compare.',
        },
      ],
      techStack: ['Marketplace', 'Discovery', 'AI', 'Trust & Safety'],
    },
  ];

  return (
    <section className={styles.section} id="projects" ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.reveal}`}>
          <span className={styles.sectionNumber}>03</span>
          <h2 className={styles.sectionTitle}>FEATURED CASE STUDIES</h2>
          <div className={styles.headerLine}></div>
        </div>

        <div className={styles.caseStudiesStack}>
          {caseStudies.map((c, i) => (
            <div className={styles.reveal} key={i}>
              <CaseStudy
                tag={c.tag}
                title={c.title}
                overview={c.overview}
                details={c.details}
                techStack={c.techStack}
                githubLink={githubLink}
                liveLink={c.liveLink}
                flagship={c.flagship}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
