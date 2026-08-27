---
title: Supporting dark mode
description: Make a page or component work correctly in both color modes.
---

Gamut components are built on semantic color aliases (`text`, `background`, `primary`, `secondary`, and more — see [Color modes](/concepts/color-modes/) for why), so most components support both color modes automatically, with no extra work. This guide covers the parts that need you to actually do something.

## Setting a color mode

Wrap a subtree in `<ColorMode>` to force a specific mode, or let it follow the reader's OS-level preference:

```tsx
import { ColorMode } from '@codecademy/gamut-styles';

const Page = ({ children }) => <ColorMode mode="light">{children}</ColorMode>;
```

```tsx
// Follows the reader's OS-level light/dark preference automatically
const Page = ({ children }) => <ColorMode mode="system">{children}</ColorMode>;
```

## Setting a background without guessing the mode

Use `<Background>` instead of picking a color mode by hand for a section's background — it checks the contrast between the background color you give it and the current mode's text color, and switches to an accessible mode automatically if the combination wouldn't pass:

```tsx
import { Background } from '@codecademy/gamut-styles';

const Page = ({ children }) => <Background bg="hyper">{children}</Background>;
```

`<Background>` establishes a new color context for everything inside it, so you can safely nest one background inside another — a dark section can contain its own lighter card, for example, and each still resolves its own aliases correctly.

The color a `<Background>` resolves to is exposed as the `background-current` theme variable — reach for it when a descendant needs to reference its ancestor's background directly, for example to simulate transparency against it.

## Reading the current mode in JS

Reach for these only when you need the mode value itself, not just correctly-themed styles:

- `useColorModes()` — returns `[mode, modeColors, modes, getColorValue]`, for when you need every mode's values, not just the active one.
- `useCurrentMode(mode?)` — returns just the active mode key, or lets you override it.
- `usePrefersDarkMode()` — returns a boolean from the reader's OS-level `prefers-color-scheme: dark` media query, independent of whatever `<ColorMode>` is actually active.

## Checking your work

Toggle color mode with Storybook's Color Mode selector while reviewing a component or page — a component built entirely from semantic aliases and system props should need no other changes to read correctly in both modes. If something looks wrong in one mode only, that's usually a raw color value that should have been a semantic alias instead.
