import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Open Music License</h3>
          <p>
            A fair, transparent, and enforceable open-source license framework
            for music production assets.
          </p>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul className="footer-links">
            <li>
              <a href="#documentation">Documentation</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>License Types</h4>
          <ul className="footer-links">
            <li>
              <a href="/licenses/oml-p">OML-P (Personal)</a>
            </li>
            <li>
              <a href="/licenses/oml-c">OML-C (Commercial)</a>
            </li>
            <li>
              <a href="/licenses/oml-s">OML-S (Sync)</a>
            </li>
            <li>
              <a href="/licenses/oml-f">OML-F (Full Rights)</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li>
              <a href="#terms">Terms of Use</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Open Music License. Licensed under CC0.
        </p>
      </div>
    </footer>
  );
};

