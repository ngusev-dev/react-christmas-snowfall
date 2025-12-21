import type { APPEARANCE_TYPE } from './snowfall.types';

export interface ISnowflakeSettings {
  wind: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  appearance: keyof typeof APPEARANCE_TYPE;
}
