import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const info = licenseInfo[license.type];
  const needsExecutionAgreement = license.type === 'OML-C' || license.type === 'OML-S';

  const handleDownload = () => {
    // Only download the license file, not attribution separately
    if (license.fullText) {
      downloadTextFile(license.fullText, `LICENSE-${license.type}.txt`);
      onDownload();
    } else {
      console.error('License text is empty, cannot download');
    }
  };

  const handleOpenAgreementForm = () => {
    navigate('/execution-agreement');
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
          </div>
          <p className="download-note">
            The downloaded file contains the full license text with your information filled in. Save it with your music assets.
          </p>
        </div>

        {needsExecutionAgreement && (
          <div className="license-preview-section">
            <h4>License Execution Agreement Form</h4>
            <p className="section-description">
              For {license.type} licenses, you'll need to complete a License Execution Agreement with your licensee to establish payment terms and scope of use. Click the button below to open the interactive form where you can fill it out and print it as a PDF.
            </p>
            <div className="license-actions">
              <Button 
                variant="primary" 
                onClick={handleOpenAgreementForm}
              >
                📄 Agreement Form
              </Button>
            </div>
            <p className="download-note">
              The form will open in a new page where you can fill in all the details and print it directly to PDF from your browser.
            </p>
          </div>
        )}

        <div className="license-next-steps">
          <h4>Next Steps</h4>
          <ol>
            <li>
              Download the license file and save it with your music assets
            </li>
            <li>Copy the attribution text and include it in your project's metadata</li>
            <li>
              Add attribution to your project descriptions, credits, and
              promotional materials using the examples above
            </li>
            {needsExecutionAgreement && (
              <>
                <li>
                  <strong>Open the Agreement Form</strong> using the button above
                </li>
                <li>
                  <strong>Fill out all required information</strong> on the form page
                </li>
                <li>
                  <strong>Print the completed form</strong> directly to PDF from your browser or sign it digitally
                </li>
                <li>
                  Keep both the license and the signed execution agreement with your project files
                </li>
              </>
            )}
          </ol>
        </div>
      </Card>
    </div>
  );
};

