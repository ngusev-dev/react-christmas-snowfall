import { useState } from 'react';
import { ChristmasSnowfall } from '../lib/components/Snowfall';
import styles from './App.module.css';

import { Slider } from '@base-ui-components/react/slider';
import { Switch } from '@base-ui-components/react';
import { APPEARANCE_TYPE } from '../lib/types/snowfall.types';

function App() {
  const [snowflakeCount, setSnowflakeCount] = useState(100)
  const [appearanceType, setAppearanceType] = useState<keyof typeof APPEARANCE_TYPE>(APPEARANCE_TYPE.CIRCLE)
  return (
    <div className={styles.page}>
      <ChristmasSnowfall snowflakeCount={snowflakeCount} appearance={appearanceType}/>

      <div className={styles.modal}>
        <Slider.Root defaultValue={snowflakeCount} min={0} max={500} onValueChange={(value) => setSnowflakeCount(value)}>
          <Slider.Value />
          <Slider.Control className={styles.Control}>
            <Slider.Track className={styles.Track}>
              <Slider.Indicator className={styles.Indicator} />
              <Slider.Thumb className={styles.Thumb} />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>


      <div className={styles.SwitchStyle}>
        <p style={{
          opacity: appearanceType === APPEARANCE_TYPE.CIRCLE ? 1 : 0.4
        }}>Circle</p>
        <Switch.Root 
          checked={appearanceType === APPEARANCE_TYPE.SNOWFLAKE} 
          className={styles.Switch} 
          onCheckedChange={(checked) => checked ? setAppearanceType(APPEARANCE_TYPE.SNOWFLAKE) : setAppearanceType(APPEARANCE_TYPE.CIRCLE)}
        >
          <Switch.Thumb className={styles.SwitchThumb} />
        </Switch.Root>
        <p style={{
          opacity: appearanceType === APPEARANCE_TYPE.SNOWFLAKE ? 1 : 0.4
        }}>Snowflake</p>
      </div>

      </div>
      
    </div>
  )
}

export default App
