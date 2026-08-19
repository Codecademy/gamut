---
title: Buttons
description: Gamut's button family — five components sharing one shape, size scale, and icon behavior.
---

Gamut splits "button" into five components rather than one component with a `kind` prop, so each use case gets its own focused API:

- [FillButton](/components/actions/buttons/fill-button/) — the solid, high-contrast button. Start here for most primary/secondary actions.
- [StrokeButton](/components/actions/buttons/stroke-button/) — an outlined, lower-emphasis alternative to FillButton.
- [TextButton](/components/actions/buttons/text-button/) — a button with no fill or border, for the lowest-emphasis actions.
- [IconButton](/components/actions/buttons/icon-button/) — an icon-only button with a required tooltip/accessible label.
- [CTAButton](/components/actions/buttons/cta-button/) — a marketing-style button with a distinct offset-shadow treatment.

All five support `light` and `dark` color mode via the `mode` prop, and all but `CTAButton` support `size="normal" | "small" | "large"`. `FillButton`, `StrokeButton`, and `TextButton` additionally support a single inline `icon`, positioned with `iconPosition`.

See [FillButton](/components/actions/buttons/fill-button/) for a fully documented example of the shared API.
