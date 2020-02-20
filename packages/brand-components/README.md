# Brand Components

## Component Guidelines

1. The Brand Components package will be used for components that are more tied to brand representation and/or marketing purposes. These are components that might be more frequently subject to style updates do their nature, but are not just solely used in the main Codecademy monolith app. (e.g., a brand component might also be used in a Gatsby hosted campaign page)

## When to add a component to Brand Components

When considering whether to add a component to Gamut, answer these questions:

1. Is this component more tied to brand representation/marketing purposes than say a [Button in the Gamut package](../gamut/src/Button).
2. Is this component or some version of it used across all or most new React based applications at Codecademy?

## box-sizing

Brand Components expect `box-sizing: border-box` to be applied to all elements on the page globally. If it isn't there already, add something like this to your application's global stylesheet:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```
