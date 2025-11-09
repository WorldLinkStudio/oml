import React from 'react';
import { useLicenseForm } from '../../context/LicenseFormContext';
import { useStepNavigation } from '../../hooks/useStepNavigation';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useLicenseGenerator } from '../../hooks/useLicenseGenerator';
import { StepIndicator } from './StepIndicator';
import { UserTypeSelector } from './UserTypeSelector';
import { UseCaseSelector } from './UseCaseSelector';
import { ProjectDetails } from './ProjectDetails';
import { AttributionForm } from './AttributionForm';
import { AssetDetails } from './AssetDetails';
import { LicensePreview } from './LicensePreview';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { recommendLicense } from '../../utils/licenseLogic';

const STEP_LABELS = [
  'Who You Are',
  'What You Need',
  'Project Details',
  'Attribution',
  'Asset Details',
  'Your License',
];

export const LicenseSelector: React.FC = () => {
  const { formData, updateFormData, setGeneratedLicense, generatedLicense } =
    useLicenseForm();
  const { generate, isGenerating } = useLicenseGenerator();
  const { currentStep, goNext, goBack, canGoBack, isLastStep } =
    useStepNavigation({
      totalSteps: STEP_LABELS.length,
    });
  const { isValid, getFieldError } = useFormValidation(formData, currentStep);

  const handleFieldChange = (field: string, value: string | string[]) => {
    updateFormData({ [field]: value });
  };

  const handleNext = async () => {
    if (!isValid && !isLastStep) {
      return;
    }

    // Auto-generate license when moving from step 5 (Asset Details) to final step (step 6)
    const shouldGenerate = currentStep === 5;
    
    if (shouldGenerate && !generatedLicense) {
      const license = await generate(formData);
      if (license) {
        setGeneratedLicense(license);
      }
      goNext();
      return;
    }

    if (isLastStep && !generatedLicense) {
      // Fallback: Generate license if somehow we reach final step without it
      const license = await generate(formData);
      if (license) {
        setGeneratedLicense(license);
      }
      return;
    }

    goNext();
  };

  const handleBack = () => {
    goBack();
  };

  const handleDownload = () => {
    // Download handled by LicensePreview component
  };

  const handleCopy = () => {
    // Could show toast notification here
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserTypeSelector
            value={formData.userType}
            onChange={(value) => handleFieldChange('userType', value)}
            error={getFieldError('userType')}
          />
        );
      case 2:
        return (
          <UseCaseSelector
            userType={formData.userType}
            value={formData.useCase}
            onChange={(value) => handleFieldChange('useCase', value)}
            error={getFieldError('useCase')}
          />
        );
      case 3:
        return (
          <ProjectDetails
            formData={{
              projectName: formData.projectName,
              releaseDate: formData.releaseDate,
              revenueRange: formData.revenueRange,
              preselectedLicenseType: formData.preselectedLicenseType || '',
            }}
            onChange={handleFieldChange}
            errors={{
              projectName: getFieldError('projectName') || '',
              revenueRange: getFieldError('revenueRange') || '',
              preselectedLicenseType: getFieldError('preselectedLicenseType') || '',
            }}
          />
        );
      case 4:
        return (
          <AttributionForm
            formData={{
              creatorName: formData.creatorName,
              creditFormat: formData.creditFormat,
              contactEmail: formData.contactEmail,
            }}
            onChange={(field, value) => handleFieldChange(field, value)}
            errors={{
              creatorName: getFieldError('creatorName') || '',
              contactEmail: getFieldError('contactEmail') || '',
            }}
          />
        );
      case 5:
        return (
          <AssetDetails
            formData={{
              assetType: formData.assetType,
              assetTitle: formData.assetTitle,
              bpm: formData.bpm,
              key: formData.key,
              additionalNotes: formData.additionalNotes,
            }}
            onChange={(field, value) => handleFieldChange(field, value)}
            errors={{
              assetType: getFieldError('assetType') || '',
              assetTitle: getFieldError('assetTitle') || '',
            }}
          />
        );
      case 6:
        if (generatedLicense) {
          return (
            <LicensePreview
              license={generatedLicense}
              onDownload={handleDownload}
              onCopy={handleCopy}
            />
          );
        } else {
          return (
            <div className="license-selector-step">
              <Card padding="large">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                    {isGenerating ? 'Generating your license...' : 'Loading license...'}
                  </p>
                  {isGenerating && (
                    <div style={{ color: 'var(--color-primary)' }}>
                      Please wait while we prepare your license file.
                    </div>
                  )}
                </div>
              </Card>
            </div>
          );
        }
      default:
        return null;
    }
  };

  const recommendedLicenseType = formData.userType && formData.useCase 
    ? recommendLicense(formData) 
    : null;

  return (
    <section className="license-selector-section" id="license-selector">
      <div className="license-selector-container">
        <div className="license-selector-header">
          <h2 className="section-title">Choose Your License</h2>
          <p className="section-description">
            Answer a few questions to get the perfect license for your needs.
          </p>
          {recommendedLicenseType && currentStep < 5 && (
            <div className="license-recommendation">
              <strong>Recommended:</strong> {recommendedLicenseType}
            </div>
          )}
        </div>

        <StepIndicator
          currentStep={currentStep}
          totalSteps={STEP_LABELS.length}
          stepLabels={STEP_LABELS}
        />

        <div className="license-selector-content">
          {renderStep()}
        </div>

        <div className="license-selector-actions">
          {canGoBack && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <div className="spacer" />
          {!isLastStep && (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!isValid || isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

