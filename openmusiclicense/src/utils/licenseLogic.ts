import type { LicenseType, LicenseFormData } from '../types/license';

/**
 * Determines the recommended license type based on user selection and form data
 */
export function recommendLicense(formData: LicenseFormData): LicenseType {
  // If user preselected a license type from the comparison cards, use that
  if (formData.preselectedLicenseType !== '' && formData.preselectedLicenseType) {
    return formData.preselectedLicenseType;
  }

  const { useCase, revenueRange } = formData;

  // Sync license for film/TV/video/game uses
  if (
    useCase.includes('film') ||
    useCase.includes('tv') ||
    useCase.includes('trailer') ||
    useCase.includes('video-game') ||
    useCase.includes('commercial-advertisement') ||
    useCase.includes('corporate-video') ||
    useCase.includes('animation') ||
    useCase.includes('documentary')
  ) {
    return 'OML-S';
  }

  // OML-F only when expected revenue is $0
  if (revenueRange === '$0' || revenueRange === '0') {
    return 'OML-F';
  }

  // OML-P for $1000 and under
  if (revenueRange === '<1k' || revenueRange === '' || revenueRange === '1k') {
    return 'OML-P';
  }

  // OML-C if over $1000
  if (
    revenueRange === '1k-10k' ||
    revenueRange === '10k-50k' ||
    revenueRange === '50k+' ||
    revenueRange === 'unlimited'
  ) {
    return 'OML-C';
  }

  // Default to personal for safety
  return 'OML-P';
}

/**
 * Checks if the form data indicates commercial use
 */
export function isCommercialUse(formData: LicenseFormData): boolean {
  const { revenueRange, userType } = formData;
  return (
    revenueRange !== '<1k' &&
    revenueRange !== '' &&
    userType !== 'hobbyist' &&
    userType !== ''
  );
}

/**
 * Checks if the form data indicates sync use
 */
export function isSyncUse(useCase: string): boolean {
  return (
    useCase.includes('film') ||
    useCase.includes('tv') ||
    useCase.includes('trailer') ||
    useCase.includes('video-game') ||
    useCase.includes('commercial-advertisement') ||
    useCase.includes('corporate-video') ||
    useCase.includes('animation') ||
    useCase.includes('documentary')
  );
}

