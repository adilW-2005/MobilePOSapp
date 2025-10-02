/**
 * Mock Data for MobilePOS Prototype
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Fundraiser {
  id: string;
  name: string;
  funds: Fund[];
}

export interface Fund {
  id: string;
  name: string;
}

export type Frequency = "Daily" | "Weekly" | "Monthly" | "Yearly";

// ============================================================================
// PRESET FUNDRAISERS (each with 4 funds)
// ============================================================================

export const PRESET_FUNDRAISERS: Fundraiser[] = [
  {
    id: "1",
    name: "Support Nueces Reconstruction",
    funds: [
      { id: "1-relief", name: "Emergency Relief" },
      { id: "1-rebuild", name: "Rebuild Homes" },
      { id: "1-food", name: "Food Supplies" },
      { id: "1-medical", name: "Medical Aid" },
    ],
  },
  {
    id: "2",
    name: "General Campaign",
    funds: [
      { id: "2-ops", name: "Masjid Operations" },
      { id: "2-zakat", name: "Zakat" },
      { id: "2-sadaqah", name: "Sadaqah" },
      { id: "2-ramadan", name: "Ramadan" },
    ],
  },
  {
    id: "3",
    name: "Ramadan Operations Fundraiser 2025",
    funds: [
      { id: "3-iftar", name: "Iftar Program" },
      { id: "3-taraweeh", name: "Taraweeh Services" },
      { id: "3-zakat", name: "Zakat Distribution" },
      { id: "3-eid", name: "Eid Celebration" },
    ],
  },
  {
    id: "4",
    name: "2025 Spring Bake Sales",
    funds: [
      { id: "4-youth", name: "Youth Programs" },
      { id: "4-education", name: "Education Fund" },
      { id: "4-community", name: "Community Events" },
      { id: "4-charity", name: "Local Charity" },
    ],
  },
];

// ============================================================================
// PRESET AMOUNTS
// ============================================================================

export const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

// ============================================================================
// FREQUENCY OPTIONS
// ============================================================================

export const FREQUENCY_OPTIONS: Frequency[] = [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
]; 