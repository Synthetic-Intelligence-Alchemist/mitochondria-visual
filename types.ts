export enum LocationType {
  ETC = 'Electron Transport Chain',
  MATRIX = 'Mitochondrial Matrix',
  INNER_MEMBRANE = 'Inner Membrane Structure',
  BIOGENESIS = 'Biogenesis & Signaling',
  INTERMEMBRANE = 'Intermembrane Space',
  SYSTEMIC = 'Systemic / Global',
}

export type TreatmentCategory = 'Intervention' | 'Pathology';

export interface Treatment {
  id: string;
  name: string;
  category: TreatmentCategory;
  location: LocationType;
  specificSite: string;
  indications: string; // e.g., "Type 2 Diabetes, Longevity"
  mechanism: string;
  effect: string;
  clinicalStatus: string; // e.g., "FDA Approved", "Supplement", "Clinical Trials"
  protocol: string; // e.g., Dosing
  safetyProfile: string; // e.g., Side effects
  coordinates?: { x: number; y: number }; // For focusing the camera/SVG
}

export interface ZoneProps {
  isActive: boolean;
  onClick: () => void;
}