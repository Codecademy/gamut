---
title: Components
description: All Gamut components, grouped by what they do rather than by Atomic Design tier.
---

Components are grouped by what a reader needs to do, not by Gamut's internal Atoms/Molecules/Organisms tier:

- [Actions](/components/actions/) — trigger, choose, or remove
- [Containers](/components/containers/) — group, wrap, or lay out content
- [Inputs & forms](/components/inputs-and-forms/) — collect input
- [Navigation](/components/navigation/) — move between pages or views
- [Feedback](/components/feedback/) — the system explaining something
- [Status](/components/status/) — communicate state at a glance
- [Overlays](/components/overlays/) — opened and dismissed, floating above the page
- [Data display](/components/data-display/) — structured or bulk data
- [Typography](/components/typography/) — text rendering
- [Media & assets](/components/media-and-assets/) — icons, illustrations, patterns, animation, video
- [Utilities](/components/utilities/) — non-visual helpers

If you already know a component's name, search finds it regardless of category.

## Placement rulings

A few components could reasonably live in two categories. These are the calls this site makes, and why — each losing category cross-links back to the winner:

| Component | Placed in  | Why                                                                                                                      |
| --------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| Menu      | Actions    | The action-list role is the richer half of its API; the nav role is cross-linked from Navigation.                        |
| Tag       | Actions    | Docs emphasize interactive selection/removal; the read-only overlap with Badge is called out on Tag's "When NOT to use." |
| Tips      | Feedback   | Readers think "the system explaining something"; Overlays is reserved for things you open and dismiss.                   |
| Drawer    | Containers | Collapses within page flow, unlike Flyout, which floats above it (Overlays).                                             |
| Anchor    | Navigation | Functionally navigation despite its typography implementation.                                                           |
