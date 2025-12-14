# React-Christmas-Snowfall 🎅


This plugin adds Christmas snowfall effects to any website.
 [Live Demo](https://ngusev-dev.github.io/react-christmas-snowfall/)

### 👨‍💻 Installation

```npm
npm i react-christmas-snowfall 
```

Next, add `ChristmasSnowfall` component to your page and include `react-christmas-snowfall.css`

```js
import { ChristmasSnowfall } from 'react-christmas-snowfall'
import 'react-christmas-snowfall/dist/assets/react-christmas-snowfall.css'

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
### 💻 React-Christmas-Snowfall Props

For more flexible configuration, you can use the following props:

| Props | Required | Description |
|-----------|----------|-------------|
| `snowflakeCount` | ❌ | Number of snowflakes on the screen | 
| `wind` | ❌ | Wind direction | 
| `size` | ❌ | Snowflake size |
| `speed` | ❌ | The speed of snowflakes falling | 
| `color` | ❌ | The color of snowflakes | 
| `appearance` | ❌ | Type of snowflake. `CIRCLE` or `SNOWFLAKE` | 
