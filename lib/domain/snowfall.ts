import { Snowflake, type ISnowflakeInitSettings } from "./snowflake";

export interface ICreateSnowflakeInitSettings extends Omit<ISnowflakeInitSettings, 'id' | 'positionX' | 'positionY'> {
  screenWidth: number;
  screenHeight: number
}

export class Snowfall {
  snowflakes: Snowflake[] = [];
  screenWidth: number;
  screenHeight: number;

  constructor(screenWidth: number, screenHeight: number) {
    this.screenHeight = screenHeight
    this.screenWidth = screenWidth
  }

  create(
    snowflakeCount: number, 
    snowflakeInitSettings: ICreateSnowflakeInitSettings
  ) {
    const {screenWidth, screenHeight, wind, size, speed, rotation, opacity, color, appearance} = snowflakeInitSettings;
    
    for (let i = 0; i < snowflakeCount; i++) {
      this.snowflakes.push(
        new Snowflake( {
          id: i,
          positionX: Math.random() * screenWidth,
          positionY: Math.random() * screenHeight * -1,
          wind,
          size: Math.random() * size,
          speed: Math.random() * (speed - 0.5 + 1) + 0.5 ,
          rotation: Math.random() * rotation,
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
      ctx.rotate((flake.rotation * Math.PI) / 180);
      ctx.globalAlpha = flake.opacity;

      switch(flake.appearance) {
        case "Circle":
          flake.renderCircle(ctx)
          break;
        case "Snowflake":
          flake.renderSnowflake(ctx);
          break;
      }

      ctx.restore();
    }
  }
}