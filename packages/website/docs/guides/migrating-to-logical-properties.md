---
sidebar_position: 5
---

# Migrating to logical properties

:::note Placeholder
This guide is scaffolded but not yet migrated.
:::

## What this guide will cover

- Why Gamut moved from physical CSS properties (`margin-left`,
  `border-right`) to logical properties (`margin-inline-start`,
  `border-inline-end`) for RTL support
- Which system props already emit logical properties and which custom CSS
  needs manual updates
- Testing a component in both `ltr` and `rtl` directions

## Related

- [Components → Accessibility sections](../components/index.md) — every
  component page's Accessibility section calls out RTL behavior when it
  differs from the LTR default
