import React from 'react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Card } from '../ui/Card';

interface AttributionFormProps {
  formData: {
    creatorName: string;
    creditFormat: string;
    contactEmail: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export const AttributionForm: React.FC<AttributionFormProps> = ({
  formData,
  onChange,
  errors,
}) => {
  return (
    <div className="license-selector-step">
      <h2 className="step-title">Attribution & Contact</h2>
      <p className="step-description">
        Provide creator information for proper attribution and licensing.
      </p>

      <Card padding="medium">
        <Input
          label="Creator Name"
          name="creatorName"
          value={formData.creatorName}
          onChange={(e) => onChange('creatorName', e.target.value)}
          error={errors.creatorName}
          required
          helperText="The name you want to appear in credits"
        />

        <Input
          label="Contact Email"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={(e) => onChange('contactEmail', e.target.value)}
          error={errors.contactEmail}
          required
          helperText="For licensing inquiries and payments (if applicable)"
        />

        <Textarea
          label="Credit Format Preference (Optional)"
          name="creditFormat"
          value={formData.creditFormat}
          onChange={(e) => onChange('creditFormat', e.target.value)}
          error={errors.creditFormat}
          rows={4}
          helperText="How you'd like to be credited. Leave blank for default format."
        />
      </Card>
    </div>
  );
};

