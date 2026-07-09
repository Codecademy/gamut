# Icons

Icons must come from `@codecademy/gamut-icons`. Do not import or generate icons from any other source. If a needed icon is unavailable, leave a placeholder annotation rather than substituting a non-system asset.

## Identifying the correct icon

**Do not rely on Figma layer names (`data-name`).** Figma does not update them when icons are swapped, so layer names like `"Mini/MiniDeleteIcon"` or `"Regular/Interface/SearchIcon"` are frequently stale.

Determine the correct icon by:

1. **Reading the design image** — visually identify the shape (three vertical dots = kebab menu, 3×3 grid = app switcher, etc.).
2. **Using contextual clues** — tooltip text (e.g., "Show options" → `MiniKebabMenuIcon`), element purpose (e.g., app switcher → `LayoutModuleAltIcon`), surrounding UI patterns.
3. **Cross-referencing the Gamut icon library** — search `@codecademy/gamut-icons` exports for icons matching the visual and semantic intent.
4. **Treating layer names as hints only** — if a layer name conflicts with visual/contextual evidence, trust the evidence.
5. **When uncertain**, flag for confirmation rather than guessing.

Before using any icon, confirm it exists in `@codecademy/gamut-icons`. If not, pick a different icon and verify.
