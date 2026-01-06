import { AppConfig, NoiseSettings } from './types';

export const DEFAULT_NOISE: NoiseSettings = {
  baseFrequency: 0.65,
  numOctaves: 3,
  opacity: 0.5,
  type: 'fractalNoise',
  blendMode: 'overlay',
};

export const DEFAULT_CONFIG: AppConfig = {
  width: 1920,
  height: 1080,
  backgroundColor: '#0a0a0a',
  blobs: [],
  noise: DEFAULT_NOISE,
  blur: 80,
};

// Curated color palettes for random generation
export const PALETTES = [
  ['#ff9a9e', '#fad0c4', '#ffecd2'],
  ['#a18cd1', '#fbc2eb', '#8fd3f4'],
  ['#84fab0', '#8fd3f4', '#a1c4fd'],
  ['#cfd9df', '#e2ebf0', '#a1c4fd'],
  ['#f093fb', '#f5576c', '#4facfe'],
  ['#43e97b', '#38f9d7', '#00c6fb'],
  ['#fa709a', '#fee140', '#ff0844'],
  ['#667eea', '#764ba2', '#6B8DD6'],
  ['#00c6fb', '#005bea', '#00F260'],
  ['#ff758c', '#ff7eb3', '#22E1FF'],
];