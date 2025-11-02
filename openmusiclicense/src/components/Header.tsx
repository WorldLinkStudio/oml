import React, { useState } from 'react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header" role="banner">
      <div className="header-container">
        <div className="header-logo">
          <a href="/" className="logo-link">
            <span className="logo-text">Open Music License</span>
          </a>
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
              <a href="#about" onClick={() => setIsMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#licenses" onClick={() => setIsMenuOpen(false)}>
                Licenses
              </a>
            </li>
            <li>
              <a href="#faq" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#license-selector" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </a>
            </li>
            <li>
              <a href="#documentation" onClick={() => setIsMenuOpen(false)}>
                Documentation
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

