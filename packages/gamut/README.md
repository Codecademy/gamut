# Gamut Components

## box-sizing

Gamut components expect `box-sizing: border-box` to be applied to all elements on the page globally. If it isn't there already, add something like this to your application's global stylesheet:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```
