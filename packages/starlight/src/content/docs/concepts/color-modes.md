---
title: Color modes
description: How light/dark color mode works conceptually, distinct from theming.
---

Gamut components are built on semantic color aliases, not raw color values. Each alias names what a color is _used for_, not what it looks like:

- `text` — the standard color for all type.
- `background` — the base background color.
- `primary` — the color for interactive elements with a primary action.
- `secondary` — the color for interactive elements with a secondary action.

Building components against these aliases, instead of specific values, guarantees:

- Components work correctly in any context, without extra configuration.
- Color usage stays consistent and accessible between contexts.
- Code reads more meaningfully, since each alias hints at its own purpose.
- Configuration stays simple — swapping a color mode swaps every aliased value at once.

A color mode is the layer that resolves each alias to an actual value, for a light or dark context. For the exact values each alias resolves to, see [Themes](/foundations/themes/). For how to actually apply a color mode or build a component that adapts to it, see [Supporting dark mode](/guides/supporting-dark-mode/).

This is distinct from [theming](/guides/theming-your-app/): a theme swaps which _palette_ Gamut draws from (Core, Admin, LX Studio, Percipio); a color mode swaps _which half_ of that palette — light or dark — an alias resolves against. The two compose: the same alias resolves differently depending on both which theme and which color mode are active.
