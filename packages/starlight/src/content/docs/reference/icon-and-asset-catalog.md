---
title: Icon & asset catalog
description: Every icon, illustration, and pattern available, searchable by name.
---

Browse the actual catalogs on their own pages:

- [Icons](/components/media-and-assets/icons/) — [Mini](/components/media-and-assets/icons/mini/) (36 icons) and [Regular](/components/media-and-assets/icons/regular/) (335 icons).
- [Illustrations](/components/media-and-assets/illustrations/) — the full illustration set.
- [Patterns](/components/media-and-assets/patterns/) — the full decorative pattern set.

## Contributing a new icon

**Designers:**

1. Find or request the icon on [Streamline](https://www.streamlinehq.com/) — "Ultimate Regular" for Regular icons, "Core Solid" for Mini icons.
2. Add it to the Figma library, following the design team's guide for [regular icons](https://scribehow.com/shared/How_to_add_a_regular_size_icon_to_the_Figma_library__89he3MpFQj-7d9CP6AFLQg) or [mini icons](https://scribehow.com/shared/How_to_add_a_mini_size_icon_to_the_Figma_library__mDFi_BuaQ-yHDsufs9tlxQ).
3. Hand the SVG off to an engineer — it should come from Streamline directly, not be exported from Figma.

**Engineers:**

1. Confirm the SVG matches the expected shape: Regular icons need `viewBox="0 0 24 24"` and `stroke-width="1.5"`; Mini icons need `viewBox="0 0 16 16"` and an outline style.
2. Add the Streamline slug (for example, `delete-1`) as the SVG's `<title>` if it's missing.
3. Add the file to `packages/gamut-icons/src/svg/regular/` or `.../mini/`, named `<icon-name>-icon.svg` (regular) or `mini-<icon-name>-icon.svg` (mini).
4. Run `yarn build-all && yarn start` to see it in Storybook. Regular icons default into the Interface category alphabetically — reassign one to a different category, like Vendor, in `constants.tsx` if needed.
5. Open a PR describing where the icon came from and what it's for.

**Troubleshooting:** every icon is transformed by a custom Babel plugin so semi-opaque colors render consistently without overlay artifacts — this occasionally causes rendering surprises:

- If an icon's source SVG has a `<mask>`, ask the designer to remove it; Gamut adds its own mask during the build.
- If an icon sets `fill="none"` on the root `<svg>`, move `fill="none"` onto each `<path>` instead.
