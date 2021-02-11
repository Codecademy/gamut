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

### Options

#### Type

default: 'library'

Certain options can be turned on and off depending on what you're using babel for.

For applications, we enable runtime helpers and `@babel/runtime` becomes a required dependency.

```json
{
  "presets": ["codecademy", { "type": "application" }]
}
```

For libraries (default), we don't enable runtime helpers because then the resulting package would need `@babel/runtime` as a dependency, which should be handled by the consumer of the package.

```json
{
  "presets": ["codecademy", { "type": "library" }]
}
```

## Publishing this package

This package is automatically published by GitHub Actions when the version number changes

- merge your PR into `main`
- create a new PR that updates the version of the package in package.json. Base the version bump on all of the changes that will be added in this version.
- merge the version PR into `main`
- check the [actions](https://github.com/Codecademy/babel-preset-codecademy/actions) to see when the package is published
