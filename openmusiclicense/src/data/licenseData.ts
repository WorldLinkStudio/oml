import type { LicenseInfo, LicenseType } from "../types/license";

export const licenseInfo: Record<LicenseType, LicenseInfo> = {
  "OML-P": {
    type: "OML-P",
    name: "OML-P",
    description: "Free for personal projects under $1,000/year revenue",
    price: "Free",
    features: [
      "Use, modify, and distribute freely",
      "Monetize up to $1,000 gross revenue per year",
      "Attribution required",
      "No exclusive rights granted",
    ],
    icon: "🆓",
  },
  "OML-C": {
    type: "OML-C",
    name: "OML-C",
    description: "Paid licensing for professional/commercial use",
    price: "Negotiated",
    features: [
      "Unlimited commercial usage rights",
      "Fair royalty structures",
      "Quarterly reporting and payment terms",
      "Enhanced attribution requirements",
      "Sublicensing provisions",
    ],
    icon: "💼",
  },
  "OML-S": {
    type: "OML-S",
    name: "OML-S",
    description: "Special licensing for film, TV, video, and synchronization",
    price: "Negotiated",
    features: [
      "Master use and synchronization rights",
      "Project-specific licensing terms",
      "Professional delivery requirements",
      "Detailed territory and media specifications",
      "Flat fee payment structure",
    ],
    icon: "🎬",
  },
  "OML-F": {
    type: "OML-F",
    name: "OML-F",
    description: "Complete ownership transfer with unlimited commercial rights",
    price: "Negotiated",
    features: [
      "Complete ownership transfer",
      "Unlimited commercial rights",
      "No attribution required",
      "No revenue limits",
      "Full exclusive rights",
    ],
    icon: "⭐",
  },
};

export const distributionChannels = [
  "Spotify",
  "Apple Music",
  "YouTube",
  "SoundCloud",
  "Bandcamp",
  "Tidal",
  "Amazon Music",
  "Pandora",
  "Deezer",
  "iTunes",
  "Other",
];

export const revenueRanges = [
  { value: "$0", label: "$0 (Free/Non-commercial)" },
  { value: "<1k", label: "Less than $1,000/year" },
  { value: "1k-10k", label: "$1,000 - $10,000/year" },
  { value: "10k-50k", label: "$10,000 - $50,000/year" },
  { value: "50k+", label: "$50,000+/year" },
  { value: "unlimited", label: "Unlimited (no limit)" },
];

export const assetTypes = [
  "Beat",
  "Loop",
  "Sample Pack",
  "Stem",
  "MIDI",
  "Template",
  "Full Track",
  "Other",
];
