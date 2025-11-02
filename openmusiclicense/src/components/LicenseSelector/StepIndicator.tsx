import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
}) => {
  return (
    <div className="step-indicator" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      <div className="step-indicator-track">
        <div
          className="step-indicator-progress"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
      <ol className="step-list">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;
          
          return (
            <li
              key={stepNumber}
              className={`step-item ${isActive ? 'step-item-active' : ''} ${isComplete ? 'step-item-complete' : ''}`}
            >
              <div className="step-marker" aria-label={`Step ${stepNumber}: ${label}`}>
                {isComplete ? (
                  <span className="step-checkmark" aria-hidden="true">✓</span>
                ) : (
                  <span className="step-number">{stepNumber}</span>
                )}
              </div>
              <span className="step-label">{label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

