import { useCallback, useEffect, useRef } from 'react';
import styles from './snowfall.module.css';
import { Snowflake } from '../domain/snowflake';

export function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  
  const getWindowSize = useCallback(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }), []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = getWindowSize();
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    function drawSnowflake(ctx: CanvasRenderingContext2D, size: number) {
      const arms = 5;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = size * 0.1;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      for (let i = 0; i < arms; i++) {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, size);
        ctx.stroke();

        ctx.moveTo(0, size * 0.5);
        ctx.lineTo(size * 0.2, size * 0.7);
        ctx.moveTo(0, size * 0.5);
        ctx.lineTo(-size * 0.2, size * 0.7);

        ctx.rotate((Math.PI * 2) / arms);
      }
      ctx.closePath();
    }

    snowflakesRef.current = snowflakesRef.current.filter((flake) => {
      flake.positionY += flake.speed + (0.08 + (Math.random() - 0.5) * 0.1) * 0.98;
      
      flake.positionX += ((Math.random() - 0.5) * 0.15 + flake.wind * 0.02) * 0.96 + 
        Math.cos(flake.positionY * 0.008 + flake.id) * 0.2;

      if (flake.positionY > height) {
        flake.positionY = -flake.size * 2;
        flake.positionX = Math.random() * width;
        flake.wind = (Math.random() - 0.5) * 2; 
      }

      flake.rotation += (Math.random() - 0.1)

      ctx.save();
      ctx.translate(flake.positionX, flake.positionY);
      ctx.rotate((flake.rotation * Math.PI) / 180);
      ctx.globalAlpha = flake.opacity;
      
      // drawSnowflake(ctx, flake.size);

      ctx.beginPath();
      ctx.fillStyle = flake.color;
      ctx.arc(0, 0, flake.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
      return true;
    });

    requestAnimationFrame(animate);
  }, [getWindowSize]);

  const createSnowflakes = useCallback((count: number, width: number, height: number) => {
    const snowflakes: Snowflake[] = [];
    for (let i = 0; i < count; i++) {
      snowflakes.push(
        new Snowflake(
          i,
          Math.random() * width,
          Math.random() * -height,
          Math.random() * 1,
          Math.random() * 3,
          Math.random() * 0.5,
          Math.random() * 0.5,
          Math.random()
        ) 
      );
    }
    
    return snowflakes;
  }, []);

  useEffect(() => {
    const {width, height} = getWindowSize();

    snowflakesRef.current = createSnowflakes(
      Math.floor(width * 0.1), 
      width,
      height
    );

    requestAnimationFrame(animate);
  }, [snowflakesRef, getWindowSize, createSnowflakes, animate])

  return (
    <div className={styles.wrapper}>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  )
}
