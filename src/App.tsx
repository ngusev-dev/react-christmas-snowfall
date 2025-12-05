import {Snowfall} from '../lib/components/Snowfall';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.page}>
      <Snowfall />
      <button className={styles.button}>Test</button>
    </div>
  )
}

export default App
