# `eslint-plugin-gamut`

Recommended eslint plugins for Gamut applications. ✨

## Usage

```tsx
// eslintrc.js

module.exports = {
  root: true,

  plugins: ['eslint-plugin-gamut'],

  rules: {
    'gamut/prefer-themed': 'error',
    'gamut/no-css-standalone': 'error',
    'gamut/import-paths': 'error',
  },
};
```
