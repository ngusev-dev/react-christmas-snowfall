import type { ISnowflakeSettings } from './snowflake.types';

export interface ISnowflakeInitSettings extends Omit<ISnowflakeSettings, 'id' | 'positionX' | 'positionY'> {
  snowflakeCount: number;
}

export type IChristmasSnowfallProps = Partial<Omit<ISnowflakeInitSettings, 'screenWidth' | 'screenHeight'>>;

export const APPEARANCE_TYPE = {
  CIRCLE: 'CIRCLE',
  SNOWFLAKE: 'SNOWFLAKE',
} as const;
