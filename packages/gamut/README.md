# Gamut Components

## Component Guidelines

1. Core Gamut components should be stateless if at all possible. This increases flexibility allowing parent components and data stores like redux to control state, and also simplifies components making them easier to understand and test.
2. Components should be broken down into their most useful and flexible parts.

## When to add a component to Gamut

When considering whether to add a component to Gamut, answer these questions:

1. Is this component necessary to complete a basic set of styleguide components? Using examples from other popular component libraries can be helpful.
2. Is this component or some version of it used across all or most new React based applications at Codecademy?

## Required CSS

### box-sizing

Gamut components expect `box-sizing: border-box` to be applied to all elements on the page globally. If it isn't there already, add something like this to your application's global stylesheet:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

### `:focus-visible`

Components are written using the [`:focus-visible`](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo) selector, which is not supported in all major browsers.
The neighboring `@codecademy/webpack-config` package uses [`postcss-focus-visible`](https://www.npmjs.com/package/postcss-focus-visible) to support the selector, which assumes your app uses the [`postcss-visible`](https://www.npmjs.com/package/focus-visible) polyfill.
