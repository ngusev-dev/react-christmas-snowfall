export interface ISnowflakeInitSettings {
  id: number,
  positionX: number,
  positionY: number,
  wind: number,
  size: number, 
  speed: number, 
  rotation: number,
  opacity: number,
  color: string, 
  appearance: "Circle" | "Snowflake"
}

export class Snowflake {
  id: number;
  positionX: number;
  positionY: number;
  size: number;
  color: string = "#fff";
  opacity: number;
  speed: number;
  rotation: number;
  wind: number;
  appearance: "Circle" | "Snowflake" = 'Circle'

  private readonly swingOffset = Math.random() * Math.PI * 2;
  private readonly swingX = Math.sin(this.swingOffset);
  private readonly maxDelta =  1000 / 30;
  private readonly fpsMsDelta = 1000 / 60;

  constructor(
    init: ISnowflakeInitSettings
  ) {
    const {id, positionX, positionY, wind, size, color, opacity, speed, rotation, appearance} = init;

    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.wind = wind;
    
    this.size = size;
    this.color = color;
    this.opacity = opacity;
    this.speed = speed;
    this.rotation = rotation;
    this.appearance = appearance
  }

  update(screenWidth: number, screenHeight: number, deltaTime: number) {
    const speedFactor = deltaTime / this.fpsMsDelta;
    const clampedSpeedFactor = Math.min(speedFactor, this.maxDelta / this.fpsMsDelta);

    this.positionY += this.speed * clampedSpeedFactor;
    this.positionX += (this.wind + this.swingX) * clampedSpeedFactor

    if (
      this.positionY > screenHeight + this.size || 
      (this.positionX > screenWidth + this.size && this.wind > 0) ||
      (this.positionX < 0 + this.size && this.wind < 0)
    ) {  
      this.positionY = Math.random() * -this.size * 2; 
      if (this.wind > 0) {
        this.positionX = Math.floor(Math.random() * (screenWidth + screenWidth + 1)) - screenWidth
      } else if (this.wind < 0) {
        this.positionX = Math.floor(Math.random() * (screenWidth * 2 + 1))
      } else {
        this.positionX = Math.random() * screenWidth;
      }
    }
  }

  renderCircle(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
  }

  renderSnowflake(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.size}rem serif`;  
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.color;
    ctx.fillText('❄', 0, 0);
  }
}