import React from 'react';
import { Select } from '../ui/Select';
import { getUseCasesForUserType } from '../../data/useCases';

interface UseCaseSelectorProps {
  userType: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const UseCaseSelector: React.FC<UseCaseSelectorProps> = ({
  userType,
  value,
  onChange,
  error,
}) => {
  const useCases = getUseCasesForUserType(userType);
  const options = useCases.map((useCase) => ({
    value: useCase.value,
    label: useCase.label,
  }));

  if (!userType) {
    return (
      <div className="license-selector-step">
        <h2 className="step-title">What do you need?</h2>
        <p className="step-description">
          Please select who you are first.
        </p>
      </div>
    );
  }

  return (
    <div className="license-selector-step">
      <h2 className="step-title">What do you need?</h2>
      <p className="step-description">
        Select your intended use case for the license.
      </p>
      <Select
        label="I need a license to"
        options={options}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Select your use case..."
        error={error}
        required
      />
    </div>
  );
};

