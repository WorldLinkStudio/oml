import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card } from '../ui/Card';
import { revenueRanges, licenseInfo } from '../../data/licenseData';

interface ProjectDetailsProps {
  formData: {
    projectName: string;
    releaseDate: string;
    revenueRange: string;
    preselectedLicenseType: string;
  };
  onChange: (field: string, value: string | string[]) => void;
  errors: Record<string, string>;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  formData,
  onChange,
  errors,
}) => {
  const revenueOptions = revenueRanges.map((range) => ({
    value: range.value,
    label: range.label,
  }));

  const licenseOptions = [
    { value: '', label: 'Auto-select based on my answers' },
    ...Object.entries(licenseInfo).map(([key, info]) => ({
      value: key,
      label: `${info.name} - ${info.description}`,
    })),
  ];

  return (
    <div className="license-selector-step">
      <h2 className="step-title">Project Details</h2>
      <p className="step-description">
        Tell us about your project so we can recommend the right license.
      </p>

      <Card padding="medium">
        <Input
          label="Project/Release Name"
          name="projectName"
          value={formData.projectName}
          onChange={(e) => onChange('projectName', e.target.value)}
          error={errors.projectName}
          required
          helperText="The name of your project, song, or release"
        />

        <Input
          label="Expected Release Date"
          name="releaseDate"
          type="date"
          value={formData.releaseDate}
          onChange={(e) => onChange('releaseDate', e.target.value)}
          error={errors.releaseDate}
        />

        <Select
          label="Expected Annual Revenue Range"
          name="revenueRange"
          options={revenueOptions}
          value={formData.revenueRange}
          onChange={(e) => onChange('revenueRange', e.target.value)}
          error={errors.revenueRange}
          placeholder="Select revenue range..."
          required
          helperText="This helps determine which license type is appropriate"
        />

        <Select
          label="Specific License Type (Optional)"
          name="preselectedLicenseType"
          options={licenseOptions}
          value={formData.preselectedLicenseType}
          onChange={(e) => onChange('preselectedLicenseType', e.target.value)}
          error={errors.preselectedLicenseType}
          helperText="If you know which license you need, you can select it here. Otherwise, we'll recommend one based on your answers."
        />
      </Card>
    </div>
  );
};

