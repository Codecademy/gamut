# webpack-config

Shared webpack configurator

### Basic config


```js
// webpack.config.js

import { createConfig } from '@codecademy/webpack-config';

module.exports = createConfig()
  .common({
    context: __dirname // required
  })
  .merge({
    entry: 'app.js' // defaults to main.js
    output: {
      filename: 'app.js', // defaults to main.js
      path: path.resolve(__dirname, 'public') // defaults to /dist
    }
  })
  .toConfig();
```

### Dev server config


```js
// webpack.config.js

import { createConfig } from '@codecademy/webpack-config';

module.exports = createConfig()
  .common({
    context: __dirname // required
  })
  .merge({
    entry: 'app.js' // defaults to main.js
    output: {
      filename: 'app.js', // defaults to main.js
      path: path.resolve(__dirname, 'public') // defaults to /dist
    }
  })
  .dev()
  .devServer({
    port: 4000, // defaults to 3808
    publicPath: `http://localhost:4000/assets/`
  })
  .toConfig();
```
