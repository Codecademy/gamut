---
sidebar_position: 3
---

# Using this site

This site is organized around what you're trying to do, not around Gamut's
internal component taxonomy. The top-level sections map to a reader's
lifecycle with the library:

| Section             | Mode        | Answers                                            |
| ------------------- | ----------- | -------------------------------------------------- |
| **Getting started** | Tutorial    | "I'm new — walk me through it."                    |
| **Guides**          | How-to      | "I need to accomplish a specific task."            |
| **Components**      | Reference   | "What does this component do and how do I use it?" |
| **Reference**       | Reference   | "What's the exact value / rule / API?"             |
| **Concepts**        | Explanation | "Why does Gamut work this way?"                    |

## Finding a component

Components are grouped by what they _do_ (Actions, Containers, Inputs &
forms, Navigation, Feedback, Status, Overlays, Data display, Typography,
Media & assets, Utilities) rather than by Atomic Design tier (atom /
molecule / organism). If you know a component's name but not its category,
use search — every component page is indexed regardless of where it lives
in the sidebar.

## Reading a component page

Every component page follows the same section order, so you can jump
straight to the zone that matches what you need and ignore the rest:

1. **Usage** — when to reach for it, and when not to
2. **Anatomy** — the parts, labeled (skipped for non-visual utilities)
3. **Patterns** — goal-first recipes that need real wiring
4. **Variants** — every prop value, rendered
5. **Accessibility** — keyboard, ARIA, focus, RTL
6. **Props** — the canonical API table
7. **Playground** — a live, editable example

No component page documents props in prose outside the Props table, and no
page invents its own section names — this vocabulary is closed so every
page is scannable the same way.

This structure follows the [Diátaxis framework](https://diataxis.fr); see
ADR 0001 in the repository (`docs/adr/0001-documentation-site-information-architecture.md`)
for the full rationale.
