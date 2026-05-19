# Icons

Icons must come from `@codecademy/gamut-icons`. Do not import or generate icons from other sources. If a needed icon is unavailable, pick a verified alternative from the library or flag for confirmation — do not substitute non-system assets.

## Identifying the correct icon

Do not rely on Figma layer names (`data-name`). Layer names are often stale after icon swaps.

Determine the correct icon by:

1. Reading the design image — visually identify the shape (three vertical dots → kebab menu, 3×3 grid → app switcher, etc.).
2. Using contextual clues — tooltip text, element purpose, surrounding UI patterns.
3. Cross-referencing exports — search `@codecademy/gamut-icons` for icons matching visual and semantic intent.
4. Treating layer names as hints only — if a layer name conflicts with visual/contextual evidence, trust the evidence.
5. When uncertain, flag for confirmation rather than guessing.

Before using any icon, confirm it exists in `@codecademy/gamut-icons` (`packages/gamut-icons/src` or package exports).

Storybook: [Foundations / Icons](https://gamut.codecademy.com/?path=/docs-foundations-icons--page)
