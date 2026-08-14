import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const navSections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = ({ onOpenChat }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      { threshold: 0.5 }
    );

    navSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Left: Logo */}
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <span className={styles.logoText}>
              saquib<span className={styles.logoDev}>.dev</span>
            </span>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className={styles.desktopNav}>
            {navSections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`${styles.navLink} ${activeSection === id ? styles.active : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className={styles.actions}>
            <a href="/Mohammad_Saquib_Resume.pdf" download="Mohammad_Saquib_Resume.pdf" className={styles.resumeBtn} aria-label="Download Resume">
              <span>Resume</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
            
            <button 
              className={styles.hamburger} 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.mobileOverlayOpen : ''}`}>
        <div className={styles.mobileHeader}>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <span className={styles.logoText}>
              saquib<span className={styles.logoDev}>.dev</span>
            </span>
          </div>
          <button 
            className={styles.closeBtn} 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Mobile Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.mobileNavLinks}>
          {navSections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={styles.mobileNavLink}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.mobileActions}>
          <button 
            className={styles.askAiBtn}
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenChat();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Ask My AI
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
