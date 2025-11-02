import React from 'react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  const scrollToSelector = () => {
    const selector = document.getElementById('license-selector');
    if (selector) {
      selector.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero-container">
        <h1 className="hero-title" id="hero-title">Fair Licensing for Music Creators</h1>
        <p className="hero-description">
          Protect your work while sharing openly. Clear terms, transparent
          pricing, and a licensing framework built by creators, for creators.
        </p>
        <div className="hero-actions">
          <Button variant="primary" size="large" onClick={scrollToSelector}>
            Choose Your License
          </Button>
          <Button variant="outline" size="large" onClick={() => {
            const licenses = document.getElementById('licenses');
            licenses?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

