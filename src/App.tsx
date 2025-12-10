import { ChristmasSnowfall } from '../lib/components/Snowfall';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.page}>
      <ChristmasSnowfall appearance='CIRCLE' />
    </div>
  )
}

export default App
