import { APPEARANCE_TYPE, type ICreateSnowflakeInitSettings } from "../types/snowfall.types";
import { Snowflake } from "./snowflake";

export class Snowfall {
  snowflakes: Snowflake[] = [];
  screenWidth: number;
  screenHeight: number;

  constructor(screenWidth: number, screenHeight: number) {
    this.screenHeight = screenHeight
    this.screenWidth = screenWidth
  }

  create(
    snowflakeInitSettings: ICreateSnowflakeInitSettings
  ) {
    const {screenWidth, screenHeight, wind, size, speed, opacity, color, appearance, snowflakeCount} = snowflakeInitSettings;
    
    for (let i = 0; i < snowflakeCount; i++) {
      this.snowflakes.push(
        new Snowflake( {
          id: i,
          positionX: Math.random() * screenWidth,
          positionY: Math.random() * screenHeight * -1,
          wind,
          size: Math.random() * size,
          speed: Math.random() * (speed - 0.5 + 1) + 0.5 ,
          opacity: Math.random() * opacity,
          color,
          appearance
         }) 
      );
    }

    return this.snowflakes;
  }

  animateSnowfall(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    snowflakesRef: React.RefObject<Snowflake[]>,
    deltaTime: number
  ) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = this.screenWidth;
    canvas.height = this.screenHeight;

    ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);

    for(let index = 0; index < snowflakesRef.current.length; index++) {
      const flake = snowflakesRef.current[index];
      flake.update(this.screenWidth, this.screenHeight, deltaTime);

      ctx.save();
      ctx.translate(flake.positionX, flake.positionY);
      ctx.globalAlpha = flake.opacity;

      switch(flake.appearance) {
        case APPEARANCE_TYPE.CIRCLE:
          flake.renderCircle(ctx)
          break;
        case APPEARANCE_TYPE.SNOWFLAKE:
          flake.renderSnowflake(ctx);
          break;
      }

      ctx.restore();
    }
  }
}