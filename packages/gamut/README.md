# Gamut Components

## Component Guidelines

1. Core Gamut components should be stateless if at all possible. This increases flexibility allowing parent components and data stores like redux to control state, and also simplifies components making them easier to understand and test.
2. Components should be broken down into their most useful and flexible parts.

## When to add a component to Gamut

When considering whether to add a component to Gamut, answer these questions:

1. Is this component necessary to complete a basic set of styleguide components? Using examples from other popular component libraries can be helpful.
2. Is this component or some version of it used across all or most new React based applications at Codecademy?

## Required CSS

### `:focus-visible`

Components are written using the [`:focus-visible`](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo) selector, which is not supported in all major browsers.
The neighboring `@codecademy/webpack-config` package uses [`postcss-focus-visible`](https://www.npmjs.com/package/postcss-focus-visible) to support the selector, which assumes your app uses the [`postcss-visible`](https://www.npmjs.com/package/focus-visible) polyfill.

## Testing

From the repo root, run the Gamut test suite:

- **`yarn test:gamut`** – runs Jest directly with the repo’s current install (React 19 by default). Use this for normal development (recommended if `nx run gamut:test` fails with "Failed to start plugin worker").
- **`nx run gamut:test`** – runs via Nx (requires Nx plugin worker).

## React version compatibility

Gamut supports **React 18.3+** and **React 19** (see `peerDependencies` in `package.json`). CI runs the full test suite (all packages) on React 19 in the main Test Suite job and on React 18 in the "Test suite (React 18)" job.

To run the same locally from the repo root:

- **`yarn test:gamut:react18`** – installs React 18, runs the Gamut suite, then restores package.json.
- **`yarn test:gamut:react19`** – same with React 19.
- **`yarn test:gamut:all`** – runs both (React 18 then React 19).
