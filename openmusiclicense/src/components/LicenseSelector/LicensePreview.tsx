import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { GeneratedLicense } from '../../types/license';
import { downloadTextFile, copyToClipboard } from '../../utils/formatters';
import { licenseInfo } from '../../data/licenseData';

interface LicensePreviewProps {
  license: GeneratedLicense;
  onDownload: () => void;
  onCopy: () => void;
}

export const LicensePreview: React.FC<LicensePreviewProps> = ({
  license,
  onDownload,
  onCopy,
}) => {
  const info = licenseInfo[license.type];

  const handleDownload = () => {
    // Only download the license file, not attribution separately
    if (license.fullText) {
      downloadTextFile(license.fullText, `LICENSE-${license.type}.txt`);
      onDownload();
    } else {
      console.error('License text is empty, cannot download');
    }
  };

  const handleDownloadExecutionAgreement = () => {
    if (license.executionAgreement) {
      downloadTextFile(
        license.executionAgreement,
        `LICENSE-EXECUTION-AGREEMENT-${license.type}.txt`
      );
    } else {
      console.error('Execution agreement is empty, cannot download');
    }
  };

  const handleCopyAttribution = async () => {
    await copyToClipboard(license.attribution);
    onCopy();
  };

  // Generate example attribution usage
  const getAttributionExamples = () => {
    const { creatorName, assetTitle } = license.metadata;
    const examples = [
      `Audio File Metadata:\nProducer: ${creatorName || '[Creator Name]'}\nComment: Licensed under ${license.type}`,
      `Streaming Platform Credits:\n"${assetTitle || '[Work Title]'}" by ${creatorName || '[Creator Name]'} - Licensed under ${license.type}`,
      `Video Description:\nMusic: "${assetTitle || '[Work Title]'}" by ${creatorName || '[Creator Name]'} | ${license.type} License`,
      `Social Media Caption:\nBeat by ${creatorName || '[Creator Name]'} | ${license.type}`,
    ];
    return examples;
  };

  return (
    <div className="license-selector-step">
      <h2 className="step-title">Your License is Ready!</h2>
      <p className="step-description">
        We've generated your {info.name} license. Download it below and include
        the attribution information in your project.
      </p>

      <Card padding="large">
        <div className="license-preview-header">
          <div className="license-icon" aria-hidden="true">{info.icon}</div>
          <div>
            <h3 className="license-type-name">{info.name}</h3>
            <p className="license-type-description">{info.description}</p>
          </div>
        </div>

        <div className="license-preview-section">
          <h4>Attribution Text</h4>
          <p className="section-description">
            Copy this attribution text and include it in your project credits,
            metadata, or descriptions.
          </p>
          <pre className="license-attribution-preview">
            {license.attribution}
          </pre>
          <div className="license-actions">
            <Button variant="outline" onClick={handleCopyAttribution}>
              Copy Attribution
            </Button>
          </div>
        </div>

        <div className="license-preview-section">
          <h4>Attribution Examples</h4>
          <p className="section-description">
            Here are examples of how to use the attribution in different contexts:
          </p>
          <div className="attribution-examples">
            {getAttributionExamples().map((example, index) => (
              <div key={index} className="attribution-example">
                <pre>{example}</pre>
              </div>
            ))}
          </div>
        </div>

        <div className="license-preview-section">
          <div className="license-actions">
            <Button variant="primary" onClick={handleDownload}>
              Download Full License
            </Button>
            {license.executionAgreement && (
              <Button variant="primary" onClick={handleDownloadExecutionAgreement}>
                Download Execution Agreement
              </Button>
            )}
          </div>
          <p className="download-note">
            {license.executionAgreement 
              ? 'Download the full license file and the separate execution agreement. Both should be saved with your music assets.'
              : 'The downloaded file contains the full license text with your information filled in. Save it with your music assets.'}
          </p>
        </div>

        <div className="license-next-steps">
          <h4>Next Steps</h4>
          <ol>
            <li>
              Download the license file{license.executionAgreement ? ' and execution agreement' : ''} and save {license.executionAgreement ? 'them' : 'it'} with your music assets
            </li>
            <li>Copy the attribution text and include it in your project's metadata</li>
            <li>
              Add attribution to your project descriptions, credits, and
              promotional materials using the examples above
            </li>
            {license.executionAgreement && (
              <li>
                <strong>Review and sign the execution agreement</strong> with the licensee to
                finalize payment terms and scope of use
              </li>
            )}
            {!license.executionAgreement && (license.type === 'OML-C' || license.type === 'OML-S') && (
              <li>
                For commercial licenses (OML-C, OML-S), contact the creator to
                finalize payment terms
              </li>
            )}
          </ol>
        </div>
      </Card>
    </div>
  );
};

