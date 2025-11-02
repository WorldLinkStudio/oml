import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Card } from '../ui/Card';
import { assetTypes } from '../../data/licenseData';

interface AssetDetailsProps {
  formData: {
    assetType: string;
    assetTitle: string;
    bpm?: string;
    key?: string;
    additionalNotes?: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export const AssetDetails: React.FC<AssetDetailsProps> = ({
  formData,
  onChange,
  errors,
}) => {
  const assetOptions = assetTypes.map((type) => ({
    value: type.toLowerCase().replace(/\s+/g, '-'),
    label: type,
  }));

  return (
    <div className="license-selector-step">
      <h2 className="step-title">Asset Details</h2>
      <p className="step-description">
        Tell us about the music asset you're licensing.
      </p>

      <Card padding="medium">
        <Select
          label="Asset Type"
          name="assetType"
          options={assetOptions}
          value={formData.assetType}
          onChange={(e) => onChange('assetType', e.target.value)}
          error={errors.assetType}
          placeholder="Select asset type..."
          required
        />

        <Input
          label="Asset Title"
          name="assetTitle"
          value={formData.assetTitle}
          onChange={(e) => onChange('assetTitle', e.target.value)}
          error={errors.assetTitle}
          required
          helperText="The name or title of your music asset"
        />

        <div className="form-row">
          <Input
            label="BPM (Optional)"
            name="bpm"
            type="number"
            value={formData.bpm || ''}
            onChange={(e) => onChange('bpm', e.target.value)}
            error={errors.bpm}
            helperText="Beats per minute"
          />

          <Input
            label="Key (Optional)"
            name="key"
            value={formData.key || ''}
            onChange={(e) => onChange('key', e.target.value)}
            error={errors.key}
            helperText="Musical key (e.g., C Major, A Minor)"
          />
        </div>

        <Textarea
          label="Additional Notes (Optional)"
          name="additionalNotes"
          value={formData.additionalNotes || ''}
          onChange={(e) => onChange('additionalNotes', e.target.value)}
          error={errors.additionalNotes}
          rows={4}
          helperText="Any additional information about the asset"
        />
      </Card>
    </div>
  );
};

