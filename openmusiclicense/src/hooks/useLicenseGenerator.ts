import { useState, useCallback } from 'react';
import type { LicenseFormData, GeneratedLicense } from '../types/license';
import { generateLicense } from '../utils/licenseTemplates';

export function useLicenseGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (formData: LicenseFormData): Promise<GeneratedLicense | null> => {
      setIsGenerating(true);
      setError(null);

      try {
        const license = await generateLicense(formData);
        return license;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to generate license';
        setError(errorMessage);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  return {
    generate,
    isGenerating,
    error,
  };
}

