export type LicenseType = 'OML-P' | 'OML-C' | 'OML-S' | 'OML-F';

export type UserType = 
  | 'producer'
  | 'beatmaker'
  | 'musician'
  | 'songwriter'
  | 'content-creator'
  | 'podcaster'
  | 'video-creator'
  | 'game-developer'
  | 'film-producer'
  | 'advertising-agency'
  | 'streamer'
  | 'sample-pack-creator'
  | 'record-label'
  | 'music-publisher'
  | 'artist-manager'
  | 'hobbyist';

export type PaymentOption = 'percentage' | 'flat-fee' | 'hybrid' | '';
export type PaymentMethod = 'bank-transfer' | 'paypal' | 'check' | 'other' | '';

export interface ExecutionAgreementData {
  // Parties
  licenseeInfo?: string;
  
  // Payment Structure (for OML-C)
  paymentOption?: PaymentOption;
  royaltyRate?: string;
  flatFeeAmount?: string;
  hybridUpfront?: string;
  hybridRoyalty?: string;
  term?: string;
  termYears?: string;
  scope?: string;
  
  // Sync License Payment (for OML-S)
  licenseFee?: string;
  paymentSchedule?: 'full' | '50-50' | 'custom' | '';
  paymentScheduleCustom?: string;
  rushFee?: string;
  
  // Payment Details
  paymentMethod?: PaymentMethod;
  paymentDetails?: string;
  paymentName?: string;
  paymentAddress?: string;
  paymentPhone?: string;
  taxId?: string;
  
  // Scope of Use
  intendedUse?: string;
  territory?: string;
  territoryCustom?: string;
  media?: string;
  mediaCustom?: string;
  specialTerms?: string;
  
  // Sync-specific fields
  projectType?: string;
  productionCompany?: string;
}

export interface LicenseFormData {
  userType: UserType | '';
  useCase: string;
  projectName: string;
  releaseDate: string;
  revenueRange: string;
  creatorName: string;
  creditFormat: string;
  contactEmail: string;
  assetType: string;
  assetTitle: string;
  bpm?: string;
  key?: string;
  additionalNotes?: string;
  preselectedLicenseType?: LicenseType | '';
  executionAgreement?: ExecutionAgreementData;
}

export interface GeneratedLicense {
  type: LicenseType;
  fullText: string;
  attribution: string;
  metadata: LicenseFormData;
  generatedDate: string;
  executionAgreement?: string;
}

export interface LicenseInfo {
  type: LicenseType;
  name: string;
  description: string;
  price: string;
  features: string[];
  icon: string;
}

