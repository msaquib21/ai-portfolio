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

/* ============================================================
   3D IMMERSIVE PORTFOLIO — Mohammad Saquib
   ============================================================ */
function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const sceneRef = useRef(null);

  const openChat = () => setChatOpen(true);
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
          <Education />
          <Contact onOpenChat={openChat} />
        </main>
      </div>

      {/* Floating chat button */}
      {!chatOpen && (
        <button className="chat-fab" onClick={openChat} aria-label="Ask My AI">
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