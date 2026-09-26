import { useEffect, useRef, useState } from 'react';
import styles from './AiShowcase.module.css';

const EXAMPLE_QA = [
  {
    q: 'What is your core tech stack?',
    a: 'My core stack is Python, LangGraph, LangChain, and Pydantic for agentic AI and document intelligence pipelines, along with local LLMs (Ollama) and Azure OpenAI. For data platforms, I use Azure Databricks, DuckDB, and SQL. Production backend with FastAPI and ChromaDB.',
  },
  {
    q: 'Tell me about your work at Reliance',
    a: 'At Reliance, I built an agentic AI document-extraction pipeline using LangGraph, Pydantic, and a local LLM, achieving 97% field-level recall and 92% routing accuracy, with template caching cutting extraction latency by 62%. I also engineered a deterministic Python supply-chain investigation engine for ASN/GRN discrepancies backed by 93 automated tests.',
  },
  {
    q: 'What is the Agentic Resume Analyzer?',
    a: 'It\'s my flagship personal project — a LangGraph-powered evaluation pipeline with a 3-node stateful graph, multi-query RAG with Reciprocal Rank Fusion over ChromaDB, SSE streaming, SHA-256 caching, and 100% local LLM inference via Ollama. Zero cloud API costs, full data privacy.',
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
      { threshold: 0.15 }
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
            This portfolio comes with a live AI assistant trained on my resume.
            It knows my skills, projects, and experience — try it.
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
