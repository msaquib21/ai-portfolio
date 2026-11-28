import { useEffect, useRef, useState } from 'react';
import styles from './AiShowcase.module.css';

const EXAMPLE_QA = [
  {
    q: 'Tell me about the Zepto contribution-margin case.',
    a: 'Zepto lost roughly 79 per order in adjusted EBITDA in FY26 while revenue doubled. I anchored the work on contribution margin per order — gross margin plus ad revenue minus fulfilment, last-mile and dark-store cost minus incentives — then diagnosed three root causes: grocery-heavy baskets capping gross margin, one-rider-per-order dispatch, and under-monetized high-intent cart surfaces. I proposed three levers: a margin-aware second cart tier, Flexi-Batch plus split-cart consolidation, and a persona-targeted outcome-priced ad shelf.',
  },
  {
    q: 'How did you design the SAP AI copilot safely?',
    a: 'The problem: people who need material or delivery status cannot open the company records system, so they wait hours on colleagues. I chose the AI assistant over a process fix, status page or rule bot through a structured options analysis, with strict guardrails: the AI only restates facts from approved read-only interfaces, never calculates or guesses, answers carry source and an "as of" time, version 1 is fully read-only, and every question type ships with an off switch.',
  },
  {
    q: 'How do you approach discovery and prioritization?',
    a: 'I start with the problem, not the solution — like the Rapido teardown, which labeled OBSERVED / REPORTED / HYPOTHESIS before proposing rider-configured auto fare escalation. For prioritization I use RICE scoring and phased rollouts with explicit kill criteria.',
  },
  {
    q: 'Tell me about ResumeIQ.',
    a: 'ResumeIQ is an evidence-grounded resume-to-JD analyzer for early-career job seekers in India who apply blindly. The core product decision was trust: scoring is kept out of the LLM via a deterministic, configurable weighted rubric (required skills 40%, experience 25%, responsibilities 20%, preferred 10%, qualifications 5%), every skill match cites its resume line, and gaps are reported as "no evidence found", never guessed. An Interview Evidence Map tags each probe strong / thin / exposed. An offline eval harness hit 25/25 skill-status labels on 4 hand-labeled cases. The LLM is limited to JD extraction (local Ollama by default) behind a lexicon gate with a deterministic fallback, with a FastAPI backend, SSE streaming and SHA-256 caching.',
  },
];

function AiShowcase({ onOpenChat }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Typewriter effect for the demo answer */
  useEffect(() => {
    setTypedAnswer('');
    setIsTyping(true);
    const answer = EXAMPLE_QA[activeIdx].a;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedAnswer(answer.slice(0, i));
      if (i >= answer.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [activeIdx]);

  return (
    <section
      id="ai-assistant"
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.revealed : ''}`}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.index}>✦ AI-POWERED</span>
          <h2 className={styles.title}>Ask My AI Anything</h2>
          <p className={styles.subtitle}>
            This portfolio comes with a live AI assistant trained on my product and engineering journey.
            It knows my case studies, skills, and experience — try it.
          </p>
        </div>

        {/* Demo Area */}
        <div className={styles.demoCard}>
          <div className={styles.demoGlow} />

          {/* Question tabs */}
          <div className={styles.questionTabs}>
            {EXAMPLE_QA.map((qa, i) => (
              <button
                key={i}
                className={`${styles.qTab} ${i === activeIdx ? styles.qTabActive : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                {qa.q}
              </button>
            ))}
          </div>

          {/* Chat preview */}
          <div className={styles.chatPreview}>
            {/* User bubble */}
            <div className={styles.userBubble}>
              <span>{EXAMPLE_QA[activeIdx].q}</span>
            </div>

            {/* AI bubble */}
            <div className={styles.aiBubble}>
              <div className={styles.aiAvatar}>
                <div className={styles.avatarCube}>
                  <div className={`${styles.cubeFace} ${styles.cubeFace1}`} />
                  <div className={`${styles.cubeFace} ${styles.cubeFace2}`} />
                  <div className={`${styles.cubeFace} ${styles.cubeFace3}`} />
                </div>
              </div>
              <div className={styles.aiText}>
                {typedAnswer}
                {isTyping && <span className={styles.cursor}>▌</span>}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.ctaArea}>
            <button className={styles.tryButton} onClick={onOpenChat}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Ask Your Own Question
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiShowcase;
