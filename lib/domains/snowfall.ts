import { APPEARANCE_TYPE, type ISnowflakeInitSettings } from '../types/snowfall.types';
import { Snowflake } from './snowflake';

export class Snowfall {
  snowflakes: Snowflake[] = [];
  screenWidth!: number;
  screenHeight!: number;

  constructor(screenWidth: number, screenHeight: number) {
    this.updateScreenSize(screenWidth, screenHeight);
  }

  createSnowfall(settings: ISnowflakeInitSettings) {
    const { snowflakeCount } = settings;

    for (let id = 0; id < snowflakeCount; id++) {
      this.snowflakes.push(new Snowflake(settings, this.screenWidth, this.screenHeight));
    }

    return this.snowflakes;
  }

  updateScreenSize(screenWidth: number, screenHeight: number) {
    this.screenHeight = screenHeight;
    this.screenWidth = screenWidth;
  }

  updateSnowflakeSettings(snowflakeSettings: ISnowflakeInitSettings) {
    const targetCount = snowflakeSettings.snowflakeCount;
    const currentCount = this.snowflakes.length;

    if (targetCount > currentCount) {
      for (let i = currentCount; i < targetCount; i++) {
        this.snowflakes.push(new Snowflake(snowflakeSettings, this.screenWidth, this.screenHeight));
      }
    } else if (targetCount < currentCount) {
      this.snowflakes.length = targetCount;
    }

    this.snowflakes.forEach((flake) => {
      flake.updateSettings(snowflakeSettings);
    });
  }

  animateSnowfall(canvasRef: React.RefObject<HTMLCanvasElement | null>, deltaTime: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = this.screenWidth;
    canvas.height = this.screenHeight;

    ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);

    for (let index = 0; index < this.snowflakes.length; index++) {
      const flake = this.snowflakes[index];

      flake.update(this.screenWidth, this.screenHeight, deltaTime);

      ctx.save();
      ctx.translate(flake.positionX, flake.positionY);
      ctx.globalAlpha = flake.opacity;

      switch (flake.appearance) {
        case APPEARANCE_TYPE.CIRCLE:
          flake.renderCircle(ctx);
          break;
        case APPEARANCE_TYPE.SNOWFLAKE:
          flake.renderSnowflake(ctx);
          break;
      }

      ctx.restore();
    }
  }
}
