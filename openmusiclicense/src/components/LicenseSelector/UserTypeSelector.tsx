import React from 'react';
import { Select } from '../ui/Select';
import { userTypes } from '../../data/userTypes';

interface UserTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  const options = userTypes.map((type) => ({
    value: type.value,
    label: type.label,
  }));

  return (
    <div className="license-selector-step">
      <h2 className="step-title">Who are you?</h2>
      <p className="step-description">
        Select the option that best describes your role or situation.
      </p>
      <Select
        label="I am a"
        options={options}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Select your role..."
        error={error}
        required
      />
    </div>
  );
};

