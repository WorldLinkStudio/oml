import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '../components/ui/Card';
import type { LicenseType } from '../types/license';
import { licenseInfo } from '../data/licenseData';

export const LicensePage: React.FC = () => {
  const { licenseType } = useParams<{ licenseType: string }>();
  const [licenseText, setLicenseText] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert URL parameter like "oml-p" to "OML-P" (uppercase with hyphen preserved)
  const validLicenseType = licenseType
    ? (licenseType.toUpperCase() as LicenseType)
    : null;
  
  const info = validLicenseType && ['OML-P', 'OML-C', 'OML-S', 'OML-F'].includes(validLicenseType) 
    ? licenseInfo[validLicenseType] 
    : null;

  useEffect(() => {
    const loadLicense = async () => {
      if (!validLicenseType || !['OML-P', 'OML-C', 'OML-S', 'OML-F'].includes(validLicenseType)) {
        setError('Invalid license type');
        setLoading(false);
        return;
      }

      try {
        // Use the license type with hyphen to match the actual file names (OML-P.txt, OML-C.txt, etc.)
        const licenseFile = `/licenses/${validLicenseType}.txt`;
        const response = await fetch(licenseFile);
        
        if (!response.ok) {
          throw new Error('Failed to load license file');
        }
        
        const text = await response.text();
        setLicenseText(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load license');
      } finally {
        setLoading(false);
      }
    };

    loadLicense();
  }, [validLicenseType]);

  if (!info) {
    return (
      <div className="app">
        <Header />
        <main className="main-content">
          <section className="license-page-section">
            <div className="license-page-container">
              <h1>License Not Found</h1>
              <p>The requested license type does not exist.</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content" role="main">
        <section className="license-page-section">
          <div className="license-page-container">
            <div className="license-page-header">
              <div className="license-icon-large" aria-hidden="true">{info.icon}</div>
              <div>
                <h1 className="section-title">{info.name}</h1>
                <p className="section-description">{info.description}</p>
              </div>
            </div>

            <Card padding="large">
              <div className="license-features">
                <h2>Features</h2>
                <ul>
                  {info.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              {loading && (
                <div className="license-loading">
                  <p>Loading license text...</p>
                </div>
              )}

              {error && (
                <div className="license-error">
                  <p>Error: {error}</p>
                </div>
              )}

              {!loading && !error && licenseText && (
                <div className="license-text-container">
                  <h2>Full License Text</h2>
                  <pre className="license-text-full">{licenseText}</pre>
                </div>
              )}
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

