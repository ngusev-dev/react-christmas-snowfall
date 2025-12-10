import type { ISnowflakeInitSettings } from "./snowflake.types";

export interface ICreateSnowflakeInitSettings extends Omit<ISnowflakeInitSettings, 'id' | 'positionX' | 'positionY'> {
  screenWidth: number;
  screenHeight: number;
  snowflakeCount: number;
}

export type IChristmasSnowfallProps = Partial<Omit<ICreateSnowflakeInitSettings, "screenWidth" | "screenHeight">>

export const APPEARANCE_TYPE = {
  CIRCLE: 'CIRCLE',
  SNOWFLAKE: 'SNOWFLAKE'
} as const;