---
title: Using this site
description: How this site's navigation is organized and what to expect on a component page.
sidebar:
  order: 3
---

This site is organized around what you're trying to do, not around Gamut's internal component taxonomy. Knowing the four sections below will get you to an answer faster than browsing will.

## The four sections

- **Getting started** — tutorials. Follow these in order if you're new to Gamut; they end with a working page.
- **Guides** — how-to. Task-oriented recipes for things you're already trying to build: theming an app, building a form, supporting dark mode, migrating to logical properties, and similar.
- **Components** — reference, grouped by what a component does (Actions, Containers, Inputs & forms, Navigation, Feedback, Status, Overlays, Data display, Typography, Media & assets, Utilities) rather than by Gamut's Atomic Design tier. If you know roughly what you need ("something to tell the user an action succeeded") but not its name, start with the category; use search if you already know the name.
- **Reference** — everything else you look up rather than read start-to-finish: design tokens, themes, system props, icon and asset catalogs, ESLint rules, tooling.
- **Concepts** — explanation. Background on how and why the system is built the way it is: architecture, the theming model, color modes, brand, best practices, voice and tone, FAQs.

If you're not sure which section has what you need, the search bar covers all of them at once.

## How a component page is laid out

Every component page follows the same section order, so once you know the pattern you can jump straight to the part you need on any page:

1. **Header** — title, status, links to Figma and source.
2. **Usage** — when to reach for this component, including a "When NOT to use" list that names the alternative.
3. **Anatomy** — a labeled diagram of the component's parts (skipped for non-visual utilities).
4. **Patterns** — goal-first recipes that need real wiring (state, callbacks, composition), skipped for components with no state to wire up.
5. **Playground or Prop Reference** — a live, embedded Storybook example. If no prop drives a genuinely different look, it's a single **Playground** heading; as soon as a prop does (`variant`, `size`, `state`, and the like), it becomes **Prop Reference** instead, broken into one subheading per prop, each showing every value that prop can take.

Sections 2–4 are explanation and how-to material; section 5 is reference, and always lives in Storybook rather than being retyped here — the embed is the source of truth. If you're deciding whether to use the component at all, start at Usage; if you just need to see what a prop looks like, skip straight to the bottom.

## This site is a work in progress

Gamut's documentation is migrating here from a Storybook-based styleguide. Pages that haven't been migrated yet are marked as such and link back to their current location. If you spot a gap, the [Contributing guide](/guides/contributing-to-gamut/) covers how to add or fix a page.
