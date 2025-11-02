import React, { createContext, useContext, useState, useCallback } from 'react';
import type { LicenseFormData, GeneratedLicense } from '../types/license';

interface LicenseFormContextType {
  formData: LicenseFormData;
  updateFormData: (data: Partial<LicenseFormData>) => void;
  resetForm: () => void;
  generatedLicense: GeneratedLicense | null;
  setGeneratedLicense: (license: GeneratedLicense | null) => void;
}

const initialFormData: LicenseFormData = {
  userType: '',
  useCase: '',
  projectName: '',
  releaseDate: '',
  revenueRange: '',
  creatorName: '',
  creditFormat: '',
  contactEmail: '',
  assetType: '',
  assetTitle: '',
  bpm: '',
  key: '',
  additionalNotes: '',
  preselectedLicenseType: '',
  executionAgreement: {},
};

const LicenseFormContext = createContext<LicenseFormContextType | undefined>(undefined);

export const LicenseFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<LicenseFormData>(initialFormData);
  const [generatedLicense, setGeneratedLicense] = useState<GeneratedLicense | null>(null);

  const updateFormData = useCallback((data: Partial<LicenseFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setGeneratedLicense(null);
  }, []);

  return (
    <LicenseFormContext.Provider
      value={{
        formData,
        updateFormData,
        resetForm,
        generatedLicense,
        setGeneratedLicense,
      }}
    >
      {children}
    </LicenseFormContext.Provider>
  );
};

export const useLicenseForm = () => {
  const context = useContext(LicenseFormContext);
  if (!context) {
    throw new Error('useLicenseForm must be used within a LicenseFormProvider');
  }
  return context;
};

