# `eslint-plugin-gamut`

Recommended eslint plugins for all Gamut applications. ✨

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
    'gamut/no-inline-style': 'error',
  },
};
```
