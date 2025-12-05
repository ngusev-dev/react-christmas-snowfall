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

  constructor(
    id: number,
    positionX: number,
    positionY: number,
    wind: number,
    size: number = 20, 
    speed: number = 0.01, 
    rotation: number = 1,
    opacity: number = 1,
    color: string = "#fff", 
  ) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.wind = wind;
    
    this.size = size;
    this.color = color;
    this.opacity = opacity;
    this.speed = speed;
    this.rotation = rotation;
  }
}