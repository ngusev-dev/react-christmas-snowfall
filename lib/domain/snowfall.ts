import { Snowflake, type ISnowflakeInitSettings } from "./snowflake";

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
    snowflakeInitSettings: Omit<ISnowflakeInitSettings, 'id'>
  ) {
    const {positionX, positionY, wind, size, speed, rotation, opacity, color, appearance} = snowflakeInitSettings;
    
    for (let i = 0; i < snowflakeCount; i++) {
      this.snowflakes.push(
        new Snowflake( {
          id: i,
          positionX: Math.random() * positionX,
          positionY: Math.random() * -positionY,
          wind: Math.random() * wind,
          size: Math.random() * size,
          speed: Math.random() * speed,
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
    snowflakesRef: React.RefObject<Snowflake[]>
  ) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = this.screenWidth;
    canvas.height = this.screenHeight;

    ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);

    snowflakesRef.current = snowflakesRef.current.filter((flake) => {
      flake.positionY += flake.speed + (0.08 + (Math.random() - 0.5) * 0.1) * 0.98;
      
      flake.positionX += ((Math.random() - 0.5) * 0.15 + flake.wind * 0.02) * 0.96 + 
        Math.cos(flake.positionY * 0.008 + flake.id) * 0.2;

      if (flake.positionY > this.screenHeight) {
        flake.positionY = -flake.size * 2;
        flake.positionX = Math.random() * this.screenWidth;
        flake.wind = (Math.random() - 0.5) * 2; 
      }

      flake.rotation += (Math.random() - 0.1)

      ctx.save();
      ctx.translate(flake.positionX, flake.positionY);
      ctx.rotate((flake.rotation * Math.PI) / 180);
      ctx.globalAlpha = flake.opacity;

      if(flake.appearance === 'Circle') {
        ctx.beginPath();
        ctx.fillStyle = flake.color;
        ctx.arc(0, 0, flake.size, 0, Math.PI * 2);
        ctx.fill();
      } else if(flake.appearance === 'Snowflake') {
        ctx.font = `${flake.size}rem serif`;  
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = flake.color;
        ctx.fillText('❄', 0, 0);
      }

      ctx.restore();
      return true;
    });
  }
}