# babel-preset-codecademy

> A collection of babel plugins and presets used at codecademy

## Install

```sh
$ npm install --save-dev babel-preset-codecademy
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["codecademy"]
}
```

### Via CLI

```sh
$ babel script.js --presets codecademy
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  presets: ['codecademy']
});
```
