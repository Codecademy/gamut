---
name: gamut-components
description: Implements or reviews Gamut UI components in TSX — Menu, DataTable, DataList, Card, Select, Video, Coachmark, Shimmer, animations, tooltips. Use when no narrower gamut-* skill applies. When invoked, read only the relevant guidelines/components/*.md files.
paths: '**/*.tsx'
---

# Gamut components (guideline router)

Use when building or changing Gamut components in `.tsx` files and a narrower skill does not already cover the task (`gamut-forms`, `gamut-color-mode`, etc.).

## Read first

1. Read [`guidelines/overview.md`](../../guidelines/overview.md) Step 2 table only (component → guide mapping).
2. Read only the `guidelines/components/*.md` files for components you will touch in this task — not all guides.

Do not load every guideline file. Skip guides for components you are not using.

## Component → guideline

| Component(s)                                                          | Guideline                                                                             |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `FillButton`, `StrokeButton`, `TextButton`, `IconButton`, `CTAButton` | [`buttons.md`](../../guidelines/components/buttons.md)                                |
| `GridForm`, `ConnectedForm`                                           | [`forms.md`](../../guidelines/components/forms.md) — prefer `gamut-forms` skill       |
| `DataTable`, `DataList`                                               | [`data-table.md`](../../guidelines/components/data-table.md)                          |
| `Menu`, `MenuItem`, `MenuSeparator`                                   | [`menu.md`](../../guidelines/components/menu.md)                                      |
| `Card`                                                                | [`card.md`](../../guidelines/components/card.md)                                      |
| `Select`, `SelectDropdown`                                            | [`select.md`](../../guidelines/components/select.md)                                  |
| `RadialProgress`                                                      | [`radial-progress.md`](../../guidelines/components/radial-progress.md)                |
| `Shimmer`, `Spinner`, `FeatureShimmer`                                | [`loading-states.md`](../../guidelines/components/loading-states.md)                  |
| `Coachmark`                                                           | [`coachmark.md`](../../guidelines/components/coachmark.md)                            |
| `ToolTip`, `InfoTip`, `PreviewTip`                                    | [`tooltips.md`](../../guidelines/components/tooltips.md)                              |
| `Video`                                                               | [`video.md`](../../guidelines/components/video.md)                                    |
| `Rotation`, `ExpandInCollapseOut`, `FadeInSlideOut`                   | [`animations.md`](../../guidelines/components/animations.md)                          |
| `ColorMode`, `Background`                                             | [`modes.md`](../../guidelines/foundations/modes.md) — prefer `gamut-color-mode` skill |

Discovery and forms vs. atoms: [`components/overview.md`](../../guidelines/components/overview.md).

## Related skills

| Topic                  | Skill                              |
| ---------------------- | ---------------------------------- |
| Forms                  | `gamut-forms`                      |
| Color / modes          | `gamut-color-mode`                 |
| Layout / spacing props | `gamut-system-props`               |
| Accessibility          | `gamut-accessibility`              |
| Product theme          | `gamut-theming` + root `DESIGN.md` |
