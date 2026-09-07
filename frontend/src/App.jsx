import { useState, useRef, useEffect } from 'react';
import './App.css';

/* Section Components */
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Contact from './sections/Contact';
import ChatPanel from './sections/ChatPanel';
import AiShowcase from './sections/AiShowcase';

/* ============================================================
   FEATURE FLAGS — Toggle each AI visibility feature on/off
   Set to true to enable, false to disable
   ============================================================ */
const FEATURES = {
  welcomeToast: true,       // 1. Auto-open welcome notification
  heroProminent: true,      // 2. Glowing hero CTA (handled in Hero.jsx)
  aiShowcaseSection: true,  // 3. Dedicated AI showcase section
  bottomBanner: true,       // 4. Persistent bottom banner
  animatedFab: true,        // 5. Enlarged FAB with label + glow ring
};

/* ============================================================
   1. WELCOME TOAST — Slides in after 3 seconds
   ============================================================ */
function WelcomeToast({ onOpen, onDismiss }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => { setVisible(false); onDismiss?.(); }, 400);
  };

  const handleClick = () => {
    dismiss();
    onOpen();
  };

  if (!visible) return null;

  return (
    <div className={`welcome-toast ${exiting ? 'toast-exit' : 'toast-enter'}`}>
      <div className="toast-glow" />
      <div className="toast-content">
        <div className="toast-avatar">
          <div className="toast-cube">
            <div className="toast-cube-face face-1" />
            <div className="toast-cube-face face-2" />
            <div className="toast-cube-face face-3" />
          </div>
        </div>
        <div className="toast-text">
          <strong>👋 Hey! I'm Saquib's AI assistant</strong>
          <span>Ask me anything about his skills, projects, or experience</span>
        </div>
        <button className="toast-cta" onClick={handleClick}>
          Try it
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button className="toast-close" onClick={dismiss} aria-label="Dismiss">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   4. BOTTOM BANNER — Persistent bar at bottom
   ============================================================ */
function BottomBanner({ onOpen }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bottom-banner">
      <div className="banner-pulse" />
      <span className="banner-icon">💬</span>
      <span className="banner-text">
        This portfolio has an <strong>AI assistant</strong> — Ask it anything about me
      </span>
      <button className="banner-cta" onClick={onOpen}>
        Try Now
      </button>
      <button className="banner-dismiss" onClick={() => setDismissed(true)} aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}

/* ============================================================
   5. ANIMATED FAB — Larger with label + glow ring
   ============================================================ */
function AnimatedFab({ onClick }) {
  return (
    <button className="chat-fab-animated" onClick={onClick} aria-label="Ask My AI">
      <div className="fab-glow-ring" />
      <div className="fab-glow-ring fab-glow-ring-2" />
      <div className="fab-inner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <span className="fab-label">Ask AI</span>
    </button>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [toastDismissed, setToastDismissed] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const sceneRef = useRef(null);

  const openChat = () => {
    setChatOpen(true);
    setBannerVisible(false);
  };
  const closeChat = () => setChatOpen(false);

  return (
    <>
      {/* Ambient light gradient */}
      <div className="ambient-light" />

      {/* Floating 3D geometric shapes */}
      <div className="depth-bg">
        <div className="geo-shape shape-1" />
        <div className="geo-shape shape-2" />
        <div className="geo-shape shape-3" />
        <div className="geo-shape shape-4" />
      </div>

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Main content */}
      <div className="main-content" ref={sceneRef}>
        <Navbar onOpenChat={openChat} />
        <main>
          <Hero onOpenChat={openChat} />
          <About />
          <Experience />
          <Projects />
          <Skills />
          {FEATURES.aiShowcaseSection && <AiShowcase onOpenChat={openChat} />}
          <Education />
          <Contact onOpenChat={openChat} />
        </main>
      </div>

      {/* Feature 1: Welcome Toast */}
      {FEATURES.welcomeToast && !chatOpen && !toastDismissed && (
        <WelcomeToast onOpen={openChat} onDismiss={() => setToastDismissed(true)} />
      )}

      {/* Feature 4: Bottom Banner */}
      {FEATURES.bottomBanner && !chatOpen && bannerVisible && (
        <BottomBanner onOpen={openChat} />
      )}

      {/* Feature 5: Animated FAB (or plain FAB) */}
      {!chatOpen && (
        FEATURES.animatedFab
          ? <AnimatedFab onClick={openChat} />
          : <button className="chat-fab" onClick={openChat} aria-label="Ask My AI">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
        )}

      {/* Chat panel */}
      <ChatPanel isOpen={chatOpen} onClose={closeChat} />
    </>
  );
}

export default App;