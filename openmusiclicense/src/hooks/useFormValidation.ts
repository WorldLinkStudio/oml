import { useMemo } from 'react';
import type { LicenseFormData } from '../types/license';
import type { ValidationError } from '../types/form';

export function useFormValidation(formData: LicenseFormData, step: number) {
  const errors = useMemo(() => {
    const validationErrors: ValidationError[] = [];

    // Step 1: User Type
    if (step === 1) {
      if (!formData.userType) {
        validationErrors.push({
          field: 'userType',
          message: 'Please select who you are',
        });
      }
    }

    // Step 2: Use Case
    if (step === 2) {
      if (!formData.useCase) {
        validationErrors.push({
          field: 'useCase',
          message: 'Please select what you need',
        });
      }
    }

    // Step 3: Project Details
    if (step === 3) {
      if (!formData.projectName) {
        validationErrors.push({
          field: 'projectName',
          message: 'Project name is required',
        });
      }
      if (!formData.revenueRange) {
        validationErrors.push({
          field: 'revenueRange',
          message: 'Please select expected revenue range',
        });
      }
    }

    // Step 4: Attribution
    if (step === 4) {
      if (!formData.creatorName) {
        validationErrors.push({
          field: 'creatorName',
          message: 'Creator name is required',
        });
      }
      if (!formData.contactEmail) {
        validationErrors.push({
          field: 'contactEmail',
          message: 'Contact email is required',
        });
      } else {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.contactEmail)) {
          validationErrors.push({
            field: 'contactEmail',
            message: 'Please enter a valid email address',
          });
        }
      }
    }

    // Step 5: Asset Details
    if (step === 5) {
      if (!formData.assetType) {
        validationErrors.push({
          field: 'assetType',
          message: 'Asset type is required',
        });
      }
      if (!formData.assetTitle) {
        validationErrors.push({
          field: 'assetTitle',
          message: 'Asset title is required',
        });
      }
    }

    return validationErrors;
  }, [formData, step]);

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find((e) => e.field === fieldName)?.message;
  };

  const isValid = errors.length === 0;

  return {
    errors,
    isValid,
    getFieldError,
  };
}

