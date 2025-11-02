import { useState, useCallback } from 'react';

interface UseStepNavigationProps {
  totalSteps: number;
  onStepChange?: (step: number) => void;
}

export function useStepNavigation({
  totalSteps,
  onStepChange,
}: UseStepNavigationProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const goNext = useCallback(() => {
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    }
  }, [currentStep, totalSteps, onStepChange]);

  const goBack = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
  }, [currentStep, onStepChange]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
        onStepChange?.(step);
      }
    },
    [totalSteps, onStepChange]
  );

  const reset = useCallback(() => {
    setCurrentStep(1);
    onStepChange?.(1);
  }, [onStepChange]);

  return {
    currentStep,
    totalSteps,
    goNext,
    goBack,
    goToStep,
    reset,
    canGoBack: currentStep > 1,
    canGoNext: currentStep < totalSteps,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
  };
}

