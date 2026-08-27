---
title: Themes
description: The theme palettes available (Core, Admin, LX Studio, Percipio, and Platform) and their values.
---

Every Emotion component in Gamut has typed access to the current theme's tokens, without any extra imports — most commonly through [system props](/reference/system-props/) or the `theme` prop.

## Available themes

- **Core** — Codecademy's own public-facing theme.
- **Admin** — the internal admin/back-office theme.
- **LX Studio** — the theme for LX Studio.
- **Percipio** — the theme for Percipio; replaces Core's hard offset shadows with a soft, blurred one and no lift (see [Design tokens: Elevation](/reference/design-tokens/#elevation)).
- **Platform** — the shared learning-platform theme.

## Comparing themes live

Use Storybook's Theme Switcher (paintbrush icon in the toolbar) to preview any component across every theme, paired with the Color Mode selector to check both light and dark variants of each. This is the fastest way to see a token's actual resolved value — exact hex codes and scale values are theme-specific and aren't reproduced statically here.

## Choosing a theme

See [Theming your app](/guides/theming-your-app/) for wiring up `GamutProvider` with the right theme for your product.
