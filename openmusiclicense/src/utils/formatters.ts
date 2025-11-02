import type { LicenseType, LicenseFormData } from '../types/license';

/**
 * Formats a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats attribution text based on license type and form data
 */
export function formatAttribution(
  licenseType: LicenseType,
  formData: LicenseFormData
): string {
  const { creatorName, assetTitle, creditFormat, contactEmail } = formData;
  const currentYear = new Date().getFullYear();

  if (creditFormat && creditFormat.trim()) {
    return creditFormat;
  }

  const baseAttribution = `"${assetTitle || '[Work Title]'}" by ${creatorName || '[Creator Name]'} (C) ${currentYear} ${creatorName || '[Creator Name]'}`;

  switch (licenseType) {
    case 'OML-P':
      return `${baseAttribution}\nLicensed under OML-P License${contactEmail ? `\nContact: ${contactEmail}` : ''}`;
    
    case 'OML-C':
      return `${baseAttribution}\nLicensed under OML-C License${contactEmail ? `\nContact: ${contactEmail}` : ''}`;
    
    case 'OML-S':
      return `${baseAttribution}\nLicensed under OML-S License${contactEmail ? `\nContact: ${contactEmail}` : ''}`;
    
    case 'OML-F':
      return `${baseAttribution}\nLicensed under OML-F License${contactEmail ? `\nContact: ${contactEmail}` : ''}`;
    
    default:
      return baseAttribution;
  }
}

/**
 * Downloads a text file
 */
export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

