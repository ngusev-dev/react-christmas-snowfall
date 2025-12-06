import { useCallback, useEffect, useRef } from 'react';
import styles from './snowfall.module.css';
import { Snowflake } from '../domain/snowflake';
import { Snowfall } from '../domain/snowfall';

const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

const snowfall = new Snowfall(
  screenWidth, 
  screenHeight
);

export function ChristmasSnowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  
  const getWindowSize = useCallback(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }), []);

  useEffect(() => {
    const {width, height} = getWindowSize();

    snowflakesRef.current = snowfall.create(
     60, 
      {
        positionX: width,
        positionY: height,
        wind: 0,
        size: 2,
        speed: 0.65,
        rotation: 1,
        opacity: 1,
        color: "#4899f5",
        appearance: 'Snowflake'
      });
     
    requestAnimationFrame(() => snowfall.animateSnowfall(canvasRef, snowflakesRef));
  }, [snowflakesRef, getWindowSize])

  return (
    <div className={styles.wrapper} id='christmas-snowfall'>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  )
}
