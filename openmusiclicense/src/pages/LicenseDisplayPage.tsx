import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LicenseDisplayPage.css';

interface LicenseInfo {
  code: string;
  name: string;
  description: string;
  file: string;
}

const licenses: Record<string, LicenseInfo> = {
  'oml-p': {
    code: 'OML-P',
    name: 'Personal Use License',
    description: 'Free for projects under $1,000/year revenue. Perfect for emerging creators.',
    file: '/licenses/OML-P.txt'
  },
  'oml-c': {
    code: 'OML-C',
    name: 'Commercial Use License',
    description: 'For unlimited commercial use with negotiated compensation.',
    file: '/licenses/OML-C.txt'
  },
  'oml-f': {
    code: 'OML-F',
    name: 'Free/Open Source License',
    description: 'Completely free with no restrictions. Open source music licensing.',
    file: '/licenses/OML-F.txt'
  },
  'oml-s': {
    code: 'OML-S',
    name: 'Sync License',
    description: 'For synchronization with visual media (film, TV, advertising, games).',
    file: '/licenses/OML-S.txt'
  }
};

export const LicenseDisplayPage: React.FC = () => {
  const { licenseType } = useParams<{ licenseType: string }>();
  const navigate = useNavigate();
  const [licenseContent, setLicenseContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const license = licenseType ? licenses[licenseType.toLowerCase()] : null;

  useEffect(() => {
    if (!license) {
      setError('Invalid license type');
      setLoading(false);
      return;
    }

    fetch(license.file)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load license');
        }
        return response.text();
      })
      .then(text => {
        setLicenseContent(text);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [license]);

  if (!license) {
    return (
      <div className="license-display-page">
        <div className="license-container">
          <h1>License Not Found</h1>
          <p>The requested license type does not exist.</p>
          <button onClick={() => navigate('/')} className="back-button">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="license-display-page">
      <div className="license-container">
        <div className="license-header">
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
          <h1>{license.code}</h1>
          <h2>{license.name}</h2>
          <p className="license-description">{license.description}</p>
        </div>

        <div className="license-actions">
          <button 
            onClick={() => window.open(license.file, '_blank')}
            className="download-button"
          >
            Download License
          </button>
          <button 
            onClick={() => navigate('/')}
            className="generate-button"
          >
            Generate License
          </button>
        </div>

        {loading && (
          <div className="license-loading">
            <p>Loading license...</p>
          </div>
        )}

        {error && (
          <div className="license-error">
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="license-content">
            <pre>{licenseContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

