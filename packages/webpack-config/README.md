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
    entry: 'app.js', // defaults to src/main.js
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

## Using Babel

By default, `webpack-config` doesn't set any babel options, these should be configured in your local `babel.config.js` file:

Example:

```js
// babel.config.js
module.exports = {
  presets: ['codecademy'],
  plugins: ['lodash', 'react-loadable/babel'],
  ignore: ['./node_modules/@codecademy/**/node_modules'],
  only: ['./webpack', './node_modules/@codecademy'],
  env: {
    development: {
      plugins: ['react-hot-loader/babel'],
    },
  },
};
```
