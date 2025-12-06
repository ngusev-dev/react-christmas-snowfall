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
}