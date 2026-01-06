import { BlobLayer } from '../types';
import { PALETTES } from '../constants';

export const generateRandomId = () => Math.random().toString(36).substr(2, 9);

export const getRandomInt = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomFloat = (min: number, max: number) => 
  Math.random() * (max - min) + min;

export const getRandomItem = <T>(arr: T[]): T => 
  arr[Math.floor(Math.random() * arr.length)];

export const generateRandomBlobs = (count: number = 6): { blobs: BlobLayer[], bg: string } => {
  const palette = getRandomItem(PALETTES);
  const bg = '#050505'; // Keep BG dark for contrast usually, or pick from palette
  
  const blobs: BlobLayer[] = Array.from({ length: count }).map(() => ({
    id: generateRandomId(),
    x: getRandomInt(-20, 120),
    y: getRandomInt(-20, 120),
    radius: getRandomInt(25, 60),
    color: getRandomItem(palette),
    opacity: getRandomFloat(0.4, 0.8),
  }));

  return { blobs, bg };
};
