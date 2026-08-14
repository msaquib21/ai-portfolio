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

/* ---- Particle system ---- */
function initParticles(canvas, mouseRef) {
  const ctx = canvas.getContext('2d');
  const COUNT = 50;
  const CONNECT = 130;
  const particles = [];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.3 + 0.5,
      o: Math.random() * 0.3 + 0.08,
    });
  }

  let raf;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const m = mouseRef.current;

    for (const p of particles) {
      if (m.x != null) {
        const dx = p.x - m.x, dy = p.y - m.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) { p.vx += (dx / d) * 0.05; p.vy += (dy / d) * 0.05; }
      }
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.998; p.vy *= 0.998;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,170,${p.o})`;
      ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,170,${0.04 * (1 - d / CONNECT)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  };
  draw();

  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
}

/* ============================================================ */
function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  /* Particle canvas */
  useEffect(() => {
    if (!canvasRef.current) return;
    const cleanup = initParticles(canvasRef.current, mouseRef);
    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    return () => { cleanup(); window.removeEventListener('mousemove', onMove); };
  }, []);

  const openChat = () => setChatOpen(true);
  const closeChat = () => setChatOpen(false);

  return (
    <>
      {/* Background layers */}
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="aurora">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>
      <div className="noise-overlay" />

      {/* Main content */}
      <div className="main-content">
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