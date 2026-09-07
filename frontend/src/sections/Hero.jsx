import React, { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const Typewriter = ({ strings }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const fullText = strings[currentStringIndex];

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentStringIndex((prev) => (prev + 1) % strings.length);
          return;
        }
      }
      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentStringIndex, strings, typingSpeed]);

  return <span className={styles.typewriter}>{currentText}<span className={styles.cursor}>|</span></span>;
};

const EXPERTISE_CARDS = [
  {
    icon: 'genai',
    title: 'GenAI / LLMs',
    color: 'var(--accent-secondary, #7c5cfc)',
    items: ['LangChain / LangGraph', 'Azure OpenAI / GPT-4o', 'Prompt Engineering & ReAct']
  },
  {
    icon: 'rag',
    title: 'RAG Systems',
    color: 'var(--accent, #00e5bf)',
    items: ['Vector DBs (ChromaDB, Pinecone)', 'Semantic Search & Hybrid Retrieval', '90% accuracy at <7s latency']
  },
  {
    icon: 'data',
    title: 'Data Engineering',
    color: 'var(--accent-warm, #ff6b4a)',
    items: ['Azure Databricks / SQL Warehouse', 'ETL/ELT Pipelines (DLT)', 'DuckDB / MySQL / PostgreSQL']
  },
  {
    icon: 'backend',
    title: 'Backend & APIs',
    color: 'var(--accent, #00e5bf)',
    items: ['FastAPI + Pydantic', 'REST APIs & WSO2 IAM', 'Docker & Git/GitHub']
  },
  {
    icon: 'analytics',
    title: 'Analytics & Tooling',
    color: 'var(--accent-secondary, #7c5cfc)',
    items: ['Power BI & DAX Dashboards', 'Text-to-SQL Engines', 'Hugging Face Transformers']
  }
];

const getIconSvg = (iconName, color) => {
  switch (iconName) {
    case 'genai':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'rag':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      );
    case 'data':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      );
    case 'backend':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'analytics':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    default:
      return null;
  }
};

const Hero = ({ onOpenChat }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % EXPERTISE_CARDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  const roles = [
    'Data & Application Engineer',
    'GenAI Engineer',
    'LLM Builder',
    'RAG Systems Architect'
  ];

  return (
    <section className={styles.heroSection} ref={heroRef} onMouseMove={handleMouseMove} id="hero">
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <div className={styles.statusBadge}>
            <span className={styles.pulseDot}></span>
            Available for GenAI & Data Engineering roles
          </div>

          <h1 className={styles.title}>
            <span className={styles.firstName}>Mohammad</span>
            <br />
            <span className={styles.lastName}>Saquib</span>
          </h1>

          <h2 className={styles.subtitle}>
            <Typewriter strings={roles} />
          </h2>

          <p className={styles.description}>
            Building RAG systems, Text-to-SQL engines, and LLM-powered automation at Reliance Industries.
          </p>

          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={onOpenChat}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Ask My AI
            </button>
            <a href="/Mohammad_Saquib_Resume.pdf" download className={styles.btnSecondary}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download Resume
            </a>
            <a href="#contact" className={styles.btnOutline}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Contact
            </a>
          </div>
        </div>

        <div className={styles.contentRight}>
          <div 
            className={styles.cardScene} 
            style={{
              transform: `rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg)`
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {EXPERTISE_CARDS.map((card, idx) => (
              <div 
                key={idx}
                className={`${styles.isoCard} ${styles.slideCard} ${idx === activeCard ? styles.slideCardActive : ''}`}
              >
                <div className={styles.cardGlow}></div>
                <div className={styles.cardHeader}>
                  {getIconSvg(card.icon, card.color)}
                  <h3 style={{ color: card.color }}>{card.title}</h3>
                </div>
                <ul className={styles.cardTech}>
                  {card.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.dotNav}>
            {EXPERTISE_CARDS.map((_, idx) => (
              <div 
                key={idx}
                className={`${styles.dot} ${idx === activeCard ? styles.dotActive : ''}`}
                onClick={() => setActiveCard(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
