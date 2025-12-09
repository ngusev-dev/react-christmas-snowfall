import { useCallback, useEffect, useRef } from 'react';
import styles from './snowfall.module.css';
import { Snowflake } from '../domain/snowflake';
import { Snowfall } from '../domain/snowfall';

export function ChristmasSnowfall() {
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
     200, 
      {
        screenWidth,
        screenHeight,
        wind: 2,
        size: 2,
        speed: 2,
        rotation: 1,
        opacity: 1,
        color: "#ffffff",
        appearance: 'Snowflake'
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
  }, [getWindowSize])

  return (
    <div className={styles.wrapper} id='christmas-snowfall'>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  )
}
