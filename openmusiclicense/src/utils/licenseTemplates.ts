import type {
  LicenseType,
  LicenseFormData,
  GeneratedLicense,
} from "../types/license";
import { recommendLicense } from "./licenseLogic";
import { formatDate, formatAttribution } from "./formatters";

/**
 * Generates a complete license file from form data
 */
export async function generateLicense(
  formData: LicenseFormData
): Promise<GeneratedLicense> {
  const licenseType = recommendLicense(formData);
  const licenseText = await generateLicenseText(licenseType, formData);
  const attribution = formatAttribution(licenseType, formData);

  return {
    type: licenseType,
    fullText: licenseText,
    attribution,
    metadata: formData,
    generatedDate: new Date().toISOString(),
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

  const creatorName = formData.creatorName || "[Creator Name]";
  const contactEmail = formData.contactEmail || "[Creator Email]";
  const assetTitle = formData.assetTitle || "[Work Title]";
  const projectName = formData.projectName || "[Project Name]";
  const releaseDate = formData.releaseDate || "[Release Date]";
  const currentDate = formatDate(new Date());
  const currentYear = new Date().getFullYear().toString();

  // Website/URL handling - use email domain if available, otherwise placeholder
  const website =
    contactEmail && contactEmail !== "[Creator Email]"
      ? `https://${contactEmail.split("@")[1]}`
      : "[Creator Website]";

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
    .replace(/\[Creator's Jurisdiction\]/g, "[Creator's Jurisdiction]");

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
    `For questions about this license (${licenseType})${
      licenseType === "OML-P"
        ? " or to obtain a Commercial License (OML-C)"
        : ""
    }:`
  );

  return licenseText;
}

/**
 * Gets the license template text for a given type
 * Loads the full license text from the public/licenses folder
 */
async function getLicenseTemplate(licenseType: LicenseType): Promise<string> {
  const licenseFiles: Record<LicenseType, string> = {
    "OML-P": "/licenses/OML-P.txt",
    "OML-C": "/licenses/OML-C.txt",
    "OML-S": "/licenses/OML-S.txt",
    "OML-F": "/licenses/OML-F.txt",
  };

  try {
    const response = await fetch(licenseFiles[licenseType]);
    if (!response.ok) {
      throw new Error(
        `Failed to load license file: ${licenseFiles[licenseType]}`
      );
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading license template:", error);
    // Fallback template if file loading fails
    return `OPEN MUSIC LICENSE (OML)
${licenseType}

Version 1.0 - Effective October 2025

Error: Could not load full license text. Please contact support.

For the complete license text, visit: https://openmusiclicense.org/licenses/${licenseType.toLowerCase()}`;
  }
}
