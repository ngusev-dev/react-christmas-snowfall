import { useCallback, useEffect, useRef } from 'react';
import styles from './snowfall.module.css';
import { Snowflake } from '../domains/snowflake';
import { Snowfall } from '../domains/snowfall';
import { APPEARANCE_TYPE, type IChristmasSnowfallProps } from '../types/snowfall.types';

export function ChristmasSnowfall(
    {
      snowflakeCount = 100,
      wind = 0,
      size = 30,
      speed = 4,
      rotation = 1,
      opacity = 1,
      color = "#ffffff",
      appearance = APPEARANCE_TYPE.CIRCLE
    }: IChristmasSnowfallProps
  ) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const rafRef = useRef<number>(0);

  // eslint-disable-next-line react-hooks/purity
  const previousTimeRef = useRef<number>(Date.now());

  const getWindowSize = useCallback(() => ({
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
  }), []);

  useEffect(() => {
    const {screenWidth, screenHeight} = getWindowSize();

    const snowfall = new Snowfall(
      screenWidth, 
      screenHeight
    );

    snowflakesRef.current = snowfall.create(
      {
        snowflakeCount,
        screenWidth,
        screenHeight,
        wind,
        size,
        speed,
        rotation,
        opacity,
        color,
        appearance
      });

    const animate = () => {
      const deltaTime = Date.now() - previousTimeRef.current;
      previousTimeRef.current = Date.now();

      snowfall.animateSnowfall(canvasRef, snowflakesRef, deltaTime); 
      rafRef.current = requestAnimationFrame(animate);
    };
     
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [appearance, color, getWindowSize, opacity, rotation, size, snowflakeCount, speed, wind])

  return (
    <div className={styles.wrapper} id='christmas-snowfall'>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  )
}
