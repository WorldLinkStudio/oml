import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { licenseInfo } from '../data/licenseData';
import { useLicenseForm } from '../context/LicenseFormContext';
import type { LicenseType } from '../types/license';

export const LicenseComparison: React.FC = () => {
  const licenses = ['OML-P', 'OML-C', 'OML-S', 'OML-F'] as const;
  const { updateFormData } = useLicenseForm();

  return (
    <section className="license-comparison-section" id="licenses">
      <div className="section-container">
        <h2 className="section-title">Compare License Types</h2>
        <p className="section-description">
          Choose the license that best fits your needs and budget.
        </p>

        <div className="license-comparison-grid">
          {licenses.map((licenseKey) => {
            const info = licenseInfo[licenseKey];
            return (
              <Card key={licenseKey} padding="large" className="license-card">
                <div className="license-card-header">
                  <div className="license-icon-large" aria-hidden="true">{info.icon}</div>
                  <h3 className="license-card-title">{info.name}</h3>
                  <p className="license-card-price">{info.price}</p>
                </div>

                <p className="license-card-description">{info.description}</p>

                <ul className="license-features">
                  {info.features.map((feature, index) => (
                    <li key={index} className="license-feature">
                      <span className="feature-checkmark" aria-hidden="true">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    // Set the preselected license type
                    updateFormData({ preselectedLicenseType: licenseKey as LicenseType });
                    const selector = document.getElementById('license-selector');
                    selector?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Get {info.name}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

