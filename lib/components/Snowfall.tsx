import { useEffect, useRef } from 'react';
import styles from './snowfall.module.css';
import { Snowfall } from '../domains/snowfall';
import { APPEARANCE_TYPE, type IChristmasSnowfallProps } from '../types/snowfall.types';

export function ChristmasSnowfall({
  snowflakeCount = 100,
  wind = 0,
  size = 30,
  speed = 4,
  opacity = 1,
  color = '#ffffff',
  appearance = APPEARANCE_TYPE.CIRCLE,
}: IChristmasSnowfallProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rafRef = useRef<number>(0);

  const previousTimeRef = useRef<number>(Date.now());
  const snowfallInstance = useRef<Snowfall | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getWindowSize = () => ({
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const { screenWidth, screenHeight } = getWindowSize();

    snowfallInstance.current = new Snowfall(screenWidth, screenHeight);

    snowfallInstance.current.createSnowfall({
      snowflakeCount,
      wind,
      size,
      speed,
      opacity,
      color,
      appearance,
    });

    const animate = (currentTime: number) => {
      if (!snowfallInstance.current) return;

      const deltaTime = currentTime - previousTimeRef.current;
      previousTimeRef.current = currentTime;

      snowfallInstance.current.animateSnowfall(canvasRef, deltaTime);
      rafRef.current = requestAnimationFrame(animate);
    };

    previousTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    snowfallInstance.current?.updateSnowflakeSettings({
      snowflakeCount,
      wind,
      size,
      speed,
      opacity,
      color,
      appearance,
    });
  }, [appearance, color, opacity, size, snowflakeCount, speed, wind]);

  return (
    <div className={styles.wrapper} id="christmas-snowfall">
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
}
