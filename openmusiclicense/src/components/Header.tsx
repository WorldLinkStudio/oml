import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleScrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    if (!isHomePage) {
      // Navigate to home page with hash
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // Scroll to section on current page
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header" role="banner">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" className="logo-link">
            <span className="logo-text">Open Music License</span>
          </Link>
        </div>

        <nav className="header-nav" aria-label="Main navigation">
          <button
            className="mobile-menu-toggle"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="menu-icon"></span>
          </button>

          <ul className={`nav-list ${isMenuOpen ? 'nav-list-open' : ''}`}>
            <li>
              <button 
                onClick={() => handleScrollToSection('how-it-works')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}
              >
                How It Works
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToSection('licenses')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}
              >
                Licenses
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToSection('faq')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}
              >
                FAQ
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToSection('license-selector')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}
              >
                Get Started
              </button>
            </li>
            <li>
              <a 
                href="https://github.com/WorldLinkStudio/oml" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                Documentation
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

