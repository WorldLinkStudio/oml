export interface FormStep {
  id: string;
  title: string;
  description: string;
  component: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface StepNavigation {
  currentStep: number;
  totalSteps: number;
  canGoBack: boolean;
  canGoNext: boolean;
  isComplete: boolean;
}

