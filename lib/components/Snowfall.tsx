import { useCallback, useEffect, useRef } from 'react';
import styles from './snowfall.module.css';
import { Snowflake } from '../domain/snowflake';
import { Snowfall } from '../domain/snowfall';

export function ChristmasSnowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const rafRef = useRef<number>(0);

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
     200, 
      {
        screenWidth,
        screenHeight,
        wind: 3,
        size: 3,
        speed: 3,
        rotation: 1,
        opacity: 1,
        color: "#ffffff",
        appearance: 'Snowflake'
      });

    const animate = () => {
      snowfall.animateSnowfall(canvasRef, snowflakesRef); 
      rafRef.current = requestAnimationFrame(animate);
    };
     
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [getWindowSize])

  return (
    <div className={styles.wrapper} id='christmas-snowfall'>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  )
}
