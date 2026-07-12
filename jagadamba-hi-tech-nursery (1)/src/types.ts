/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CropType = 'sugarcane' | 'vegetable';

export type BookingStatus = 'pending' | 'confirmed' | 'ready_for_delivery' | 'delivered' | 'cancelled';

export interface SugarcaneVariety {
  id: string;
  name: string; // e.g. Co. 86032
  marathiName: string;
  description: string;
  features: string[];
  duration: string;
  yieldPotential: string;
}

export interface VegetableVariety {
  id: string;
  name: string;
  marathiName: string;
  scientificName?: string;
  description: string;
  pricePerTray: number; // e.g., 200 Rs per 100 seedlings tray
  seedlingsPerTray: number; // e.g. 104 cells
  features: string[];
  image: string;
}

export interface Booking {
  id: string;
  farmerName: string;
  contactNumber: string;
  village: string;
  cropType: CropType;
  sugarcaneVariety?: string; // e.g. Co. 86032
  vegetableVariety?: string; // e.g. Brinjal, Chili
  quantity: number; // number of trays
  totalSeedlings: number; // quantity * seedlingsPerTray
  plantationDate: string;
  transportRequired: boolean;
  status: BookingStatus;
  bookingDate: string;
  notes?: string;
}

export interface FertilizerEntry {
  id: string;
  daysRange: string; // e.g. "0 - 15 Days"
  stage: string; // e.g. "Primary Stage / मूळ फुटणे"
  fertilizers: {
    name: string;
    dosage: string; // e.g. "10 Kg"
    unit: string; // e.g. "per acre"
  }[];
  applicationMethod: string;
  purpose: string;
}

export interface GrowingStage {
  id: string;
  stageName: string;
  marathiStageName: string;
  duration: string;
  description: string;
  marathiDescription: string;
  keyPractices: string[];
}
