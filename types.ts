export interface BlobLayer {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  radius: number; // Percentage
  color: string;
  opacity: number;
}

export interface NoiseSettings {
  baseFrequency: number;
  numOctaves: number;
  opacity: number;
  type: 'fractalNoise' | 'turbulence';
  blendMode: 'overlay' | 'multiply' | 'screen' | 'soft-light';
}

export interface AppConfig {
  width: number;
  height: number;
  backgroundColor: string;
  blobs: BlobLayer[];
  noise: NoiseSettings;
  blur: number;
}

export type ExportFormat = 'png' | 'svg';