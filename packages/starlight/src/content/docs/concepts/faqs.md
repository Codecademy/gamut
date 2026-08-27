---
title: FAQs
description: Frequently asked questions about using and contributing to Gamut.
---

## How can I contribute?

Thanks for your interest! We currently accept contributions from Codecademy employees only, but we're working on a process to accept contributions from the wider community — watch this space.

## To Gamut, or not to Gamut?

**When should we create a general component in Gamut instead of a specific one in another application?**

In general, Gamut components should be shared across multiple experiences in the monolith. If something can be built from existing primitives without adding logic, it usually doesn't need its own component.

Good fits for Gamut:

- Common, visually identifiable atoms, like buttons or form inputs.
- Atoms linked together with client logic, like an alert bar.

Poor fits for Gamut:

- Atoms customized for one particular use case, like a promotional card.
- Groups of components easily recreated from primitives, like a specific button-and-grid combination.

Other design systems, like [Fluent](https://www.microsoft.com/design/fluent) and [Material Design](https://material.io/design), are a useful reference for what they choose to turn into generic components.

### Where should a new component be implemented?

**Should we implement components in separate repositories or in Gamut?**

As a rule of thumb:

1. The first or second time a component is written, implement it in its own repository if the designer thinks it might eventually belong in Gamut — keep its API simple and flexible (for example, plain props instead of hooking it up to Redux) to make migrating it later easier.
2. The third time it's needed, discuss moving it into Gamut.

## What's going on with accessibility?

Codecademy is committed to [WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag) accessibility, and it's a must-have in Gamut. Every component is expected to be fully AA compliant, and tested for accessibility via [Storybook's accessibility testing](https://storybook.js.org/docs/writing-tests/accessibility-testing) — visible under each story's Accessibility tab, and run in CI.
