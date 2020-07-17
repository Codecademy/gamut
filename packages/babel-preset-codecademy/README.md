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

## Publishing this package

This package is automatically published by GitHub Actions when the version number changes

* merge your PR into `main`
* create a new PR that updates the version of the package in package.json. Base the version bump on all of the changes that will be added in this version.
* merge the version PR into `main`
* check the [actions](https://github.com/Codecademy/babel-preset-codecademy/actions) to see when the package is published
