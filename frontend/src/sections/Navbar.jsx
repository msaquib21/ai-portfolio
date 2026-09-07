import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = ({ onOpenChat }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    NAV_SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logoCube}>
            <div className={styles.cubeFace}></div>
            <div className={styles.cubeFace}></div>
            <div className={styles.cubeFace}></div>
            <div className={styles.cubeFace}></div>
          </div>
          <span className={styles.logoText}>
            saquib<span className={styles.logoAccent}>.dev</span>
          </span>
        </div>

        <nav className={styles.desktopNav}>
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleNavClick(e, section.id)}
              className={`${styles.navLink} ${
                activeSection === section.id ? styles.active : ''
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className={styles.rightActions}>
          <a 
            href="/Mohammad_Saquib_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.resumeBtn}
          >
            Resume
          </a>
          <button className={styles.chatBtn} onClick={onOpenChat} aria-label="Open AI Chat">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <button 
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <nav className={styles.mobileNav}>
            {NAV_SECTIONS.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleNavClick(e, section.id)}
                className={`${styles.mobileNavLink} ${
                  activeSection === section.id ? styles.activeMobile : ''
                }`}
                style={{ transform: `translateX(${index * 5}px)`, transitionDelay: `${index * 0.05}s` }}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
