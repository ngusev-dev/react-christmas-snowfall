# React-Christmas-Snowfall 🎅

This plugin adds Christmas snowfall effects to any website.

### 👨‍💻 Installation

```npm
npm i react-christmas-snowfall 
```

Next, add `ChristmasSnowfall` component to your page and include `react-christmas-snowfall.css`

```js
import { ChristmasSnowfall } from '@react-christmas-snowfall'
import '@react-christmas-snowfall/assets/react-christmas-snowfall.css'

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.page}>
      <ChristmasSnowfall />
    </div>
  )
}

export default App
```