import type { ISnowflakeSettings } from '../types/snowflake.types';
import type { APPEARANCE_TYPE } from '../types/snowfall.types';

export class Snowflake {
  positionX!: number;
  positionY!: number;
  size!: number;
  color: string = '#fff';
  opacity!: number;
  speed!: number;
  wind!: number;
  appearance!: keyof typeof APPEARANCE_TYPE;

  private baseSize!: number;
  private baseSpeed!: number;
  private baseOpacity!: number;
  private baseColor!: string;
  private baseAppearance!: keyof typeof APPEARANCE_TYPE;
  private baseWind!: number;

  private readonly swingOffset = Math.random() * Math.PI * 2;
  private readonly swingX = Math.sin(this.swingOffset);
  private readonly maxDelta = 1000 / 30;
  private readonly fpsMsDelta = 1000 / 60;

  constructor(init: ISnowflakeSettings, initPositionX: number, initPositionY: number) {
    this.positionX = Math.random() * initPositionX;
    this.positionY = Math.random() * initPositionY * -1;

    this.baseWind = init.wind;
    this.baseSize = init.size;
    this.baseColor = init.color;
    this.baseOpacity = init.opacity;
    this.baseSpeed = init.speed;
    this.baseAppearance = init.appearance;

    this.wind = init.wind;
    this.size = Math.random() * init.size;
    this.color = init.color;
    this.opacity = Math.random() * init.opacity;
    this.speed = Math.random() * (init.speed - 0.5 + 1) + 0.5;
    this.appearance = init.appearance;
  }

  updateSettings(newSettings: ISnowflakeSettings) {
    const { wind, size, color, opacity, speed, appearance } = newSettings;

    if (this.baseWind != wind) {
      this.wind = wind;
      this.baseWind = wind;
    }

    if (size != this.baseSize) {
      this.size = Math.random() * this.baseSize;
      this.baseSize = size;
    }

    if (this.baseColor != color) {
      this.color = color;
      this.baseColor = color;
    }

    if (this.baseOpacity != opacity) {
      this.opacity = Math.random() * this.baseOpacity;
      this.baseOpacity = opacity;
    }

    if (this.speed != this.baseSpeed) {
      this.speed = Math.random() * (this.baseSpeed - 0.5 + 1) + 0.5;
      this.baseSpeed = speed;
    }

    if (this.baseAppearance != appearance) {
      this.appearance = appearance;
      this.baseAppearance = appearance;
    }
  }

  update(screenWidth: number, screenHeight: number, deltaTime: number) {
    const speedFactor = deltaTime / this.fpsMsDelta;
    const clampedSpeedFactor = Math.min(speedFactor, this.maxDelta / this.fpsMsDelta);

    this.positionY += this.speed * clampedSpeedFactor;
    this.positionX += (this.wind + this.swingX) * clampedSpeedFactor;

    if (
      this.positionY > screenHeight + this.size ||
      (this.positionX > screenWidth + this.size && this.wind > 0) ||
      (this.positionX < 0 + this.size && this.wind < 0)
    ) {
      this.positionY = Math.random() * -this.size * 2;
      if (this.wind > 0) {
        this.positionX = Math.floor(Math.random() * (screenWidth + screenWidth + 1)) - screenWidth;
      } else if (this.wind < 0) {
        this.positionX = Math.floor(Math.random() * (screenWidth * 2 + 1));
      } else {
        this.positionX = Math.random() * screenWidth;
      }
    }
  }

  renderCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(0, 0, this.size / 6, 0, Math.PI * 2);
    ctx.fill();
  }

  renderSnowflake(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.size / 16}rem serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.color;
    ctx.fillText('❄', 0, 0);
  }
}
