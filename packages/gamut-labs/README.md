# ⚗️ Gamut Labs

## Component Guidelines

The Labs package is used for components that are more experimental or tied to brand representation. These are components that might be more frequently subject to style updates do their nature, but are not just solely used in the main Codecademy monolith app. (e.g., a brand component might also be used in a Gatsby hosted campaign page)

See the Gamut FAQs for more details.

## box-sizing

Labs expects `box-sizing: border-box` to be applied to all elements on the page globally. If it isn't there already, add something like this to your application's global stylesheet:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```
