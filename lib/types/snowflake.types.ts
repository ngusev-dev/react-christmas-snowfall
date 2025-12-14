import type { APPEARANCE_TYPE } from "./snowfall.types";

export interface ISnowflakeInitSettings {
  id: number,
  positionX: number,
  positionY: number,
  wind: number,
  size: number, 
  speed: number, 
  opacity: number,
  color: string, 
  appearance: keyof typeof APPEARANCE_TYPE
}