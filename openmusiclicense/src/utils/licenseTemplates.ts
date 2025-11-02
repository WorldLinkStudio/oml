import type { LicenseType, LicenseFormData, GeneratedLicense } from '../types/license';
import { recommendLicense } from './licenseLogic';
import { formatDate, formatAttribution } from './formatters';

/**
 * Generates a complete license file from form data
 */
export async function generateLicense(
  formData: LicenseFormData
): Promise<GeneratedLicense> {
  const licenseType = recommendLicense(formData);
  const licenseText = await generateLicenseText(licenseType, formData);
  const attribution = formatAttribution(licenseType, formData);
  
  // Generate execution agreement if applicable
  let executionAgreement: string | undefined;
  if ((licenseType === 'OML-C' || licenseType === 'OML-S') && formData.executionAgreement) {
    executionAgreement = extractExecutionAgreement(licenseText);
  }

  return {
    type: licenseType,
    fullText: licenseText,
    attribution,
    metadata: formData,
    generatedDate: new Date().toISOString(),
    executionAgreement,
  };
}

/**
 * Generates the full license text for a given license type
 */
async function generateLicenseText(
  licenseType: LicenseType,
  formData: LicenseFormData
): Promise<string> {
  const baseTemplate = await getLicenseTemplate(licenseType);
  
  const creatorName = formData.creatorName || '[Creator Name]';
  const contactEmail = formData.contactEmail || '[Creator Email]';
  const assetTitle = formData.assetTitle || '[Work Title]';
  const projectName = formData.projectName || '[Project Name]';
  const releaseDate = formData.releaseDate || '[Release Date]';
  const currentDate = formatDate(new Date());
  const currentYear = new Date().getFullYear().toString();
  
  // Website/URL handling - use email domain if available, otherwise placeholder
  const website = contactEmail && contactEmail !== '[Creator Email]' 
    ? `https://${contactEmail.split('@')[1]}` 
    : '[Creator Website]';
  
  // Replace all placeholder variations
  let licenseText = baseTemplate
    // Name variations
    .replace(/\[Name\]/g, creatorName)
    .replace(/\[Creator Name\]/g, creatorName)
    .replace(/\[Your Name\]/g, creatorName)
    // Email
    .replace(/\[Email\]/g, contactEmail)
    // Website/URL
    .replace(/\[Website\]/g, website)
    .replace(/\[URL if available\]/g, website)
    // Work/Asset
    .replace(/\[Work Title\]/g, assetTitle)
    .replace(/\[Track Name\]/g, assetTitle)
    .replace(/\[Project Name\]/g, projectName)
    // Dates
    .replace(/\[Date\]/g, currentDate)
    .replace(/\[Release Date\]/g, releaseDate)
    .replace(/\[Year\]/g, currentYear)
    // Jurisdiction - default to a generic placeholder if not provided
    .replace(/\[Creator's Jurisdiction\]/g, '[Creator\'s Jurisdiction]');

  // Replace underscore-based placeholders in form sections
  // These appear in sections like "Creator: _______________"
  // We'll replace them where appropriate, but preserve checkbox-style placeholders like [ ] 
  licenseText = licenseText.replace(
    /Creator:\s*_{10,}/g,
    `Creator: ${creatorName}`
  );
  licenseText = licenseText.replace(
    /Creator Name:\s*_{10,}/g,
    `Creator Name: ${creatorName}`
  );
  licenseText = licenseText.replace(
    /Contact Email:\s*_{10,}/g,
    `Contact Email: ${contactEmail}`
  );
  licenseText = licenseText.replace(
    /Email:\s*_{10,}/g,
    `Email: ${contactEmail}`
  );
  licenseText = licenseText.replace(
    /Website:\s*_{10,}/g,
    `Website: ${website}`
  );

  // Fix the CONTACT INFORMATION section to show the correct license type
  // Replace the hardcoded "Commercial License (OML-C)" text with the current license type
  licenseText = licenseText.replace(
    /For questions or to obtain a Commercial License \(OML-C\):/g,
    `For questions about this license (${licenseType})${licenseType === 'OML-P' ? ' or to obtain a Commercial License (OML-C)' : ''}:`
  );

  // Fill in execution agreement fields for Commercial and Sync licenses
  if ((licenseType === 'OML-C' || licenseType === 'OML-S') && formData.executionAgreement) {
    licenseText = fillExecutionAgreement(licenseText, formData, licenseType);
  }

  return licenseText;
}

/**
 * Fills in the License Execution Agreement section with form data
 */
function fillExecutionAgreement(
  licenseText: string,
  formData: LicenseFormData,
  licenseType: LicenseType
): string {
  const agreement = formData.executionAgreement || {};
  const creatorName = formData.creatorName || '[Creator Name]';
  const contactEmail = formData.contactEmail || '[Creator Email]';
  const assetTitle = formData.assetTitle || '[Work Title]';
  const assetDescription = formData.additionalNotes || '[Description]';
  
  const isSyncLicense = licenseType === 'OML-S';

  // LICENSEE
  if (agreement.licenseeInfo) {
    licenseText = licenseText.replace(
      /LICENSEE:\s*_{10,}/g,
      `LICENSEE: ${agreement.licenseeInfo}`
    );
  }

  // Sync-specific: Project and Production Company
  if (isSyncLicense) {
    if (agreement.projectType) {
      licenseText = licenseText.replace(
        /Type: \[ \] Film  \[ \] TV  \[ \] Documentary  \[ \] Advertising  \[ \] Video Game  \n\[ \] Web Series  \[ \] Corporate  \[ \] Music Video  \[ \] Other:/,
        (match) => {
          const typeMap: Record<string, string> = {
            'Film': '[X] Film  [ ] TV  [ ] Documentary  [ ] Advertising  [ ] Video Game  \n[ ] Web Series  [ ] Corporate  [ ] Music Video  [ ] Other:',
            'TV': '[ ] Film  [X] TV  [ ] Documentary  [ ] Advertising  [ ] Video Game  \n[ ] Web Series  [ ] Corporate  [ ] Music Video  [ ] Other:',
            'Documentary': '[ ] Film  [ ] TV  [X] Documentary  [ ] Advertising  [ ] Video Game  \n[ ] Web Series  [ ] Corporate  [ ] Music Video  [ ] Other:',
            'Advertising': '[ ] Film  [ ] TV  [ ] Documentary  [X] Advertising  [ ] Video Game  \n[ ] Web Series  [ ] Corporate  [ ] Music Video  [ ] Other:',
            'Video Game': '[ ] Film  [ ] TV  [ ] Documentary  [ ] Advertising  [X] Video Game  \n[ ] Web Series  [ ] Corporate  [ ] Music Video  [ ] Other:',
            'Web Series': '[ ] Film  [ ] TV  [ ] Documentary  [ ] Advertising  [ ] Video Game  \n[X] Web Series  [ ] Corporate  [ ] Music Video  [ ] Other:',
            'Corporate': '[ ] Film  [ ] TV  [ ] Documentary  [ ] Advertising  [ ] Video Game  \n[ ] Web Series  [X] Corporate  [ ] Music Video  [ ] Other:',
            'Music Video': '[ ] Film  [ ] TV  [ ] Documentary  [ ] Advertising  [ ] Video Game  \n[ ] Web Series  [ ] Corporate  [X] Music Video  [ ] Other:',
          };
          return typeMap[agreement.projectType!] || match;
        }
      );
    }
    
    if (agreement.productionCompany) {
      licenseText = licenseText.replace(
        /Production Company:\s*_{10,}/,
        `Production Company: ${agreement.productionCompany}`
      );
    }
  }

  // WORK INFORMATION - Title and Description
  licenseText = licenseText.replace(
    /Title:\s*_{10,}/g,
    `Title: ${assetTitle}`
  );
  
  if (agreement.intendedUse || assetDescription) {
    const description = agreement.intendedUse || assetDescription;
    licenseText = licenseText.replace(
      /Description:\s*_{10,}\s*\n\s*_{10,}/g,
      `Description: ${description}`
    );
  }

  // PAYMENT STRUCTURE - Sync License has different payment structure
  if (isSyncLicense) {
    // License Fee
    if (agreement.licenseFee) {
      licenseText = licenseText.replace(
        /LICENSE FEE:\s*\$_{10,}\s*USD/,
        `LICENSE FEE: $${agreement.licenseFee} USD`
      );
    }

    // Payment Schedule
    if (agreement.paymentSchedule === 'full') {
      licenseText = licenseText.replace(
        /\[ \] Full payment upon execution/,
        '[X] Full payment upon execution'
      );
    } else if (agreement.paymentSchedule === '50-50') {
      const halfAmount = agreement.licenseFee ? (parseFloat(agreement.licenseFee) / 2).toString() : '___';
      licenseText = licenseText.replace(
        /\[ \] 50% upon execution \(\$_{5,}\), 50% before first use \(\$_{5,}\)/,
        `[X] 50% upon execution ($${halfAmount}), 50% before first use ($${halfAmount})`
      );
    } else if (agreement.paymentSchedule === 'custom' && agreement.paymentScheduleCustom) {
      licenseText = licenseText.replace(
        /\[ \] Custom: _{10,}/,
        `[X] Custom: ${agreement.paymentScheduleCustom}`
      );
    }

    // Rush Fee
    if (agreement.rushFee) {
      licenseText = licenseText.replace(
        /\[ \] Rush delivery: Add \$_{5,} to License Fee/,
        `[X] Rush delivery: Add $${agreement.rushFee} to License Fee`
      );
    }
  }
  
  // PAYMENT STRUCTURE - Commercial License
  if (!isSyncLicense && agreement.paymentOption === 'percentage') {
    // Check Option A
    licenseText = licenseText.replace(
      /\[ \] OPTION A: Percentage-Based Royalty/,
      '[X] OPTION A: Percentage-Based Royalty'
    );
    if (agreement.royaltyRate) {
      licenseText = licenseText.replace(
        /Royalty Rate:\s*_+% of Net Revenue/,
        `Royalty Rate: ${agreement.royaltyRate}% of Net Revenue`
      );
    }
  } else if (!isSyncLicense && agreement.paymentOption === 'flat-fee') {
    // Check Option B
    licenseText = licenseText.replace(
      /\[ \] OPTION B: Flat Fee/,
      '[X] OPTION B: Flat Fee'
    );
    if (agreement.flatFeeAmount) {
      licenseText = licenseText.replace(
        /Amount:\s*\$_{10,}\s*USD/,
        `Amount: $${agreement.flatFeeAmount} USD`
      );
    }
    if (agreement.scope) {
      licenseText = licenseText.replace(
        /Scope:\s*_{10,}/,
        `Scope: ${agreement.scope}`
      );
    }
    if (agreement.term === 'perpetual') {
      licenseText = licenseText.replace(
        /Term: \[ \] Perpetual/,
        'Term: [X] Perpetual'
      );
    } else if (agreement.term === 'years' && agreement.termYears) {
      licenseText = licenseText.replace(
        /Term: \[ \] Perpetual  \[ \] _+ years/,
        `Term: [ ] Perpetual  [X] ${agreement.termYears} years`
      );
    }
  } else if (!isSyncLicense && agreement.paymentOption === 'hybrid') {
    // Check Option C
    licenseText = licenseText.replace(
      /\[ \] OPTION C: Hybrid/,
      '[X] OPTION C: Hybrid'
    );
    if (agreement.hybridUpfront) {
      licenseText = licenseText.replace(
        /Upfront Fee:\s*\$_{10,}\s*USD/,
        `Upfront Fee: $${agreement.hybridUpfront} USD`
      );
    }
    if (agreement.hybridRoyalty) {
      licenseText = licenseText.replace(
        /Plus Royalty:\s*_+% of Net Revenue/,
        `Plus Royalty: ${agreement.hybridRoyalty}% of Net Revenue`
      );
    }
  }

  // PAYMENT DETAILS
  if (agreement.paymentMethod) {
    const methodMap: Record<string, string> = {
      'bank-transfer': 'Bank Transfer',
      'paypal': 'PayPal',
      'check': 'Check',
      'other': 'Other'
    };
    
    const methodLabel = methodMap[agreement.paymentMethod] || agreement.paymentMethod;
    
    if (agreement.paymentMethod === 'bank-transfer') {
      licenseText = licenseText.replace(
        /\[ \] Bank Transfer \(Details: _{10,}\)/,
        `[X] Bank Transfer (Details: ${agreement.paymentDetails || '_______________________'})`
      );
    } else if (agreement.paymentMethod === 'paypal') {
      licenseText = licenseText.replace(
        /\[ \] PayPal \(Email: _{10,}\)/,
        `[X] PayPal (Email: ${agreement.paymentDetails || contactEmail})`
      );
    } else if (agreement.paymentMethod === 'check') {
      licenseText = licenseText.replace(
        /\[ \] Check \(Payable to: _{10,}\)/,
        `[X] Check (Payable to: ${agreement.paymentDetails || creatorName})`
      );
    } else if (agreement.paymentMethod === 'other') {
      licenseText = licenseText.replace(
        /\[ \] Other: _{10,}/,
        `[X] Other: ${agreement.paymentDetails || '_______________________'}`
      );
    }
  }

  // Creator's Payment Information
  if (agreement.paymentName || creatorName) {
    licenseText = licenseText.replace(
      /Name:\s*_{10,}(?=\s*\nAddress:)/,
      `Name: ${agreement.paymentName || creatorName}`
    );
  }
  if (agreement.paymentAddress) {
    licenseText = licenseText.replace(
      /Address:\s*_{10,}(?=\s*\nEmail:)/,
      `Address: ${agreement.paymentAddress}`
    );
  }
  if (contactEmail && contactEmail !== '[Creator Email]') {
    licenseText = licenseText.replace(
      /Email:\s*_{10,}(?=\s*\nPhone:)/,
      `Email: ${contactEmail}`
    );
  }
  if (agreement.paymentPhone) {
    licenseText = licenseText.replace(
      /Phone:\s*_{10,}(?=\s*\nTax ID)/,
      `Phone: ${agreement.paymentPhone}`
    );
  }
  if (agreement.taxId) {
    licenseText = licenseText.replace(
      /Tax ID \(if applicable\):\s*_{10,}/,
      `Tax ID (if applicable): ${agreement.taxId}`
    );
  }

  // SCOPE OF USE
  if (agreement.intendedUse) {
    licenseText = licenseText.replace(
      /Intended Use:\s*_{10,}\s*\n\s*_{10,}/,
      `Intended Use: ${agreement.intendedUse}`
    );
  }

  if (agreement.territory === 'worldwide') {
    licenseText = licenseText.replace(
      /Territory: \[ \] Worldwide/,
      'Territory: [X] Worldwide'
    );
  } else if (agreement.territory === 'custom' && agreement.territoryCustom) {
    licenseText = licenseText.replace(
      /Territory: \[ \] Worldwide  \[ \] _{10,}/,
      `Territory: [ ] Worldwide  [X] ${agreement.territoryCustom}`
    );
  }

  if (agreement.media === 'all') {
    licenseText = licenseText.replace(
      /Media\/Platforms: \[ \] All Media/,
      'Media/Platforms: [X] All Media'
    );
  } else if (agreement.media === 'custom' && agreement.mediaCustom) {
    licenseText = licenseText.replace(
      /Media\/Platforms: \[ \] All Media  \[ \] _{10,}/,
      `Media/Platforms: [ ] All Media  [X] ${agreement.mediaCustom}`
    );
  }

  // ADDITIONAL TERMS
  if (agreement.specialTerms) {
    licenseText = licenseText.replace(
      /Any special provisions, restrictions, or custom terms:\s*\n\s*_{10,}\s*\n\s*_{10,}\s*\n\s*_{10,}/,
      `Any special provisions, restrictions, or custom terms:\n\n${agreement.specialTerms}`
    );
  }

  return licenseText;
}

/**
 * Extracts the LICENSE EXECUTION AGREEMENT section from the full license text
 */
function extractExecutionAgreement(licenseText: string): string {
  // Find the execution agreement section - look for the heading
  const commercialMarker = 'LICENSE EXECUTION AGREEMENT';
  const syncMarker = 'SYNC LICENSE EXECUTION AGREEMENT';
  const endPhrase = 'This license enables';
  
  // Try to find the start of the execution agreement
  let startIndex = licenseText.indexOf(commercialMarker);
  if (startIndex === -1) {
    startIndex = licenseText.indexOf(syncMarker);
  }
  
  if (startIndex === -1) {
    return ''; // No execution agreement found
  }
  
  // Find the end - look for the closing separator before the summary text
  const endPhraseIndex = licenseText.indexOf(endPhrase, startIndex);
  if (endPhraseIndex === -1) {
    return ''; // Couldn't find end marker
  }
  
  // Find the last separator line before the end phrase
  const textBeforeEnd = licenseText.substring(startIndex, endPhraseIndex);
  const lastSeparatorIndex = textBeforeEnd.lastIndexOf('===============================================================================');
  
  if (lastSeparatorIndex === -1) {
    return ''; // Couldn't find closing separator
  }
  
  // Calculate actual position in full text
  const endIndex = startIndex + lastSeparatorIndex + '==============================================================================='.length;
  
  // Find the previous separator line before the agreement starts
  const textBeforeStart = licenseText.substring(0, startIndex);
  const startSeparatorIndex = textBeforeStart.lastIndexOf('===============================================================================');
  
  if (startSeparatorIndex !== -1) {
    // Include the separator line before the agreement
    return licenseText.substring(startSeparatorIndex, endIndex).trim();
  }
  
  // Fallback: extract from the heading to the end
  return licenseText.substring(startIndex, endIndex).trim();
}

/**
 * Gets the license template text for a given type
 * Loads the full license text from the public/licenses folder
 */
async function getLicenseTemplate(licenseType: LicenseType): Promise<string> {
  const licenseFiles: Record<LicenseType, string> = {
    'OML-P': '/licenses/OML-P.txt',
    'OML-C': '/licenses/OML-C.txt',
    'OML-S': '/licenses/OML-S.txt',
    'OML-F': '/licenses/OML-F.txt',
  };

  try {
    const response = await fetch(licenseFiles[licenseType]);
    if (!response.ok) {
      throw new Error(`Failed to load license file: ${licenseFiles[licenseType]}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading license template:', error);
    // Fallback template if file loading fails
    return `OPEN MUSIC LICENSE (OML)
${licenseType}

Version 1.0 - Effective October 2025

Error: Could not load full license text. Please contact support.

For the complete license text, visit: https://openmusiclicense.org/licenses/${licenseType.toLowerCase()}`;
  }
}
