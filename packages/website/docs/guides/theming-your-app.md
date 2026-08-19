---
sidebar_position: 1
---

# Theming your app

:::note Placeholder
This guide is scaffolded but not yet migrated. See ADR 0001 — theme
values/rationale split between here (how-to) and
[Concepts → Theming model](../concepts/theming-model.md) (why).
:::

## What this guide will cover

- Choosing a theme (`Core`, `Admin`, `Platform`, `LX Studio`, `Percipio`)
  and passing it to `GamutProvider`
- Overriding specific tokens without forking the whole theme
- Setting up Emotion's `Theme` type augmentation for autocomplete
- Testing components against multiple themes

## Related

- [Installation](../getting-started/installation.md) — base provider setup
- [Supporting dark mode](./supporting-dark-mode.md)
- [Concepts → Theming model](../concepts/theming-model.md)
